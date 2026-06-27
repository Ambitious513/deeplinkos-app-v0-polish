'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Info,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { DateRangeControl } from '@/components/dashboard/date-range'
import {
  Panel,
  PanelHeader,
  ProgressBar,
  Badge,
  IconTile,
  type Tone,
} from '@/components/dashboard/primitives'
import {
  kpis,
  clicksByDay,
  devices,
  referrers,
  topLinks,
  attentionItems,
  type DateRange,
} from '@/lib/mock-data'

const deviceIcons = { Mobile: Smartphone, Desktop: Monitor, Tablet: Tablet } as const

const severityTone: Record<string, Tone> = {
  danger: 'danger',
  warning: 'warning',
  info: 'info',
}

export default function OverviewPage() {
  const [range, setRange] = useState<DateRange>('7d')

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Workspace"
        title="Overview"
        description="A real-time snapshot of clicks, audiences, and links that need your attention."
        action={<DateRangeControl value={range} onChange={setRange} />}
      />

      <KpiGrid items={kpis} />

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        {/* Trend chart */}
        <Panel className="p-5">
          <PanelHeader
            title="Traffic trend"
            subtitle="Clicks vs. previous period"
            action={
              <div className="hidden items-center gap-3 text-xs font-medium text-muted-foreground sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-brand" /> This period
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-muted-foreground/50" /> Previous
                </span>
              </div>
            }
          />
          <div className="mt-4">
            <TrendChart data={clicksByDay} />
          </div>
        </Panel>

        {/* Device breakdown */}
        <Panel className="p-5">
          <PanelHeader title="Device breakdown" subtitle="Sessions by device type" />
          <div className="mt-4 grid gap-4">
            {devices.map((d) => {
              const Icon = deviceIcons[d.label as keyof typeof deviceIcons]
              return (
                <div key={d.label} className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <IconTile tone={d.tone}>
                      <Icon className="size-[18px]" />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{d.label}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {d.sessions.toLocaleString()} sessions
                      </p>
                    </div>
                    <span className="text-sm font-bold tabular-nums">{d.share}%</span>
                  </div>
                  <ProgressBar value={d.share} tone={d.tone} />
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* Top links */}
        <Panel className="p-5 xl:col-span-2">
          <PanelHeader
            title="Top performing links"
            subtitle="Highest click volume this period"
          />
          <ul className="mt-2">
            {topLinks.map((link, i) => (
              <li
                key={link.id}
                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{link.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    go.acme.com/{link.slug}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums">
                    {link.clicks.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{link.openRate}% open</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Referrers */}
        <Panel className="p-5">
          <PanelHeader title="Top sources" subtitle="Where clicks come from" />
          <ul className="mt-2">
            {referrers.map((r) => (
              <li key={r.source} className="grid gap-1.5 py-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{r.source}</span>
                  <span className="font-bold tabular-nums">{r.share}%</span>
                </div>
                <ProgressBar value={r.share} tone="brand" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Attention items */}
      <Panel className="p-5">
        <PanelHeader
          title="Needs attention"
          subtitle="Links and domains flagged for review"
          action={
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
              View all <ArrowUpRight className="size-4" />
            </button>
          }
        />
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {attentionItems.map((item) => {
            const tone = severityTone[item.severity]
            const Icon =
              item.severity === 'danger'
                ? AlertTriangle
                : item.severity === 'warning'
                  ? AlertTriangle
                  : Info
            return (
              <div
                key={item.id}
                className="flex gap-3 rounded-2xl border border-border bg-background/60 p-4"
              >
                <IconTile tone={tone}>
                  <Icon className="size-[18px]" />
                </IconTile>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold leading-tight">{item.title}</p>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                  <div className="mt-2">
                    <Badge tone={tone}>{item.severity}</Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
