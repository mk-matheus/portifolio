"use client"

import { useState } from "react"
import { profile } from "@/data/profile"
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Download,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState("")

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const input = document.createElement("textarea")
      input.value = profile.email
      input.style.position = "fixed"
      input.style.opacity = "0"
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  const writeEmail = () => {
    copyEmail()
    setMessage("Abrindo seu e-mail… endereço copiado caso precise.")
    setTimeout(() => setMessage(""), 4000)
  }

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="px-6 py-24 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 to-green-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Disponível para oportunidades
          </div>
          <h2 id="contato-titulo" className="text-3xl md:text-5xl font-bold text-white mb-4">
            Vamos conversar?
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Estou em busca de oportunidade como <strong className="text-white font-medium">Desenvolvedor Fullstack</strong>. Entre em contato direto pelos canais abaixo:
          </p>
        </div>

        {/* Grade de Contatos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Card 1: E-mail com Cópia Rápida */}
          <div data-reveal className="relative p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">E-mail</h3>
              <p role="status" aria-live="polite" className={`text-xs mb-4 break-all ${message || copied ? "text-green-400" : "text-slate-400"}`}>
                {message || (copied ? "E-mail copiado!" : profile.email)}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-sky-400 pt-3 border-t border-slate-700/30">
              <a
                href={`mailto:${profile.email}`}
                onClick={writeEmail}
                className="flex-1 cursor-pointer after:absolute after:inset-0 after:rounded-2xl after:content-['']"
              >
                Escrever
              </a>
              <button
                type="button"
                onClick={copyEmail}
                title="Copiar e-mail"
                aria-label="Copiar endereço de e-mail"
                className="relative z-10 cursor-pointer mr-2 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-all"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </div>
          </div>

          {/* Card 2: GitHub */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-700/30 border border-slate-600/40 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">GitHub</h3>
              <p className="text-xs text-slate-400 mb-4">Repositórios, contribuições e projetos abertos</p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pt-3 border-t border-slate-700/30 group-hover:text-white">
              <span>Acessar perfil</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Card 3: WhatsApp */}
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-xs text-slate-400 mb-4">Contato rápido para dúvidas e mensagens diretas</p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-green-400 pt-3 border-t border-slate-700/30">
              <span>Enviar mensagem</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Card 4: LinkedIn (ou Currículo quando LinkedIn indefinido) */}
          {profile.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">LinkedIn</h3>
                <p className="text-xs text-slate-400 mb-4">Conexões profissionais e histórico profissional</p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-blue-400 pt-3 border-t border-slate-700/30">
                <span>Conectar</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ) : (
            <a
              href={profile.resume}
              download
              data-reveal className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-slate-800/40 to-green-500/10 border border-sky-500/30 hover:border-green-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-green-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Currículo</h3>
                <p className="text-xs text-slate-400 mb-4">Baixar versão em PDF atualizada para processos seletivos</p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-white pt-3 border-t border-slate-700/30">
                <span>Download PDF</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
