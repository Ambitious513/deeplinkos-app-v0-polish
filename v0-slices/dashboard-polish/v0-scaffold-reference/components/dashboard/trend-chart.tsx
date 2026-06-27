'use client'

import { useId } from 'react'
import type { SeriesPoint } from '@/lib/mock-data'

function buildPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return ''
  // Smooth-ish line using simple cubic interpolation.
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cx = (prev.x + curr.x) / 2
    d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return d
}

export function TrendChart({
  data,
  showCompare = true,
  height = 240,
}: {
  data: SeriesPoint[]
  showCompare?: boolean
  height?: number
}) {
  const gradientId = useId()
  const width = 720
  const padX = 8
  const padY = 18
  const max = Math.max(...data.map((d) => Math.max(d.value, d.compare))) * 1.1
  const min = 0

  const toXY = (val: number, i: number) => {
    const x = padX + (i / (data.length - 1)) * (width - padX * 2)
    const y = padY + (1 - (val - min) / (max - min)) * (height - padY * 2)
    return { x, y }
  }

  const mainPts = data.map((d, i) => toXY(d.value, i))
  const comparePts = data.map((d, i) => toXY(d.compare, i))
  const mainPath = buildPath(mainPts)
  const comparePath = buildPath(comparePts)
  const areaPath = `${mainPath} L ${mainPts[mainPts.length - 1].x} ${height - padY} L ${mainPts[0].x} ${height - padY} Z`

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[220px] w-full sm:h-[240px]"
        preserveAspectRatio="none"
        role="img"
        aria-label="Traffic trend over time"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={width - padX}
            y1={padY + g * (height - padY * 2)}
            y2={padY + g * (height - padY * 2)}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}

        {showCompare ? (
          <path
            d={comparePath}
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.45"
          />
        ) : null}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={mainPath}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {mainPts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="var(--card)"
            stroke="var(--brand)"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <div className="mt-3 flex justify-between px-1 text-xs font-medium text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}
