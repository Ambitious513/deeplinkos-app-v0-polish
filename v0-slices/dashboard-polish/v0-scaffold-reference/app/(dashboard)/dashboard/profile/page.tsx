'use client'

import { useState } from 'react'
import { Copy, Check, KeyRound, LogOut, Monitor, Smartphone } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Panel, PanelHeader, Badge } from '@/components/dashboard/primitives'
import { Field, TextInput, Toggle } from '@/components/dashboard/form'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/mock-data'

const sessions = [
  { id: 's1', device: 'MacBook Pro · Chrome', location: 'Lisbon, PT', current: true, icon: Monitor },
  { id: 's2', device: 'iPhone 15 · Safari', location: 'Lisbon, PT', current: false, icon: Smartphone },
]

export default function ProfilePage() {
  const [notif, setNotif] = useState({ weekly: true, alerts: true, product: false })
  const [copied, setCopied] = useState(false)
  const apiKey = 'dlos_live_8f3a••••••••••••••••2b71'

  const copyKey = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Profile"
        description="Manage your identity, notifications, API access, and security."
        action={<Button>Edit profile</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Identity */}
        <Panel className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <span className="grid size-20 place-items-center rounded-full bg-brand text-2xl font-bold text-brand-foreground">
              {currentUser.initials}
            </span>
            <p className="mt-3 text-lg font-bold">{currentUser.name}</p>
            <p className="text-sm text-muted-foreground">{currentUser.role}</p>
            <div className="mt-2">
              <Badge tone="brand">{currentUser.workspace}</Badge>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <Field label="Full name">
              <TextInput defaultValue={currentUser.name} />
            </Field>
            <Field label="Email">
              <TextInput defaultValue={currentUser.email} type="email" />
            </Field>
            <Field label="Role">
              <TextInput defaultValue={currentUser.role} />
            </Field>
          </div>
        </Panel>

        <div className="grid gap-4 lg:col-span-2">
          {/* Notifications */}
          <Panel className="p-6">
            <PanelHeader title="Notification preferences" subtitle="Choose what lands in your inbox" />
            <div className="mt-4 grid gap-1">
              {[
                { key: 'weekly', label: 'Weekly performance summary', desc: 'A digest of clicks and top links every Monday.' },
                { key: 'alerts', label: 'Link health alerts', desc: 'Get notified when a link needs attention.' },
                { key: 'product', label: 'Product updates', desc: 'New features and changelog announcements.' },
              ].map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.desc}</p>
                  </div>
                  <Toggle
                    checked={notif[row.key as keyof typeof notif]}
                    onChange={(v) => setNotif((p) => ({ ...p, [row.key]: v }))}
                    label={row.label}
                  />
                </div>
              ))}
            </div>
          </Panel>

          {/* API access */}
          <Panel className="p-6">
            <PanelHeader
              title="API access"
              subtitle="Use this key to manage links programmatically"
              action={
                <Button variant="outline" size="sm">
                  <KeyRound className="size-4" /> Rotate
                </Button>
              }
            />
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
              <code className="flex-1 truncate font-mono text-sm">{apiKey}</code>
              <button
                type="button"
                onClick={copyKey}
                aria-label="Copy API key"
                className="grid size-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              </button>
            </div>
          </Panel>

          {/* Security */}
          <Panel className="p-6">
            <PanelHeader title="Active sessions" subtitle="Devices currently signed in" />
            <div className="mt-3 grid gap-1">
              {sessions.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 border-b border-border py-3 last:border-0"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                      <Icon className="size-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{s.device}</p>
                      <p className="text-xs text-muted-foreground">{s.location}</p>
                    </div>
                    {s.current ? (
                      <Badge tone="success">This device</Badge>
                    ) : (
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-danger">
                        <LogOut className="size-4" /> Revoke
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
