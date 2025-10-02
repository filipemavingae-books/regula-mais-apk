import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = ({ children, variant = 'default' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Criar partículas
    const createParticles = () => {
      particles = []
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)` // Tons de azul/verde
        })
      }
    }

    // Animar partículas
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Manter dentro dos limites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Desenhar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Conectar partículas próximas
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (100 - distance) / 100 * 0.1
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animateParticles)
    }

    // Inicializar
    resizeCanvas()
    createParticles()
    animateParticles()

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const backgroundVariants = {
    default: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    hero: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    dark: {
      background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Canvas de fundo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: backgroundVariants[variant]?.background || backgroundVariants.default.background,
          opacity: 0.1 
        }}
      />
      
      {/* Gradiente overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundVariants[variant]?.background || backgroundVariants.default.background,
          opacity: 0.05
        }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Elementos geométricos flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full border border-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default AnimatedBackground
