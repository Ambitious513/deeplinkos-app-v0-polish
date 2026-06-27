/**
 * Typed mock data for the DeepLinkOS dashboard.
 *
 * Everything here is intentionally typed and centralised so it can be swapped
 * for real Supabase queries / RPCs (get_dashboard_analytics, get_clicks_by_day,
 * deep_links, domains, etc.) without touching the UI components.
 */

export type DateRange = '7d' | '30d' | 'all'

export type LinkStatus = 'active' | 'paused' | 'attention'

export type DeepLink = {
  id: string
  title: string
  slug: string
  destination: string
  platform: string
  status: LinkStatus
  clicks: number
  openRate: number // percentage
  createdAt: string
}

export type KpiTrend = 'up' | 'down'

export type Kpi = {
  id: string
  label: string
  value: string
  delta: string
  trend: KpiTrend
  featured?: boolean
}

export type SeriesPoint = { label: string; value: number; compare: number }

export type DeviceSlice = {
  label: string
  sessions: number
  share: number
  tone: 'brand' | 'success' | 'info'
}

export type ReferrerRow = { source: string; visits: number; share: number }

export type CountryRow = { country: string; flag: string; clicks: number; share: number }

export type CampaignRow = {
  name: string
  channel: string
  clicks: number
  conversions: number
  convRate: number
}

export type AttentionItem = {
  id: string
  title: string
  detail: string
  severity: 'warning' | 'danger' | 'info'
}

export type DomainStatus = 'active' | 'pending' | 'failed'

export type Domain = {
  id: string
  domain: string
  status: DomainStatus
  links: number
  ssl: 'issued' | 'pending' | 'error'
  addedAt: string
}

export const kpis: Kpi[] = [
  { id: 'clicks', label: 'Total clicks', value: '248,910', delta: '+12.4%', trend: 'up', featured: true },
  { id: 'visitors', label: 'Unique visitors', value: '96,540', delta: '+8.1%', trend: 'up' },
  { id: 'active', label: 'Active links', value: '184', delta: '+6', trend: 'up' },
  { id: 'referrer', label: 'Top referrer', value: 'Instagram', delta: '38% share', trend: 'up' },
  { id: 'success', label: 'Open success', value: '97.3%', delta: '-0.6%', trend: 'down' },
]

export const clicksByDay: SeriesPoint[] = [
  { label: 'Mon', value: 7200, compare: 6100 },
  { label: 'Tue', value: 9100, compare: 6900 },
  { label: 'Wed', value: 8300, compare: 7400 },
  { label: 'Thu', value: 11200, compare: 8100 },
  { label: 'Fri', value: 10400, compare: 9000 },
  { label: 'Sat', value: 13600, compare: 9700 },
  { label: 'Sun', value: 12100, compare: 10200 },
]

export const devices: DeviceSlice[] = [
  { label: 'Mobile', sessions: 61240, share: 63.4, tone: 'brand' },
  { label: 'Desktop', sessions: 28910, share: 29.9, tone: 'info' },
  { label: 'Tablet', sessions: 6390, share: 6.7, tone: 'success' },
]

export const referrers: ReferrerRow[] = [
  { source: 'Instagram', visits: 36720, share: 38 },
  { source: 'TikTok', visits: 24180, share: 25 },
  { source: 'Direct / QR', visits: 18460, share: 19 },
  { source: 'X (Twitter)', visits: 10240, share: 11 },
  { source: 'Email', visits: 6940, share: 7 },
]

export const countries: CountryRow[] = [
  { country: 'United States', flag: '🇺🇸', clicks: 84210, share: 34 },
  { country: 'United Kingdom', flag: '🇬🇧', clicks: 41980, share: 17 },
  { country: 'Germany', flag: '🇩🇪', clicks: 28640, share: 12 },
  { country: 'Brazil', flag: '🇧🇷', clicks: 22310, share: 9 },
  { country: 'India', flag: '🇮🇳', clicks: 19870, share: 8 },
  { country: 'Canada', flag: '🇨🇦', clicks: 14250, share: 6 },
]

export const campaigns: CampaignRow[] = [
  { name: 'Spring Launch', channel: 'Instagram', clicks: 42180, conversions: 5120, convRate: 12.1 },
  { name: 'Creator Drop', channel: 'TikTok', clicks: 31240, conversions: 2980, convRate: 9.5 },
  { name: 'Newsletter Q2', channel: 'Email', clicks: 18640, conversions: 3110, convRate: 16.7 },
  { name: 'Retargeting', channel: 'Meta Ads', clicks: 12410, conversions: 1840, convRate: 14.8 },
  { name: 'Podcast Promo', channel: 'Direct', clicks: 8230, conversions: 720, convRate: 8.7 },
]

export const links: DeepLink[] = [
  { id: 'lnk_01', title: 'Spring Sale Landing', slug: 'spring-sale', destination: 'shop.acme.com/spring', platform: 'Web', status: 'active', clicks: 42180, openRate: 96.4, createdAt: '2026-03-02' },
  { id: 'lnk_02', title: 'App Store Smart Open', slug: 'get-app', destination: 'apps.apple.com/app/acme', platform: 'iOS / Android', status: 'active', clicks: 38640, openRate: 94.1, createdAt: '2026-02-18' },
  { id: 'lnk_03', title: 'Creator TikTok Bio', slug: 'tiktok-bio', destination: 'linktr.ee/acme', platform: 'TikTok', status: 'active', clicks: 31240, openRate: 91.8, createdAt: '2026-03-11' },
  { id: 'lnk_04', title: 'Podcast Episode 42', slug: 'pod-42', destination: 'open.spotify.com/ep/42', platform: 'Spotify', status: 'paused', clicks: 8230, openRate: 88.2, createdAt: '2026-01-29' },
  { id: 'lnk_05', title: 'EU Checkout Fallback', slug: 'eu-checkout', destination: 'eu.acme.com/cart', platform: 'Web', status: 'attention', clicks: 14250, openRate: 72.5, createdAt: '2026-02-04' },
  { id: 'lnk_06', title: 'Newsletter CTA', slug: 'news-q2', destination: 'acme.com/blog/q2', platform: 'Email', status: 'active', clicks: 18640, openRate: 95.0, createdAt: '2026-03-20' },
  { id: 'lnk_07', title: 'Webinar Registration', slug: 'webinar-may', destination: 'events.acme.com/may', platform: 'Web', status: 'attention', clicks: 5410, openRate: 68.9, createdAt: '2026-04-01' },
  { id: 'lnk_08', title: 'Holiday Teaser', slug: 'holiday-teaser', destination: 'acme.com/holiday', platform: 'Web', status: 'paused', clicks: 3120, openRate: 90.4, createdAt: '2026-04-06' },
]

export const attentionItems: AttentionItem[] = [
  { id: 'att_01', title: 'Weak fallback on EU Checkout', detail: 'Desktop fallback URL returns a 404 for 8% of opens.', severity: 'danger' },
  { id: 'att_02', title: 'DNS pending for go.acme.io', detail: 'CNAME record not yet detected. Verification retrying.', severity: 'warning' },
  { id: 'att_03', title: '2 links need review', detail: 'Open rate dropped below 75% in the last 7 days.', severity: 'info' },
]

export const topLinks: DeepLink[] = [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 5)

export const domains: Domain[] = [
  { id: 'dom_01', domain: 'go.acme.com', status: 'active', links: 124, ssl: 'issued', addedAt: '2025-11-14' },
  { id: 'dom_02', domain: 'link.acme.io', status: 'active', links: 48, ssl: 'issued', addedAt: '2026-01-22' },
  { id: 'dom_03', domain: 'go.acme.io', status: 'pending', links: 0, ssl: 'pending', addedAt: '2026-04-05' },
  { id: 'dom_04', domain: 'l.acme.shop', status: 'failed', links: 0, ssl: 'error', addedAt: '2026-04-08' },
]

export type PixelIntegration = {
  id: string
  name: string
  description: string
  status: 'connected' | 'available'
}

export const pixels: PixelIntegration[] = [
  { id: 'ga4', name: 'Google Analytics 4', description: 'Send page views and conversions to GA4 measurement IDs.', status: 'available' },
  { id: 'meta', name: 'Meta Pixel', description: 'Track app opens and purchases across Meta ad accounts.', status: 'available' },
  { id: 'tiktok', name: 'TikTok Pixel', description: 'Attribute creator-driven traffic to TikTok campaigns.', status: 'available' },
]

export const invoices = [
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '$79.00', status: 'Paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '$79.00', status: 'Paid' },
  { id: 'INV-2026-002', date: 'Feb 1, 2026', amount: '$79.00', status: 'Paid' },
  { id: 'INV-2026-001', date: 'Jan 1, 2026', amount: '$79.00', status: 'Paid' },
]

export const currentUser = {
  name: 'Maya Okafor',
  email: 'maya@acme.com',
  role: 'Growth Lead',
  workspace: 'Acme Growth',
  initials: 'MO',
  plan: 'Scale',
}
