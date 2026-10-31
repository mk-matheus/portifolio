"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

/**
 * Wrapper da foto do hero: entrada com fade + leve zoom + subida, sincronizada
 * com o texto (começa junto das primeiras letras). O estado inicial oculto vem
 * do CSS (.hero-pre) para evitar o "flash" antes da hidratação; com
 * prefers-reduced-motion a classe não esconde nada.
 */
export default function HeroPhoto({ children }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const frame = root.current.querySelector(".hero-photo-frame")
        const badge = root.current.querySelector(".hero-photo-badge")
        gsap.set(frame, { autoAlpha: 0, y: 32, scale: 0.92 })
        gsap.set(badge, { autoAlpha: 0, scale: 0.4, rotate: -20 })
        gsap.set(root.current, { autoAlpha: 1 })

        gsap
          .timeline({ delay: 0.25 })
          .to(frame, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" })
          .to(badge, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" }, "-=0.35")
      })
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "none" })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="hero-pre relative w-80 h-80 md:w-96 md:h-96">
      {children}
    </div>
  )
}
