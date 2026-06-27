'use client'

import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Panel, PanelHeader } from '@/components/dashboard/primitives'
import { Field, SelectInput, TextInput } from '@/components/dashboard/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { links } from '@/lib/mock-data'

const presets = [
  { name: 'Sunset', fg: '#ea6a1c', bg: '#ffffff' },
  { name: 'Forest', fg: '#168558', bg: '#ffffff' },
  { name: 'Ink', fg: '#14171d', bg: '#ffffff' },
  { name: 'Ocean', fg: '#2563eb', bg: '#eaf1ff' },
  { name: 'Inverted', fg: '#ffffff', bg: '#14171d' },
]

// Deterministic faux-QR matrix so the preview is stable across renders.
function useMatrix(seed: string) {
  return useMemo(() => {
    const size = 21
    const cells: boolean[] = []
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
    for (let i = 0; i < size * size; i++) {
      h = (h * 1103515245 + 12345) >>> 0
      cells.push(((h >> 16) & 1) === 1)
    }
    return { size, cells }
  }, [seed])
}

function QrPreview({
  fg,
  bg,
  scale,
  seed,
}: {
  fg: string
  bg: string
  scale: number
  seed: string
}) {
  const { size, cells } = useMatrix(seed)
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0)
  }
  return (
    <div
      className="rounded-2xl p-5 transition-transform"
      style={{ background: bg, transform: `scale(${scale})` }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-44 w-44 sm:h-52 sm:w-52"
        role="img"
        aria-label="QR code preview"
      >
        {cells.map((on, i) => {
          const r = Math.floor(i / size)
          const c = i % size
          if (isFinder(r, c)) return null
          if (!on) return null
          return <rect key={i} x={c} y={r} width={1} height={1} fill={fg} rx={0.25} />
        })}
        {/* finder patterns */}
        {[
          [0, 0],
          [0, size - 7],
          [size - 7, 0],
        ].map(([r, c], i) => (
          <g key={i}>
            <rect x={c} y={r} width={7} height={7} rx={1.6} fill={fg} />
            <rect x={c + 1} y={r + 1} width={5} height={5} rx={1.2} fill={bg} />
            <rect x={c + 2} y={r + 2} width={3} height={3} rx={0.8} fill={fg} />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function QrDesignerPage() {
  const [linkId, setLinkId] = useState(links[0].id)
  const [destination, setDestination] = useState(`go.acme.com/${links[0].slug}`)
  const [fg, setFg] = useState('#ea6a1c')
  const [bg, setBg] = useState('#ffffff')
  const [size, setSize] = useState(512)

  const previewScale = 0.85 + (size / 1024) * 0.3

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Design"
        title="QR Designer"
        description="Generate branded QR codes for any smart link and export print-ready PNGs."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start">
        {/* Preview surface */}
        <Panel className="flex flex-col items-center gap-4 p-6">
          <div className="grid w-full place-items-center rounded-2xl border border-dashed border-border bg-muted/40 py-6">
            <QrPreview fg={fg} bg={bg} scale={previewScale} seed={destination} />
          </div>
          <div className="w-full text-center">
            <p className="truncate text-sm font-semibold">{destination}</p>
            <p className="text-xs text-muted-foreground">
              {size} × {size}px • PNG
            </p>
          </div>
          <Button className="h-11 w-full rounded-xl">
            <Download className="size-4" />
            Download PNG
          </Button>
        </Panel>

        {/* Controls */}
        <Panel className="p-6">
          <PanelHeader title="Customize" subtitle="Link, destination, colors and size" />
          <div className="mt-5 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Smart link">
                <SelectInput
                  value={linkId}
                  onChange={(e) => {
                    const id = e.target.value
                    setLinkId(id)
                    const found = links.find((l) => l.id === id)
                    if (found) setDestination(`go.acme.com/${found.slug}`)
                  }}
                >
                  {links.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Destination URL">
                <TextInput
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-1.5">
              <span className="text-sm font-semibold">Color presets</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => {
                  const active = p.fg === fg && p.bg === bg
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setFg(p.fg)
                        setBg(p.bg)
                      }}
                      aria-pressed={active}
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                        active
                          ? 'border-brand bg-brand-soft text-brand'
                          : 'border-border hover:bg-muted',
                      )}
                    >
                      <span
                        className="size-4 rounded-full border border-border"
                        style={{ background: p.fg }}
                      />
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Foreground">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fg}
                    onChange={(e) => setFg(e.target.value)}
                    aria-label="Foreground color"
                    className="size-10 shrink-0 cursor-pointer rounded-lg border border-border bg-transparent"
                  />
                  <TextInput value={fg} onChange={(e) => setFg(e.target.value)} />
                </div>
              </Field>
              <Field label="Background">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    aria-label="Background color"
                    className="size-10 shrink-0 cursor-pointer rounded-lg border border-border bg-transparent"
                  />
                  <TextInput value={bg} onChange={(e) => setBg(e.target.value)} />
                </div>
              </Field>
            </div>

            <Field label={`Size — ${size}px`}>
              <input
                type="range"
                min={256}
                max={1024}
                step={64}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-brand"
                aria-label="QR size"
              />
            </Field>
          </div>
        </Panel>
      </div>
    </div>
  )
}
