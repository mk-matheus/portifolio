"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react"
import { profile } from "@/data/profile"

gsap.registerPlugin(useGSAP)

/**
 * Coluna de texto do hero com animação de entrada (≈1,8 s no total):
 * nome letra por letra, depois cargo, descrição e CTAs com leve sobreposição.
 * Anima só transform/opacity. O estado inicial "invisível" é aplicado via JS
 * (gsap.set), então sem JS ou com prefers-reduced-motion tudo fica visível.
 */
export default function HeroAnimation() {
  const root = useRef(null)
  const words = profile.name.split(" ")

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const letters = gsap.utils.toArray(".hero-letter")
        const rest = gsap.utils.toArray(".hero-badge, .hero-greeting, .hero-text, .hero-cta")

        gsap.set(letters, { autoAlpha: 0, y: 28 })
        gsap.set(rest, { autoAlpha: 0, y: 16 })

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.to(".hero-badge, .hero-greeting", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 })
          .to(letters, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.1) // ≈1,3 s
          .to(".hero-text", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35")
          .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.3")
      })

      // Movimento reduzido: apenas um fade curto, sem deslocamento.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".hero-badge, .hero-greeting, .hero-letter, .hero-text, .hero-cta",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: "none", stagger: 0.01 },
        )
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="text-center lg:text-left">
      <noscript>
        <style>{`.hero-pre{opacity:1!important;visibility:visible!important}`}</style>
      </noscript>
      <div className="hero-badge hero-pre inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-500/20 to-green-500/20 rounded-full border border-sky-500/30 mb-6">
        <Sparkles className="w-4 h-4 mr-2 text-yellow-400" aria-hidden="true" />
        <span className="text-sm text-slate-300">{profile.title}</span>
      </div>

      <h1 id="sobre-titulo" aria-label={`Olá, eu sou ${profile.name}`} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        <span
          aria-hidden="true"
          className="hero-greeting hero-pre block bg-gradient-to-r from-sky-400 via-green-400 to-yellow-400 bg-clip-text text-transparent"
        >
          Olá, eu sou
        </span>
        <span aria-hidden="true" className="block text-white">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...word].map((char, ci) => (
                <span key={ci} className="hero-letter hero-pre inline-block will-change-transform">
                  {char}
                </span>
              ))}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-text hero-pre text-lg md:text-xl text-slate-400 mb-4 leading-relaxed">{profile.tagline}</p>
      <p className="hero-text hero-pre text-sm text-sky-300 mb-6">{profile.stackLine}</p>

      <ul className="hero-text hero-pre flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-sm text-slate-400 mb-8">
        {profile.facts.map((fact) => (
          <li key={fact} className="before:content-['•'] before:mr-2 before:text-green-400">
            {fact}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link
          href="/#projetos"
          className="hero-cta hero-pre px-8 py-4 bg-gradient-to-r from-sky-500 to-green-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center"
        >
          Ver projetos
          <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
        </Link>
        <a
          href={profile.resume}
          download
          className="hero-cta hero-pre px-8 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700/50 transition-colors flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" aria-hidden="true" />
          Baixar currículo
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hero-cta hero-pre px-4 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl hover:bg-slate-700/50 transition-colors flex items-center justify-center"
        >
          <Github className="w-5 h-5" aria-hidden="true" />
        </a>
        {/* LinkedIn só aparece quando houver URL pública real (TODO(autor)) */}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hero-cta hero-pre px-4 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl hover:bg-slate-700/50 transition-colors flex items-center justify-center"
          >
            <Linkedin className="w-5 h-5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}
