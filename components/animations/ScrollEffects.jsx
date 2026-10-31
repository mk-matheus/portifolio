"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Efeitos globais de scroll da landing (GSAP core + ScrollTrigger):
 *  - barra de progresso de leitura no topo (scrub);
 *  - reveal escalonado dos elementos [data-reveal] ao entrarem na viewport;
 *  - parallax suave + flutuação na foto do hero;
 *  - inclinação 3D sutil (tilt) nos cards de projeto [data-tilt] (só mouse/trackpad).
 * Tudo roda dentro de gsap.matchMedia: com prefers-reduced-motion nada é aplicado
 * e o conteúdo permanece visível. Anima apenas transform/opacity.
 */
export default function ScrollEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1) Progresso de leitura
      gsap.set(".scroll-progress", { scaleX: 0 })
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      })

      // 2) Reveal escalonado (itens próximos entram em cascata)
      const items = gsap.utils.toArray("[data-reveal]")
      gsap.set(items, { autoAlpha: 0, y: 36 })
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform",
          }),
      })

      // 3) Hero: parallax ao rolar + flutuação do selo
      gsap.to(".hero-photo-parallax", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: "#sobre", start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".hero-photo-badge", {
        y: -9,
        rotate: 6,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      })

      // 4) Tilt 3D nos cards (apenas ponteiro fino com hover)
      const cleanups = []
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray("[data-tilt]").forEach((el) => {
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3.out" })
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" })
          gsap.set(el, { transformPerspective: 900 })

          const onMove = (e) => {
            const r = el.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width - 0.5
            const py = (e.clientY - r.top) / r.height - 0.5
            ry(px * 8)
            rx(-py * 8)
          }
          const onLeave = () => {
            rx(0)
            ry(0)
          }
          el.addEventListener("pointermove", onMove)
          el.addEventListener("pointerleave", onLeave)
          cleanups.push(() => {
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerleave", onLeave)
          })
        })
      }

      return () => cleanups.forEach((fn) => fn())
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-sky-400 via-green-400 to-yellow-400 pointer-events-none"
      style={{ transform: "scaleX(0)" }}
    />
  )
}
