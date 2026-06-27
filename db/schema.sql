-- DeepLinkOS clean Supabase schema
-- Run this in a fresh Supabase project before wiring production traffic.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  avatar_url text,
  workspace_name text,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_name text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'failed', 'disabled')),
  verification_token text not null default encode(gen_random_bytes(16), 'hex'),
  cname_target text,
  verified_at timestamptz,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deep_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_id uuid references public.domains(id) on delete set null,
  slug text not null,
  title text not null,
  description text,
  preset text not null default 'custom',
  status text not null default 'active'
    check (status in ('active', 'paused', 'archived', 'locked')),
  is_active boolean not null default true,
  destination_url text,
  ios_deep_link text,
  ios_store_url text,
  android_deep_link text,
  android_store_url text,
  desktop_url text,
  fallback_url text,
  password_hash text,
  expires_at timestamptz,
  ab_test_url text,
  ab_test_weight integer not null default 50 check (ab_test_weight between 0 and 100),
  campaign text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  routing_config jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint deep_links_has_destination check (
    destination_url is not null
    or ios_deep_link is not null
    or android_deep_link is not null
    or desktop_url is not null
    or fallback_url is not null
  ),
  constraint deep_links_slug_format check (slug ~ '^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$')
);

create unique index if not exists deep_links_default_slug_unique
  on public.deep_links (slug)
  where domain_id is null;

create unique index if not exists deep_links_domain_slug_unique
  on public.deep_links (domain_id, slug)
  where domain_id is not null;

create table if not exists public.clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.deep_links(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  dedupe_bucket timestamptz not null default date_trunc('minute', now()),
  variant text check (variant in ('a', 'b')),
  device text,
  os text,
  browser text,
  referrer text,
  country text,
  city text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  ip_hash text,
  user_agent_hash text,
  is_bot boolean not null default false,
  is_prefetch boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists clicks_link_ip_minute_unique
  on public.clicks (link_id, ip_hash, dedupe_bucket)
  where ip_hash is not null and is_bot = false and is_prefetch = false;

create index if not exists deep_links_user_created_idx
  on public.deep_links (user_id, created_at desc);

create index if not exists deep_links_active_slug_idx
  on public.deep_links (slug)
  where is_active = true and status = 'active';

create index if not exists clicks_link_clicked_at_idx
  on public.clicks (link_id, clicked_at desc);

create index if not exists clicks_referrer_idx
  on public.clicks (referrer)
  where referrer is not null;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger domains_set_updated_at
  before update on public.domains
  for each row execute function public.set_updated_at();

create trigger deep_links_set_updated_at
  before update on public.deep_links
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.domains enable row level security;
alter table public.deep_links enable row level security;
alter table public.clicks enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "domains_manage_own"
  on public.domains for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "domains_select_active_public"
  on public.domains for select
  using (status = 'active');

create policy "deep_links_select_active_for_redirect"
  on public.deep_links for select
  using (is_active = true and status = 'active');

create policy "deep_links_select_own"
  on public.deep_links for select
  using (auth.uid() = user_id);

create policy "deep_links_insert_own"
  on public.deep_links for insert
  with check (auth.uid() = user_id);

create policy "deep_links_update_own"
  on public.deep_links for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "deep_links_delete_own"
  on public.deep_links for delete
  using (auth.uid() = user_id);

create policy "clicks_insert_public"
  on public.clicks for insert
  with check (true);

create policy "clicks_select_own_links"
  on public.clicks for select
  using (
    exists (
      select 1
      from public.deep_links
      where deep_links.id = clicks.link_id
        and deep_links.user_id = auth.uid()
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.get_dashboard_analytics(
  user_uuid uuid,
  days_ago integer default 7
)
returns table (
  total_clicks bigint,
  unique_visitors bigint,
  active_links bigint,
  paused_links bigint,
  top_referrer text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() <> user_uuid then
    raise exception 'not allowed';
  end if;

  return query
  with user_links as (
    select id, is_active, status
    from public.deep_links
    where user_id = user_uuid
  ),
  period_clicks as (
    select c.*
    from public.clicks c
    where c.link_id in (select id from user_links)
      and c.clicked_at >= now() - make_interval(days => days_ago)
      and c.is_bot = false
      and c.is_prefetch = false
  ),
  referrers as (
    select coalesce(nullif(referrer, ''), 'direct') as name, count(*) as count
    from period_clicks
    group by 1
    order by 2 desc
    limit 1
  )
  select
    (select count(*) from period_clicks)::bigint,
    (select count(distinct ip_hash) from period_clicks where ip_hash is not null)::bigint,
    (select count(*) from user_links where is_active = true and status = 'active')::bigint,
    (select count(*) from user_links where is_active = false or status = 'paused')::bigint,
    (select name from referrers);
end;
$$;

create or replace function public.get_clicks_by_day(
  user_uuid uuid,
  days_ago integer default 30
)
returns table (
  click_date date,
  click_count bigint,
  unique_visitors bigint
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() <> user_uuid then
    raise exception 'not allowed';
  end if;

  return query
  select
    c.clicked_at::date as click_date,
    count(*)::bigint as click_count,
    count(distinct c.ip_hash)::bigint as unique_visitors
  from public.clicks c
  join public.deep_links l on l.id = c.link_id
  where l.user_id = user_uuid
    and c.clicked_at >= now() - make_interval(days => days_ago)
    and c.is_bot = false
    and c.is_prefetch = false
  group by c.clicked_at::date
  order by click_date asc;
end;
$$;

create or replace function public.get_global_analytics(user_uuid uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if auth.uid() <> user_uuid then
    raise exception 'not allowed';
  end if;

  with user_links as (
    select id, title, slug, status, is_active
    from public.deep_links
    where user_id = user_uuid
  ),
  top_links as (
    select l.id, l.title, l.slug, count(c.id) as clicks
    from user_links l
    left join public.clicks c on c.link_id = l.id and c.is_bot = false and c.is_prefetch = false
    group by l.id, l.title, l.slug
    order by clicks desc
    limit 10
  ),
  devices as (
    select coalesce(device, 'unknown') as label, count(*) as clicks
    from public.clicks
    where link_id in (select id from user_links)
      and is_bot = false
      and is_prefetch = false
    group by 1
    order by 2 desc
  ),
  referrers as (
    select coalesce(nullif(referrer, ''), 'direct') as label, count(*) as clicks
    from public.clicks
    where link_id in (select id from user_links)
      and is_bot = false
      and is_prefetch = false
    group by 1
    order by 2 desc
    limit 10
  )
  select jsonb_build_object(
    'top_links', coalesce((select jsonb_agg(to_jsonb(top_links)) from top_links), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(to_jsonb(devices)) from devices), '[]'::jsonb),
    'referrers', coalesce((select jsonb_agg(to_jsonb(referrers)) from referrers), '[]'::jsonb)
  )
  into result;

  return result;
end;
$$;
