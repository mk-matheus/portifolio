"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import ArchitectureCanvas from "@/components/animations/ArchitectureCanvas"
import { skills } from "@/data/skills"
import { Server, Layout, ShieldCheck, CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const iconsMap = {
  backend: Server,
  frontend: Layout,
  qualidade: ShieldCheck,
}

const colorMap = {
  backend: {
    activeGlow: "shadow-green-500/10",
    icon: "text-green-400 bg-green-500/10 border-green-500/20",
    tag: "bg-green-500/10 text-green-300 border-green-500/20",
  },
  frontend: {
    activeGlow: "shadow-sky-500/10",
    icon: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    tag: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  },
  qualidade: {
    activeGlow: "shadow-yellow-500/10",
    icon: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    tag: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  },
}

export default function WhatIDo() {
  const sectionRef = useRef(null)
  const [activeSkill, setActiveSkill] = useState(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".skill-card-smooth")

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.7, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.5,
              },
            }
          )
        })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".skill-card-smooth", { opacity: 1, y: 0 })
      })

      ScrollTrigger.refresh()

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="o-que-faco"
      aria-labelledby="o-que-faco-titulo"
      className="relative px-6 py-20 lg:py-28"
    >
      <div className="container mx-auto max-w-6xl w-full">
        {/* Cabeçalho da Seção */}
        <div data-reveal className="mb-14">
          <h2 id="o-que-faco-titulo" className="text-3xl md:text-4xl font-bold text-white mb-3">
            O que faço
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl">
            Soluções completas de ponta a ponta: do banco de dados relacional e APIs REST robustas até interfaces reativas e organizadas.
          </p>
        </div>

        {/* Layout em Grid de 2 Colunas Iguais */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo: Blocos de Competências (6 colunas) */}
          <div className="lg:col-span-6 space-y-6">
            {skills.map((skill) => {
              const IconComponent = iconsMap[skill.id] || Server
              const colors = colorMap[skill.id] || colorMap.backend
              const isHovered = activeSkill === skill.id

              return (
                <article
                  key={skill.id}
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  onFocus={() => setActiveSkill(skill.id)}
                  onBlur={() => setActiveSkill(null)}
                  tabIndex={0}
                  className={`skill-card-smooth p-6 md:p-7 rounded-2xl bg-slate-800/40 border transition-all duration-300 group cursor-pointer focus:outline-none ${
                    isHovered
                      ? `border-sky-500/60 shadow-xl ${colors.activeGlow} scale-[1.01]`
                      : "border-slate-700/50 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${colors.icon}`}
                    >
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-1">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags com as tecnologias que ele realmente usa */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/30">
                    {skill.items.map((tech) => (
                      <span
                        key={tech}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border font-medium ${colors.tag}`}
                      >
                        <CheckCircle2 className="w-3 h-3 opacity-70" aria-hidden="true" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>

          {/* Lado Direito: Diagrama em Canvas com Scrubbing Fluido (6 colunas) */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="w-full p-4 md:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Visão Arquitetural Dinâmica
                </span>
                <span className="flex items-center gap-1.5 text-xs text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
                  Conectado aos cards & scroll
                </span>
              </div>
              <ArchitectureCanvas activeSkill={activeSkill} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
