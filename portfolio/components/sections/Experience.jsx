"use client"

import { useState } from "react"
import { experiences } from "@/data/experiences"
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"

export default function Experience() {
  const [active, setActive] = useState("professional") // "professional" | "academic"

  const items = experiences.filter((e) => e.type === active)
  const education = items.filter((e) => e.kind === "education")
  const certifications = items.filter((e) => e.kind === "certification")

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      setActive((prev) => (prev === "professional" ? "academic" : "professional"))
    }
  }

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        {/* Cabeçalho alinhado ao padrão das outras seções */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 id="experiencia-titulo" className="text-3xl md:text-4xl font-bold text-white mb-3">
              Experiência
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Minha trajetória prática no mercado e formação técnica contínua.
            </p>
          </div>

          {/* Segmented Control Acessível */}
          <div
            role="tablist"
            aria-label="Tipo de experiência"
            className="inline-flex p-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm self-start md:self-auto relative z-20"
            onKeyDown={handleKeyDown}
          >
            <button
              id="tab-professional"
              role="tab"
              type="button"
              aria-selected={active === "professional"}
              aria-controls="panel-professional"
              tabIndex={0}
              onClick={() => setActive("professional")}
              className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative z-20 select-none ${
                active === "professional"
                  ? "bg-gradient-to-r from-sky-500 to-green-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/30"
              }`}
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              Profissional
            </button>
            <button
              id="tab-academic"
              role="tab"
              type="button"
              aria-selected={active === "academic"}
              aria-controls="panel-academic"
              tabIndex={0}
              onClick={() => setActive("academic")}
              className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative z-20 select-none ${
                active === "academic"
                  ? "bg-gradient-to-r from-sky-500 to-green-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/30"
              }`}
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              Acadêmica
            </button>
          </div>
        </div>

        {/* Painel com fade e renderização condicional */}
        <div
          data-reveal
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
          className="fade-in focus:outline-none"
        >
          {active === "professional" ? (
            <div className="space-y-6">
              {items.map((exp) => {
                const isCurrent = exp.period.toLowerCase().includes("atual")
                return (
                  <article
                    key={`${exp.company}-${exp.role}`}
                    className="group p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500/20 to-green-500/20 border border-sky-500/30 text-sky-400 group-hover:scale-110 transition-transform">
                          <Briefcase className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-base font-medium text-sky-400">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start md:self-auto">
                        <span className="flex items-center gap-1.5 text-xs md:text-sm text-slate-400">
                          <Calendar className="w-4 h-4 text-slate-500" aria-hidden="true" />
                          {exp.period}
                        </span>
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                            Atual
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={`text-slate-300 text-sm md:text-base leading-relaxed ${exp.highlights ? "mb-4" : "mb-6"}`}>
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <ul className="space-y-3 mb-6">
                        {exp.highlights.map((h) => (
                          <li key={h.company} className="flex items-start gap-3 text-sm md:text-base text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-400 shrink-0" aria-hidden="true" />
                            <span>
                              <strong className="text-white font-semibold">{h.company}</strong>
                              <span className="text-slate-500"> ({h.term})</span>: {h.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.stack && (
                      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-700/30">
                        <span className="text-xs text-slate-400 mr-2">Tecnologias:</span>
                        {exp.stack.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="space-y-10">
              {/* Formação Acadêmica */}
              {education.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="w-5 h-5 text-sky-400" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Formação Acadêmica
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {education.map((exp) => {
                      const isOngoing = exp.period.toLowerCase().includes("andamento")
                      return (
                        <article
                          key={exp.title}
                          className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h4 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                                {exp.title}
                              </h4>
                              {isOngoing ? (
                                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0">
                                  Cursando
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/30 shrink-0">
                                  Concluído
                                </span>
                              )}
                            </div>
                            <p className="text-sky-400 font-medium text-sm mb-4">
                              {exp.institution}
                            </p>
                          </div>

                          <div className="flex items-center text-xs md:text-sm text-slate-400 pt-3 border-t border-slate-700/30">
                            <Calendar className="w-4 h-4 mr-2 text-slate-500" aria-hidden="true" />
                            {exp.period}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Cursos e Certificações */}
              {certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Cursos e Certificações
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((exp) => (
                      <article
                        key={exp.title}
                        className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                            <span>{exp.issuer}</span>
                            <span>{exp.year}</span>
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors mb-3">
                            {exp.title}
                          </h4>
                        </div>

                        {exp.credentialUrl ? (
                          <a
                            href={exp.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-sky-400 hover:text-sky-300 font-medium pt-3 border-t border-slate-700/30"
                          >
                            Ver credencial
                            <ExternalLink className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                          </a>
                        ) : (
                          <div className="flex items-center text-xs text-green-400 font-medium pt-3 border-t border-slate-700/30">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                            Concluído
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
