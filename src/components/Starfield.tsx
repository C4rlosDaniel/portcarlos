import { useEffect, useRef } from 'react'

const STAR_COUNT = 200

type Star = { x: number; y: number; r: number; a: number; sx: number }

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let raf = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawn = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.4 + Math.random() * 1.2,
        a: 0.35 + Math.random() * 0.65,
        sx: 0.02 + Math.random() * 0.06,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        ctx.globalAlpha = star.a
        ctx.fillStyle = '#e8eaf2'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      for (const star of stars) {
        star.x -= star.sx
        if (star.x < -2) star.x = canvas.width + 2
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    resize()
    spawn()
    if (reduced) {
      draw()
      return
    }

    let running = true
    const stop = () => cancelAnimationFrame(raf)
    const start = () => {
      if (running) tick()
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    tick()
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', onVisibility)

    function handleResize() {
      resize()
      spawn()
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 block"
    />
  )
}