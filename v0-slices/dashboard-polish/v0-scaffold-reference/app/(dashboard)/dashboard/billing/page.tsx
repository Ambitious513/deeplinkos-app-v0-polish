'use client'

import { CreditCard, Download, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Panel, PanelHeader, Badge, ProgressBar } from '@/components/dashboard/primitives'
import { Button } from '@/components/ui/button'
import { currentUser, invoices } from '@/lib/mock-data'

const usage = [
  { label: 'Monthly clicks', used: 248910, limit: 350000, tone: 'brand' as const },
  { label: 'Active links', used: 184, limit: 500, tone: 'info' as const },
  { label: 'Custom domains', used: 2, limit: 5, tone: 'success' as const },
]

export default function BillingPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Billing"
        description="Manage your plan, usage limits, payment method, and invoices."
        action={
          <Button>
            <Sparkles className="size-4" /> Compare plans
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Plan */}
        <Panel className="overflow-hidden border-transparent bg-success p-6 text-white lg:col-span-1">
          <p className="text-sm font-semibold text-white/75">Current plan</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{currentUser.plan}</p>
          <p className="mt-1 text-sm text-white/80">$79 / month · billed monthly</p>
          <div className="mt-4 grid gap-1.5 text-sm text-white/90">
            <p>Up to 350k monthly clicks</p>
            <p>Unlimited smart links</p>
            <p>5 custom domains</p>
          </div>
          <Button className="mt-6 h-10 w-full rounded-xl bg-white text-success hover:bg-white/90">
            Upgrade plan
          </Button>
        </Panel>

        {/* Usage */}
        <Panel className="p-6 lg:col-span-2">
          <PanelHeader title="Usage this cycle" subtitle="Resets on May 1, 2026" />
          <div className="mt-5 grid gap-5">
            {usage.map((u) => {
              const pct = Math.round((u.used / u.limit) * 100)
              return (
                <div key={u.label} className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{u.label}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {u.used.toLocaleString()} / {u.limit.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar value={pct} tone={u.tone} />
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Payment method */}
        <Panel className="p-6 lg:col-span-1">
          <PanelHeader title="Payment method" />
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
            <span className="grid size-10 place-items-center rounded-lg bg-card text-foreground">
              <CreditCard className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Visa •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 09 / 2027</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Update payment method
          </Button>
        </Panel>

        {/* Invoices */}
        <Panel className="overflow-hidden lg:col-span-2">
          <div className="p-6 pb-0">
            <PanelHeader title="Invoices" subtitle="Download past statements" />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-y border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-2.5 text-left font-semibold">Invoice</th>
                  <th className="px-6 py-2.5 text-left font-semibold">Date</th>
                  <th className="px-6 py-2.5 text-left font-semibold">Status</th>
                  <th className="px-6 py-2.5 text-right font-semibold">Amount</th>
                  <th className="px-6 py-2.5 text-right font-semibold" />
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-semibold">{inv.id}</td>
                    <td className="px-6 py-3 text-muted-foreground">{inv.date}</td>
                    <td className="px-6 py-3">
                      <Badge tone="success">{inv.status}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums">{inv.amount}</td>
                    <td className="px-6 py-3 text-right">
                      <button
                        aria-label={`Download ${inv.id}`}
                        className="inline-grid size-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                      >
                        <Download className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  )
}
