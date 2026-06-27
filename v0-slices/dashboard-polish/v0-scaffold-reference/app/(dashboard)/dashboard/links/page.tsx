'use client'

import { useMemo, useState } from 'react'
import {
  Copy,
  Pencil,
  QrCode,
  Pause,
  Play,
  Wrench,
  Search,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Panel, Badge, Segmented, type Tone } from '@/components/dashboard/primitives'
import { TextInput } from '@/components/dashboard/form'
import { links, type DeepLink, type LinkStatus } from '@/lib/mock-data'

type Filter = 'all' | 'active' | 'paused' | 'attention'

const statusMeta: Record<LinkStatus, { label: string; tone: Tone }> = {
  active: { label: 'Active', tone: 'success' },
  paused: { label: 'Paused', tone: 'neutral' },
  attention: { label: 'Needs attention', tone: 'warning' },
}

function LinkActions({ status }: { status: LinkStatus }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className="flex items-center justify-end gap-1">
      <IconBtn label="Copy link" onClick={copy}>
        {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
      </IconBtn>
      <IconBtn label="Edit">
        <Pencil className="size-4" />
      </IconBtn>
      <IconBtn label="QR code">
        <QrCode className="size-4" />
      </IconBtn>
      {status === 'attention' ? (
        <IconBtn label="Fix link" tone>
          <Wrench className="size-4" />
        </IconBtn>
      ) : status === 'paused' ? (
        <IconBtn label="Resume">
          <Play className="size-4" />
        </IconBtn>
      ) : (
        <IconBtn label="Pause">
          <Pause className="size-4" />
        </IconBtn>
      )}
    </div>
  )
}

function IconBtn({
  children,
  label,
  onClick,
  tone,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
  tone?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={
        'grid size-8 place-items-center rounded-lg border border-border bg-card transition-colors hover:bg-muted ' +
        (tone ? 'text-warning' : 'text-muted-foreground hover:text-foreground')
      }
    >
      {children}
    </button>
  )
}

export default function LinksPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return links.filter((l) => {
      const matchesFilter = filter === 'all' || l.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.slug.toLowerCase().includes(q) ||
        l.destination.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  const counts = useMemo(
    () => ({
      all: links.length,
      active: links.filter((l) => l.status === 'active').length,
      paused: links.filter((l) => l.status === 'paused').length,
      attention: links.filter((l) => l.status === 'attention').length,
    }),
    [],
  )

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Manage"
        title="Links"
        description="Search, filter, and manage every smart link in your workspace."
      />

      {/* Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Segmented
          options={[
            { label: `All (${counts.all})`, value: 'all' },
            { label: `Active (${counts.active})`, value: 'active' },
            { label: `Paused (${counts.paused})`, value: 'paused' },
            { label: `Attention (${counts.attention})`, value: 'attention' },
          ]}
          value={filter}
          onChange={setFilter}
          size="sm"
        />
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search links…"
            className="pl-9"
            aria-label="Search links"
          />
        </div>
      </div>

      {/* Desktop table */}
      <Panel className="hidden overflow-hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 text-left font-semibold">Smart link</th>
                <th className="px-5 py-3 text-left font-semibold">Platform</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Clicks</th>
                <th className="px-5 py-3 text-right font-semibold">Open rate</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-xs text-muted-foreground">go.acme.com/{l.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{l.platform}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusMeta[l.status].tone}>
                      {statusMeta[l.status].label}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold tabular-nums">
                    {l.clicks.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums">{l.openRate}%</td>
                  <td className="px-5 py-3.5">
                    <LinkActions status={l.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState />}
      </Panel>

      {/* Mobile cards */}
      <div className="grid gap-3 lg:hidden">
        {filtered.map((l) => (
          <Panel key={l.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold">{l.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  go.acme.com/{l.slug}
                </p>
              </div>
              <Badge tone={statusMeta[l.status].tone}>{statusMeta[l.status].label}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span>
                <span className="font-bold tabular-nums">{l.clicks.toLocaleString()}</span>{' '}
                <span className="text-muted-foreground">clicks</span>
              </span>
              <span>
                <span className="font-bold tabular-nums">{l.openRate}%</span>{' '}
                <span className="text-muted-foreground">open</span>
              </span>
              <span className="text-muted-foreground">{l.platform}</span>
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <LinkActions status={l.status} />
            </div>
          </Panel>
        ))}
        {filtered.length === 0 && (
          <Panel className="p-4">
            <EmptyState />
          </Panel>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="grid place-items-center gap-2 px-6 py-14 text-center">
      <p className="text-sm font-semibold">No links match your filters</p>
      <p className="text-sm text-muted-foreground">
        Try a different search term or status filter.
      </p>
    </div>
  )
}
