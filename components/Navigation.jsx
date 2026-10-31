"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Code2, Download } from "lucide-react"
import { profile } from "@/data/profile"

const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "o-que-faco", label: "O que faço" },
  { id: "projetos", label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
  { id: "contato", label: "Contato" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("sobre")
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const armedRef = useRef(false)

  // Scroll-spy: marca o item da seção que cruza o meio superior da viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    // Evita sobrescrever um hash de entrada (/#projetos) antes do navegador rolar até ele.
    const timer = setTimeout(() => (armedRef.current = true), 1000)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Padrão único: a URL sempre reflete a seção em vista (rolagem ou clique), sem empilhar histórico.
  useEffect(() => {
    if (!armedRef.current) return
    const url = active === "sobre" ? window.location.pathname : `/#${active}`
    const current = window.location.pathname + window.location.hash
    if (current !== url && !(active === "sobre" && current === window.location.pathname)) {
      window.history.replaceState(null, "", url)
    }
  }, [active])

  // Clique: apenas rola suavemente; o scroll-spy atualiza marcação e URL.
  const goTo = (e, id) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    armedRef.current = true
    setIsOpen(false)
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Fecha com Esc devolvendo o foco ao botão; foca o primeiro link ao abrir.
  useEffect(() => {
    if (!isOpen) return
    menuRef.current?.querySelector("a")?.focus()
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen])

  const linkClass = (id) => (active === id ? "text-white" : "text-slate-400 hover:text-white")
  const underline = (id) =>
    `relative after:absolute after:left-4 after:right-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-green-400 after:origin-left after:transition-transform after:duration-300 ${
      active === id ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-50"
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/#sobre" className="flex items-center space-x-2 group" onClick={(e) => goTo(e, "sobre")}>
            <span className="p-2 bg-gradient-to-r from-sky-500 to-green-500 rounded-lg group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-white" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-green-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`px-4 py-2 transition-colors duration-300 ${linkClass(item.id)} ${underline(item.id)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                download
                className="ml-2 inline-flex items-center px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-green-500 hover:scale-105 transition-transform"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Currículo
              </a>
            </li>
          </ul>

          {/* Mobile */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <ul id="mobile-menu" ref={menuRef} className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`block px-4 py-3 rounded-lg transition-colors hover:bg-slate-800/30 ${linkClass(item.id)} ${active === item.id ? "underline underline-offset-8 decoration-sky-400" : ""}`}
                  onClick={(e) => goTo(e, item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                download
                className="flex items-center px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-green-500"
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Currículo
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
