import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { skills, orbitRadii } from '../data/skills'
import { l } from '../i18n'

const CX = 500
const CY = 500
const SUN_R = 60
const sizeToRadius: Record<number, number> = { 1: 20, 2: 24, 3: 28 }

type Props = {
  paused: boolean
  onOpen: (id: string) => void
}

export default function SolarSystem({ paused, onOpen }: Props) {
  const { t } = useTranslation()
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const elapsed = useRef(0)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!paused && !document.hidden) elapsed.current += dt
      skills.forEach((planet, i) => {
        const group = groupRefs.current[i]
        if (!group) return
        const angle = (elapsed.current / planet.orbitSeconds) * Math.PI * 2 + i * ((Math.PI * 2) / skills.length)
        const radius = orbitRadii[i]
        const x = CX + radius * Math.cos(angle)
        const y = CY + radius * Math.sin(angle)
        group.setAttribute('transform', `translate(${x} ${y})`)
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  return (
    <svg
      viewBox="0 0 1000 1000"
      role="img"
      aria-label={t('skills.sun')}
      className="mx-auto h-auto w-full max-w-[760px]"
    >
      <defs>
        {skills.map((planet) => (
          <radialGradient key={planet.id} id={`grad-${planet.id}`} cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor={planet.colors[0]} />
            <stop offset="100%" stopColor={planet.colors[1]} />
          </radialGradient>
        ))}
      </defs>

      <circle cx={CX} cy={CY} r={SUN_R} fill="#1c1633" stroke="var(--accent)" strokeWidth={2} />
      <text
        x={CX}
        y={CY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--accent-2)"
        style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 600 }}
      >
        Carlos
      </text>

      {skills.map((planet, i) => {
        const radius = orbitRadii[i]
        const planetR = sizeToRadius[planet.size]
        return (
          <g key={planet.id}>
            <circle cx={CX} cy={CY} r={radius} fill="none" stroke="var(--border)" strokeWidth={1} />
            <g
              ref={(el) => {
                groupRefs.current[i] = el
              }}
            >
              <g
                role="button"
                tabIndex={0}
                aria-label={l(planet.name)}
                onClick={() => onOpen(planet.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onOpen(planet.id)
                  }
                }}
                className="cursor-pointer"
                style={{ outlineOffset: 4 }}
              >
                <circle r={32} fill="transparent" />
                <circle r={planetR} fill={`url(#grad-${planet.id})`} opacity={0.95} />
                <circle r={planetR + 6} fill="none" stroke={`${planet.colors[0]}55`} strokeWidth={8} opacity={0.45} />
              </g>
              <title>{l(planet.name)}</title>
            </g>
          </g>
        )
      })}
    </svg>
  )
}