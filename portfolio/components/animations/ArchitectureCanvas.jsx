"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Componente Canvas interativo com sincronização contínua.
 * Todos os nós mantêm legibilidade excelente (sem cartões escuros ou apagados)
 * e ganham iluminação ativa, bordas com glow e fluxo de dados à medida que o scroll avança
 * ou quando há interação de foco/hover.
 */
export default function ArchitectureCanvas({ activeSkill = null, className = "" }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const playheadRef = useRef({ progress: 0 })
  const activeRef = useRef(activeSkill)
  const redrawRef = useRef(null)

  // Hover/foco só atualiza a ref e pede um redesenho (sem recriar o canvas).
  useEffect(() => {
    activeRef.current = activeSkill
    redrawRef.current?.()
  }, [activeSkill])

  useGSAP(
    () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const logicalWidth = 560
      const logicalHeight = 650
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Resolução nítida: buffer = largura CSS real × devicePixelRatio (sem reamostragem pelo navegador)
      let scale = 1
      const resize = () => {
        const cssWidth = canvas.getBoundingClientRect().width || logicalWidth
        const ratio = Math.min(window.devicePixelRatio || 1, 3)
        scale = (cssWidth / logicalWidth) * ratio
        canvas.width = Math.round(logicalWidth * scale)
        canvas.height = Math.round(logicalHeight * scale)
      }
      resize()

      const playhead = playheadRef.current

      function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width - radius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
      }

      function render(p, highlightSkill) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0)
        ctx.textBaseline = "alphabetic"
        ctx.clearRect(0, 0, logicalWidth, logicalHeight)
        const clock = reduceMotion ? 0 : Date.now()

        // Progressos graduais (0 a 1) que completam antes do final da seção
        const pFront = Math.min(1, p * 2.2)
        const pConn1 = Math.min(1, Math.max(0, (p - 0.15) * 2.5))
        const pBack = Math.min(1, Math.max(0, (p - 0.25) * 2.2))
        const pConn2 = Math.min(1, Math.max(0, (p - 0.45) * 2.5))
        const pDb = Math.min(1, Math.max(0, (p - 0.55) * 2.2))
        const pDevOps = Math.min(1, Math.max(0, (p - 0.7) * 2.5))

        // Destaque via hover ou scroll
        const isFrontActive = highlightSkill === "frontend" || pFront > 0.4
        const isBackActive = highlightSkill === "backend" || pBack > 0.4
        const isDbActive = highlightSkill === "backend" || pDb > 0.4
        const isDevActive = highlightSkill === "qualidade" || pDevOps > 0.4

        // -------------------------------------------------------------
        // 1. CAMADA FRONTEND (y: 20 a 130)
        // -------------------------------------------------------------
        const frontAlpha = 0.75 + pFront * 0.25
        ctx.save()
        ctx.globalAlpha = isFrontActive ? 1 : frontAlpha

        const gradFront = ctx.createLinearGradient(20, 20, 540, 130)
        gradFront.addColorStop(0, isFrontActive ? "rgba(14, 165, 233, 0.35)" : "rgba(14, 165, 233, 0.15)")
        gradFront.addColorStop(1, "rgba(15, 23, 42, 0.9)")

        roundRect(ctx, 20, 20, 520, 110, 18)
        ctx.fillStyle = gradFront
        ctx.fill()

        if (isFrontActive) {
          ctx.shadowColor = "rgba(14, 165, 233, 0.6)"
          ctx.shadowBlur = 12
        }
        ctx.strokeStyle = isFrontActive ? "rgba(14, 165, 233, 0.95)" : "rgba(14, 165, 233, 0.5)"
        ctx.lineWidth = isFrontActive ? 2.2 : 1.5
        ctx.stroke()
        ctx.shadowBlur = 0

        // Ícone Frontend
        roundRect(ctx, 44, 45, 56, 56, 12)
        ctx.fillStyle = isFrontActive ? "rgba(14, 165, 233, 0.25)" : "rgba(14, 165, 233, 0.15)"
        ctx.fill()
        ctx.strokeStyle = "rgba(14, 165, 233, 0.8)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.fillStyle = "#38bdf8"
        ctx.beginPath()
        ctx.arc(60, 60, 3, 0, Math.PI * 2)
        ctx.arc(70, 60, 3, 0, Math.PI * 2)
        ctx.arc(80, 60, 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = "#38bdf8"
        ctx.beginPath()
        ctx.moveTo(52, 70)
        ctx.lineTo(92, 70)
        ctx.stroke()
        roundRect(ctx, 58, 76, 28, 16, 3)
        ctx.stroke()

        // Textos Frontend
        ctx.fillStyle = "#f8fafc"
        ctx.font = "bold 20px system-ui, sans-serif"
        ctx.fillText("Frontend Layer", 120, 58)

        ctx.fillStyle = "#cbd5e1"
        ctx.font = "500 14px system-ui, sans-serif"
        ctx.fillText("React · Next.js · TypeScript · Tailwind CSS", 120, 84)

        ctx.fillStyle = "#38bdf8"
        ctx.font = "600 13px system-ui, sans-serif"
        ctx.fillText("Client Components, Responsividade & SSR", 120, 108)

        // Badge
        roundRect(ctx, 424, 44, 96, 26, 13)
        ctx.fillStyle = "rgba(14, 165, 233, 0.25)"
        ctx.fill()
        ctx.strokeStyle = "rgba(14, 165, 233, 0.7)"
        ctx.stroke()
        ctx.fillStyle = "#38bdf8"
        ctx.font = "bold 12px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("UI / Web", 472, 61)
        ctx.textAlign = "left"
        ctx.restore()

        // -------------------------------------------------------------
        // CONECTOR 1: FRONTEND -> BACKEND (y: 130 a 190)
        // -------------------------------------------------------------
        ctx.save()
        const conn1Alpha = 0.6 + pConn1 * 0.4
        ctx.globalAlpha = conn1Alpha

        ctx.strokeStyle = "#0ea5e9"
        ctx.lineWidth = 2.5
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(280, 130)
        ctx.lineTo(280, 190)
        ctx.stroke()
        ctx.setLineDash([])

        // Partícula de dados pulsando continuamente
        const packetY = 130 + ((clock / 1500 + p * 2) % 1) * 60
        ctx.beginPath()
        ctx.arc(280, packetY, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#38bdf8"
        ctx.shadowColor = "#38bdf8"
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Badge conector
        roundRect(ctx, 200, 144, 160, 24, 12)
        ctx.fillStyle = "#0b1329"
        ctx.fill()
        ctx.strokeStyle = isFrontActive || isBackActive ? "#38bdf8" : "rgba(56, 189, 248, 0.6)"
        ctx.lineWidth = 1.2
        ctx.stroke()

        ctx.fillStyle = "#e2e8f0"
        ctx.font = "600 11.5px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("HTTPS / REST (JSON)", 280, 160)
        ctx.textAlign = "left"
        ctx.restore()

        // -------------------------------------------------------------
        // 2. CAMADA BACKEND (y: 190 a 300)
        // -------------------------------------------------------------
        const backAlpha = 0.75 + pBack * 0.25
        ctx.save()
        ctx.globalAlpha = isBackActive ? 1 : backAlpha

        const gradBack = ctx.createLinearGradient(20, 190, 540, 300)
        gradBack.addColorStop(0, isBackActive ? "rgba(34, 197, 94, 0.35)" : "rgba(34, 197, 94, 0.15)")
        gradBack.addColorStop(1, "rgba(15, 23, 42, 0.9)")

        roundRect(ctx, 20, 190, 520, 110, 18)
        ctx.fillStyle = gradBack
        ctx.fill()

        if (isBackActive) {
          ctx.shadowColor = "rgba(34, 197, 94, 0.6)"
          ctx.shadowBlur = 12
        }
        ctx.strokeStyle = isBackActive ? "rgba(34, 197, 94, 0.95)" : "rgba(34, 197, 94, 0.5)"
        ctx.lineWidth = isBackActive ? 2.2 : 1.5
        ctx.stroke()
        ctx.shadowBlur = 0

        // Ícone Backend
        roundRect(ctx, 44, 215, 56, 56, 12)
        ctx.fillStyle = isBackActive ? "rgba(34, 197, 94, 0.25)" : "rgba(34, 197, 94, 0.15)"
        ctx.fill()
        ctx.strokeStyle = "rgba(34, 197, 94, 0.8)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.strokeStyle = "#4ade80"
        roundRect(ctx, 54, 227, 36, 12, 3)
        ctx.stroke()
        roundRect(ctx, 54, 247, 36, 12, 3)
        ctx.stroke()
        ctx.fillStyle = "#4ade80"
        ctx.beginPath()
        ctx.arc(62, 233, 2.5, 0, Math.PI * 2)
        ctx.arc(62, 253, 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Textos Backend
        ctx.fillStyle = "#f8fafc"
        ctx.font = "bold 20px system-ui, sans-serif"
        ctx.fillText("Backend API Layer", 120, 228)

        ctx.fillStyle = "#cbd5e1"
        ctx.font = "500 14px system-ui, sans-serif"
        ctx.fillText("Java 21 · Spring Boot · NestJS · Node.js", 120, 254)

        ctx.fillStyle = "#4ade80"
        ctx.font = "600 13px system-ui, sans-serif"
        ctx.fillText("Autenticação JWT, Regras de Negócio & Multi-tenancy", 120, 278)

        // Badge
        roundRect(ctx, 414, 214, 106, 26, 13)
        ctx.fillStyle = "rgba(34, 197, 94, 0.25)"
        ctx.fill()
        ctx.strokeStyle = "rgba(34, 197, 94, 0.7)"
        ctx.stroke()
        ctx.fillStyle = "#4ade80"
        ctx.font = "bold 12px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("REST Services", 467, 231)
        ctx.textAlign = "left"
        ctx.restore()

        // -------------------------------------------------------------
        // CONECTOR 2: BACKEND -> DATABASE (y: 300 a 360)
        // -------------------------------------------------------------
        ctx.save()
        const conn2Alpha = 0.6 + pConn2 * 0.4
        ctx.globalAlpha = conn2Alpha

        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2.5
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(280, 300)
        ctx.lineTo(280, 360)
        ctx.stroke()
        ctx.setLineDash([])

        // Partícula de dados SQL
        const packetDbY = 300 + ((clock / 1400 + p * 2.2) % 1) * 60
        ctx.beginPath()
        ctx.arc(280, packetDbY, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#4ade80"
        ctx.shadowColor = "#4ade80"
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Badge conector
        roundRect(ctx, 185, 314, 190, 24, 12)
        ctx.fillStyle = "#0b1329"
        ctx.fill()
        ctx.strokeStyle = isBackActive || isDbActive ? "#4ade80" : "rgba(74, 222, 128, 0.6)"
        ctx.lineWidth = 1.2
        ctx.stroke()

        ctx.fillStyle = "#e2e8f0"
        ctx.font = "600 11.5px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("SQL / JDBC Connection Pool", 280, 330)
        ctx.textAlign = "left"
        ctx.restore()

        // -------------------------------------------------------------
        // 3. CAMADA BANCO DE DADOS (y: 360 a 470)
        // -------------------------------------------------------------
        const dbAlpha = 0.75 + pDb * 0.25
        ctx.save()
        ctx.globalAlpha = isDbActive ? 1 : dbAlpha

        const gradDb = ctx.createLinearGradient(20, 360, 540, 470)
        gradDb.addColorStop(0, isDbActive ? "rgba(56, 189, 248, 0.35)" : "rgba(56, 189, 248, 0.15)")
        gradDb.addColorStop(1, "rgba(15, 23, 42, 0.9)")

        roundRect(ctx, 20, 360, 520, 110, 18)
        ctx.fillStyle = gradDb
        ctx.fill()

        if (isDbActive) {
          ctx.shadowColor = "rgba(56, 189, 248, 0.6)"
          ctx.shadowBlur = 12
        }
        ctx.strokeStyle = isDbActive ? "rgba(56, 189, 248, 0.95)" : "rgba(56, 189, 248, 0.5)"
        ctx.lineWidth = isDbActive ? 2.2 : 1.5
        ctx.stroke()
        ctx.shadowBlur = 0

        // Ícone Database
        roundRect(ctx, 44, 385, 56, 56, 12)
        ctx.fillStyle = isDbActive ? "rgba(56, 189, 248, 0.25)" : "rgba(56, 189, 248, 0.15)"
        ctx.fill()
        ctx.strokeStyle = "rgba(56, 189, 248, 0.8)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.strokeStyle = "#38bdf8"
        ctx.beginPath()
        ctx.ellipse(72, 403, 16, 6, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(56, 403)
        ctx.lineTo(56, 423)
        ctx.quadraticCurveTo(72, 433, 88, 423)
        ctx.lineTo(88, 403)
        ctx.stroke()

        // Textos Database
        ctx.fillStyle = "#f8fafc"
        ctx.font = "bold 20px system-ui, sans-serif"
        ctx.fillText("Database & Persistence", 120, 398)

        ctx.fillStyle = "#cbd5e1"
        ctx.font = "500 14px system-ui, sans-serif"
        ctx.fillText("PostgreSQL · Flyway Migrations · Oracle DB", 120, 424)

        ctx.fillStyle = "#38bdf8"
        ctx.font = "600 13px system-ui, sans-serif"
        ctx.fillText("Modelagem Relacional, Migrations & Soft Delete", 120, 448)

        // Badge
        roundRect(ctx, 424, 384, 96, 26, 13)
        ctx.fillStyle = "rgba(56, 189, 248, 0.25)"
        ctx.fill()
        ctx.strokeStyle = "rgba(56, 189, 248, 0.7)"
        ctx.stroke()
        ctx.fillStyle = "#38bdf8"
        ctx.font = "bold 12px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Persistence", 472, 401)
        ctx.textAlign = "left"
        ctx.restore()

        // -------------------------------------------------------------
        // 4. CAMADA DEVOPS & QUALIDADE (y: 490 a 590)
        // -------------------------------------------------------------
        const devOpsAlpha = 0.75 + pDevOps * 0.25
        ctx.save()
        ctx.globalAlpha = isDevActive ? 1 : devOpsAlpha

        const gradDev = ctx.createLinearGradient(20, 490, 540, 590)
        gradDev.addColorStop(0, isDevActive ? "rgba(250, 204, 21, 0.3)" : "rgba(250, 204, 21, 0.12)")
        gradDev.addColorStop(1, "rgba(15, 23, 42, 0.9)")

        roundRect(ctx, 20, 490, 520, 100, 18)
        ctx.fillStyle = gradDev
        ctx.fill()

        if (isDevActive) {
          ctx.shadowColor = "rgba(250, 204, 21, 0.5)"
          ctx.shadowBlur = 12
        }
        ctx.strokeStyle = isDevActive ? "rgba(250, 204, 21, 0.95)" : "rgba(250, 204, 21, 0.5)"
        ctx.lineWidth = isDevActive ? 2.2 : 1.5
        ctx.stroke()
        ctx.shadowBlur = 0

        // Ícone DevOps
        roundRect(ctx, 44, 512, 56, 56, 12)
        ctx.fillStyle = isDevActive ? "rgba(250, 204, 21, 0.25)" : "rgba(250, 204, 21, 0.15)"
        ctx.fill()
        ctx.strokeStyle = "rgba(250, 204, 21, 0.8)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.strokeStyle = "#facc15"
        ctx.lineWidth = 2.5
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(58, 540)
        ctx.lineTo(68, 550)
        ctx.lineTo(86, 530)
        ctx.stroke()

        // Textos DevOps
        ctx.fillStyle = "#f8fafc"
        ctx.font = "bold 19px system-ui, sans-serif"
        ctx.fillText("Qualidade, Entrega & DevOps", 120, 528)

        ctx.fillStyle = "#cbd5e1"
        ctx.font = "500 13.5px system-ui, sans-serif"
        ctx.fillText("Docker Containerization · Conventional Commits · Git · Testes", 120, 552)

        ctx.fillStyle = "#facc15"
        ctx.font = "600 12.5px system-ui, sans-serif"
        ctx.fillText("Padronização de código, versionamento e testes automatizados", 120, 574)

        // Badge
        roundRect(ctx, 424, 512, 96, 26, 13)
        ctx.fillStyle = "rgba(250, 204, 21, 0.25)"
        ctx.fill()
        ctx.strokeStyle = "rgba(250, 204, 21, 0.7)"
        ctx.stroke()
        ctx.fillStyle = "#facc15"
        ctx.font = "bold 12px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("CI & Tooling", 472, 529)
        ctx.textAlign = "left"
        ctx.restore()
      }

      const draw = () => render(playhead.progress, activeRef.current)
      redrawRef.current = draw
      draw()

      // GSAP ScrollTrigger Scrubbing fluido cobrindo a seção
      const tween = gsap.to(playhead, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#o-que-faco",
          start: "top 70%",
          end: "bottom 80%", // completa 100% dos cards antes de sair da seção
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      // Loop de pulso das partículas: só roda enquanto o canvas está visível
      let animId = 0
      let visible = false
      const loop = () => {
        draw()
        animId = visible ? requestAnimationFrame(loop) : 0
      }
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (visible && !animId) animId = requestAnimationFrame(loop)
      })
      io.observe(canvas)

      const ro = new ResizeObserver(() => {
        resize()
        draw()
      })
      ro.observe(canvas)

      return () => {
        visible = false
        cancelAnimationFrame(animId)
        io.disconnect()
        ro.disconnect()
        redrawRef.current = null
        tween.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`w-full max-w-xl mx-auto ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto drop-shadow-2xl rounded-2xl block"
        style={{ aspectRatio: "560 / 650" }}
        role="img"
        aria-label="Diagrama interativo de arquitetura renderizado em canvas com scrubbing e fluxo contínuo"
      />
    </div>
  )
}
