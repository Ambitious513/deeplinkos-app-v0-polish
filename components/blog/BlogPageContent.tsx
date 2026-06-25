"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  blogCategories,
  blogPosts,
  blogTopics,
  partnerCards,
  popularPosts,
  trendingPosts,
  type BlogCategory,
  type BlogPost,
  type PartnerCard,
} from "@/content/blog";

export function BlogPageContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategoryLabel = blogCategories.find((category) => category.id === activeCategory)?.label ?? "All";
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const categoryMatches = activeCategory === "all" || post.category === activeCategory;
      const text = [post.title, post.excerpt, post.categoryLabel, post.author, ...post.searchTerms].join(" ").toLowerCase();
      const searchMatches = !normalizedQuery || text.includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [activeCategory, query]);

  function chooseCategory(category: BlogCategory) {
    setActiveCategory(category);
    setFiltersOpen(false);
  }

  return (
    <div className="blog-shell">
      <BlogHero />

      <section className="blog-utility" aria-label="Find articles">
        <label className="blog-search">
          <span className="sr-only">Search the Growth Library</span>
          <SearchIcon />
          <input
            type="search"
            autoComplete="off"
            placeholder="Search creator funnels, ecommerce, attribution, smart links"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="blog-filter-panel" data-open={filtersOpen}>
          <button className="blog-filter-summary" type="button" onClick={() => setFiltersOpen((open) => !open)}>
            <span>Categories</span>
            <span className="blog-filter-summary-meta">
              {activeCategoryLabel}
              <ChevronIcon />
            </span>
          </button>
          <div className="blog-filter-list" role="group" aria-label="Filter articles by category">
            {blogCategories.map((category) => (
              <button
                className="blog-filter-btn"
                type="button"
                key={category.id}
                aria-pressed={activeCategory === category.id}
                onClick={() => chooseCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <PartnerSection />

      <div className="blog-content-grid">
        <section aria-labelledby="articles-title">
          <BlogSectionHeading
            eyebrow="Latest"
            title={
              <>
                Actionable <span className="grad-text">Playbooks</span>
              </>
            }
            description="Creator funnels, ecommerce campaigns, attribution, and smart-link strategy."
            titleId="articles-title"
          />

          <div className="blog-article-list">
            {filteredPosts.map((post, index) => (
              <ArticleWithCallout post={post} index={index} key={post.id} />
            ))}
          </div>

          {filteredPosts.length === 0 ? <p className="blog-empty-state">No articles match that search yet.</p> : null}
        </section>

        <BlogSidebar onTopic={(topic) => setQuery(topic.toLowerCase())} />
      </div>

      <BlogNewsletter />
    </div>
  );
}

function BlogHero() {
  return (
    <section className="blog-hero" aria-labelledby="blog-page-title">
      <div>
        <span className="blog-eyebrow">Growth Library</span>
        <h1 id="blog-page-title" className="blog-hero-title">
          Turn <span className="grad-text">Clicks</span>
          <br />
          Into Customers
        </h1>
        <p className="blog-hero-copy">Practical growth playbooks for creators, ecommerce stores, and mobile-first teams.</p>
        <div className="blog-hero-proof" aria-label="Library highlights">
          <span>
            <strong>48+</strong> field-tested articles
          </span>
          <span>
            <strong>12</strong> free workflow tools
          </span>
          <span>
            <strong>Weekly</strong> growth teardown
          </span>
        </div>
      </div>

      <aside className="blog-hero-aside" aria-label="Library metrics">
        <div className="blog-routing-map" aria-hidden="true">
          {[
            ["TikTok", "App"],
            ["Email", "Store"],
            ["QR", "Web"],
          ].map(([from, to]) => (
            <div className="blog-route-row" key={from}>
              <span className="blog-route-pill">{from}</span>
              <span className="blog-route-line" />
              <span className="blog-route-pill">{to}</span>
            </div>
          ))}
        </div>

        <div className="blog-metric-grid">
          <div className="blog-metric">
            <strong>48+</strong>
            <span>Playbooks</span>
          </div>
          <div className="blog-metric">
            <strong>12</strong>
            <span>Tools</span>
          </div>
          <div className="blog-metric">
            <strong>3.4k</strong>
            <span>Readers</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

function PartnerSection() {
  return (
    <section className="blog-partner-section" aria-labelledby="partner-title">
      <BlogSectionHeading
        eyebrow="Recommended stack"
        title={
          <>
            Recommended <span className="grad-text">Growth Stack</span>
          </>
        }
        description="Tools for campaigns, attribution, and conversion."
        titleId="partner-title"
      />

      <div className="blog-partner-grid">
        {partnerCards.map((card) => (
          <PartnerCardView card={card} key={card.id} />
        ))}
      </div>

      <p className="blog-partner-disclosure">
        Some recommendations may include partner links. We only feature tools that fit the workflows covered in the Growth Library.
      </p>
    </section>
  );
}

function PartnerCardView({ card }: { card: PartnerCard }) {
  return (
    <Link className="blog-partner-card" href={card.href}>
      <div className={`blog-partner-media blog-partner-media--${card.mediaTone}`} aria-hidden="true">
        <span className="blog-partner-kicker">{card.eyebrow}</span>
        <span className="blog-partner-brand">{card.brand}</span>
      </div>
      <div className="blog-partner-body">
        <TagList tags={card.tags} />
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className="blog-partner-meta">
          {card.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <span className="blog-partner-cta">{card.cta}</span>
      </div>
    </Link>
  );
}

function ArticleWithCallout({ post, index }: { post: BlogPost; index: number }) {
  return (
    <>
      {index === 4 ? <ProductCallout /> : null}
      <BlogArticleCard post={post} />
    </>
  );
}

function BlogArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link className="blog-article-card" href={`/blog/${post.slug}`}>
      <div className={`blog-article-visual blog-article-visual--${post.visual}`} aria-hidden="true">
        <span className="blog-visual-kicker">{post.categoryLabel}</span>
        <span className="blog-mini-chart">
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <article className="blog-article-body" itemScope itemType="https://schema.org/BlogPosting">
        <TagList tags={post.tags} />
        <h3 itemProp="headline">{post.title}</h3>
        <p itemProp="description">{post.excerpt}</p>
        <div className="blog-meta">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
        <span className="blog-read-cta">Read</span>
      </article>
    </Link>
  );
}

function ProductCallout() {
  return (
    <div className="blog-product-callout">
      <div>
        <h3>Route every campaign click with DeepLinkOS</h3>
        <p>Create smart links for creator bios, QR codes, email, Shopify campaigns, and app installs in minutes.</p>
      </div>
      <Link href="/signup">Try DeepLinkOS</Link>
    </div>
  );
}

function BlogSidebar({ onTopic }: { onTopic: (topic: string) => void }) {
  return (
    <aside className="blog-sidebar" aria-label="Blog sidebar">
      <section className="blog-side-panel" aria-labelledby="topics-title">
        <h2 id="topics-title">Browse topics</h2>
        <div className="blog-topic-list">
          {blogTopics.map((topic) => (
            <button className="blog-topic" type="button" key={topic} onClick={() => onTopic(topic)}>
              {topic}
            </button>
          ))}
        </div>
      </section>

      <SidebarList title="Trending now" titleId="trending-title" items={trendingPosts} />
      <SidebarList title="Popular reads" titleId="popular-title" items={popularPosts} />
    </aside>
  );
}

function SidebarList({ title, titleId, items }: { title: string; titleId: string; items: typeof trendingPosts }) {
  return (
    <section className="blog-side-panel" aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      <div className="blog-trend-list">
        {items.map((item) => (
          <Link className="blog-trend-item" href={`/blog/${item.slug}`} key={item.slug}>
            <span className="blog-rank">{item.rank}</span>
            <span>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BlogNewsletter() {
  return (
    <section className="blog-newsletter" aria-labelledby="newsletter-title">
      <div>
        <span className="blog-eyebrow">Weekly digest</span>
        <h2 id="newsletter-title">
          Better <span className="grad-text">Growth Ideas</span>
          <br />
          Every Tuesday
        </h2>
        <p>One practical experiment for creators, founders, and store owners.</p>
        <div className="blog-newsletter-proof" aria-label="Newsletter highlights">
          <span>5 minute read</span>
          <span>One campaign teardown</span>
          <span>No recycled tips</span>
        </div>
      </div>
      <form className="blog-newsletter-form" action="#">
        <label>
          <span className="sr-only">First name</span>
          <input type="text" name="first-name" autoComplete="given-name" placeholder="First name" />
        </label>
        <label>
          <span className="sr-only">Email address</span>
          <input type="email" name="email" autoComplete="email" placeholder="Email address" required />
        </label>
        <button className="btn btn-primary" type="submit">
          Subscribe
        </button>
        <span className="blog-form-note">No spam. Unsubscribe anytime.</span>
      </form>
    </section>
  );
}

function BlogSectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  titleId: string;
}) {
  return (
    <div className="blog-section-heading">
      <div>
        <span className="blog-eyebrow">{eyebrow}</span>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function TagList({ tags }: { tags: Array<{ label: string; tone?: "blue" | "coral" | "gold" | "violet" }> }) {
  return (
    <div className="blog-tagline">
      {tags.map((tag) => (
        <span className={tag.tone ? `blog-tag blog-tag--${tag.tone}` : "blog-tag"} key={tag.label}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
