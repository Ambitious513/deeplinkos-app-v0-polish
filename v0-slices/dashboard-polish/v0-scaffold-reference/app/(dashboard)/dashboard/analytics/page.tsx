'use client'

import { useState } from 'react'
import { Smartphone, Monitor, Tablet } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { DateRangeControl } from '@/components/dashboard/date-range'
import {
  Panel,
  PanelHeader,
  ProgressBar,
  IconTile,
  Segmented,
} from '@/components/dashboard/primitives'
import {
  clicksByDay,
  devices,
  referrers,
  countries,
  campaigns,
  type DateRange,
} from '@/lib/mock-data'

const deviceIcons = { Mobile: Smartphone, Desktop: Monitor, Tablet: Tablet } as const

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>('30d')
  const [compare, setCompare] = useState<'on' | 'off'>('on')

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Performance"
        title="Analytics"
        description="Deep performance workspace for traffic, devices, geography, and campaigns."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Segmented
              options={[
                { label: 'Compare', value: 'on' },
                { label: 'Single', value: 'off' },
              ]}
              value={compare}
              onChange={setCompare}
              size="sm"
            />
            <DateRangeControl value={range} onChange={setRange} />
          </div>
        }
      />

      {/* Trend */}
      <Panel className="p-5">
        <PanelHeader
          title="Clicks over time"
          subtitle={compare === 'on' ? 'Compared to previous period' : 'Current period'}
        />
        <div className="mt-4">
          <TrendChart data={clicksByDay} showCompare={compare === 'on'} />
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
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

        {/* Referrers */}
        <Panel className="p-5">
          <PanelHeader title="Referrers & sources" subtitle="Click distribution by source" />
          <ul className="mt-3">
            {referrers.map((r) => (
              <li
                key={r.source}
                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{r.source}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {r.visits.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={r.share} tone="brand" />
                  </div>
                </div>
                <span className="w-9 text-right text-sm font-bold tabular-nums">
                  {r.share}%
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Locations */}
      <Panel className="overflow-hidden">
        <div className="p-5 pb-0">
          <PanelHeader title="Locations" subtitle="Top countries by clicks" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2.5 text-left font-semibold">Country</th>
                <th className="px-5 py-2.5 text-right font-semibold">Clicks</th>
                <th className="px-5 py-2.5 text-left font-semibold">Share</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.country} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2.5 font-semibold">
                      <span className="text-lg leading-none">{c.flag}</span>
                      {c.country}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {c.clicks.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <ProgressBar value={c.share * 2.5} tone="info" className="max-w-[160px]" />
                      <span className="w-9 text-right font-bold tabular-nums">
                        {c.share}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Campaigns */}
      <Panel className="overflow-hidden">
        <div className="p-5 pb-0">
          <PanelHeader title="Campaign performance" subtitle="Clicks and conversions by campaign" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2.5 text-left font-semibold">Campaign</th>
                <th className="px-5 py-2.5 text-left font-semibold">Channel</th>
                <th className="px-5 py-2.5 text-right font-semibold">Clicks</th>
                <th className="px-5 py-2.5 text-right font-semibold">Conversions</th>
                <th className="px-5 py-2.5 text-right font-semibold">Conv. rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-semibold">{c.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.channel}</td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {c.clicks.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {c.conversions.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right font-bold tabular-nums text-success">
                    {c.convRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
