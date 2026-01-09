import { type FC, useEffect, useRef } from 'react'

interface Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string[]
}

const AnimatedBubbles: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Create bubbles with distinct colors
    const bubbles: Bubble[] = []
    const colors = [
      ['236, 72, 153', '219, 39, 119'], // Pink
      ['168, 85, 247', '147, 51, 234'], // Purple
      ['59, 130, 246', '37, 99, 235'] // Blue
    ]

    for (let i = 0; i < colors.length; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 300, // 300-500px
        speedX: (Math.random() - 0.5) * 0.8, // -0.4 to 0.4
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.2 + 0.15, // 0.15-0.35
        color: colors[i]
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        // Update position
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Bounce off edges
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size
        if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size
        if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size

        // Draw bubble with distinct color
        const gradient = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, bubble.size)
        gradient.addColorStop(0, `rgba(${bubble.color[0]}, ${bubble.opacity * 0.6})`)
        gradient.addColorStop(0.7, `rgba(${bubble.color[1]}, ${bubble.opacity * 0.4})`)
        gradient.addColorStop(1, `rgba(${bubble.color[1]}, ${bubble.opacity * 0.1})`)

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}

export default AnimatedBubbles
