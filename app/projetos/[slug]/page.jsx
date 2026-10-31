import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | ${profile.name}`,
    description: project.summary,
  }
}

const statusLabel = { concluido: "Concluído", "em-desenvolvimento": "Em desenvolvimento" }

function Block({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
      {children}
    </section>
  )
}

export default async function ProjectCase({ params }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const { title, summary, stack, status, image, repoUrl, demoUrl, case: c } = project

  return (
    <article className="px-6 pt-32 pb-20">
      <div className="container mx-auto max-w-3xl">
        <Link
          href="/#projetos"
          className="inline-flex items-center text-sm text-sky-400 hover:text-sky-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Voltar aos projetos
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
        <p className="text-lg text-slate-400 mb-2">{summary}</p>
        <p className="text-sm text-slate-500 mb-6">{statusLabel[status]}</p>

        {image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-slate-700/50">
            <Image
              src={image}
              alt={`Prévia do projeto ${title}`}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {!c && (
          // TODO(autor): preencher o case deste projeto em data/projects.ts (campo `case`).
          <p className="mb-10 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Conteúdo do case em preparação.
          </p>
        )}

        <Block title="Problema">
          <p className="text-slate-300 leading-relaxed">{c?.problem ?? summary}</p>
        </Block>

        {c && (
          <>
            <Block title="Solução">
              <p className="text-slate-300 leading-relaxed">{c.solution}</p>
            </Block>
            <Block title="Decisões técnicas">
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {c.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Block>
            <Block title="Meu papel">
              <p className="text-slate-300 leading-relaxed">{c.role}</p>
            </Block>
          </>
        )}

        <Block title="Stack">
          <ul className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Block>

        {c && (
          <Block title="Resultado e aprendizados">
            <p className="text-slate-300 leading-relaxed">{c.result}</p>
          </Block>
        )}

        {(repoUrl || demoUrl) && (
          <Block title="Links">
            <div className="flex flex-wrap gap-4">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-700/50 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                  Repositório
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 text-white font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Ver demo
                </a>
              )}
            </div>
          </Block>
        )}
      </div>
    </article>
  )
}
