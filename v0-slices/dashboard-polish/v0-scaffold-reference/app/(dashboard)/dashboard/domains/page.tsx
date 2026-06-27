'use client'

import { useState } from 'react'
import {
  Check,
  Copy,
  Globe,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Plus,
} from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Panel, PanelHeader, Badge, StatusDot, type Tone } from '@/components/dashboard/primitives'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { domains, type DomainStatus } from '@/lib/mock-data'

const statusMeta: Record<DomainStatus, { label: string; tone: Tone }> = {
  active: { label: 'Active', tone: 'success' },
  pending: { label: 'Pending', tone: 'warning' },
  failed: { label: 'Failed', tone: 'danger' },
}

const dnsRecords = [
  { type: 'CNAME', name: 'go', value: 'cname.deeplinkos.net' },
  { type: 'TXT', name: '_dlos', value: 'dlos-verify=8f3a2b71c4d9' },
]

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }}
      aria-label="Copy value"
      className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
    </button>
  )
}

export default function DomainsPage() {
  const [selected, setSelected] = useState(domains.find((d) => d.status !== 'active')?.id ?? domains[0].id)
  const active = domains.find((d) => d.id === selected) ?? domains[0]

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Features"
        title="Custom Domains"
        description="Connect branded domains and verify DNS to start routing smart links."
        action={
          <Button>
            <Plus className="size-4" /> Add domain
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-start">
        {/* Domains list */}
        <Panel className="overflow-hidden">
          <div className="p-5 pb-3">
            <PanelHeader title="Connected domains" subtitle="Select a domain to view DNS records" />
          </div>
          <ul>
            {domains.map((d) => {
              const meta = statusMeta[d.status]
              const isSel = d.id === selected
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(d.id)}
                    className={cn(
                      'flex w-full items-center gap-3 border-t border-border px-5 py-4 text-left transition-colors',
                      isSel ? 'bg-muted/50' : 'hover:bg-muted/30',
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <Globe className="size-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{d.domain}</p>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <StatusDot tone={meta.tone} />
                        {d.links} links · added {d.addedAt}
                      </p>
                    </div>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>

        {/* DNS panel */}
        <Panel className="p-5">
          <PanelHeader
            title="DNS configuration"
            subtitle={active.domain}
            action={
              <Button variant="outline" size="sm">
                <RefreshCw className="size-4" /> Verify
              </Button>
            }
          />

          {/* SSL status */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3.5">
            {active.ssl === 'issued' ? (
              <ShieldCheck className="size-5 text-success" />
            ) : (
              <ShieldAlert className="size-5 text-warning" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">SSL certificate</p>
              <p className="text-xs text-muted-foreground">
                {active.ssl === 'issued'
                  ? 'Issued and auto-renewing'
                  : active.ssl === 'pending'
                    ? 'Provisioning after DNS verification'
                    : 'Failed — check DNS records below'}
              </p>
            </div>
            <Badge
              tone={
                active.ssl === 'issued'
                  ? 'success'
                  : active.ssl === 'pending'
                    ? 'warning'
                    : 'danger'
              }
            >
              {active.ssl}
            </Badge>
          </div>

          {/* Records */}
          <p className="mt-5 text-sm font-semibold">Required records</p>
          <div className="mt-2 grid gap-2">
            {dnsRecords.map((r) => (
              <div key={r.type} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <Badge tone="info">{r.type}</Badge>
                  <span className="text-xs text-muted-foreground">Name: {r.name}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
                  <code className="flex-1 truncate font-mono text-xs">{r.value}</code>
                  <CopyValue value={r.value} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
