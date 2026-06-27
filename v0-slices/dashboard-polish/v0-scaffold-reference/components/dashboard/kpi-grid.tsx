import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Kpi } from '@/lib/mock-data'

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {items.map((kpi) => {
        const featured = kpi.featured
        return (
          <div
            key={kpi.id}
            className={cn(
              'relative overflow-hidden rounded-2xl border p-4 shadow-sm',
              featured
                ? 'border-transparent bg-success text-white'
                : 'border-border bg-card',
            )}
          >
            <p
              className={cn(
                'text-xs font-semibold',
                featured ? 'text-white/75' : 'text-muted-foreground',
              )}
            >
              {kpi.label}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums sm:text-[1.7rem]">
              {kpi.value}
            </p>
            <span
              className={cn(
                'mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
                featured
                  ? 'bg-white/15 text-white'
                  : kpi.trend === 'up'
                    ? 'bg-success-soft text-success'
                    : 'bg-danger-soft text-danger',
              )}
            >
              {kpi.trend === 'up' ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {kpi.delta}
            </span>
            {featured && (
              <span
                className="pointer-events-none absolute -bottom-12 -right-10 size-36 rounded-full border-[20px] border-white/10"
                aria-hidden
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
