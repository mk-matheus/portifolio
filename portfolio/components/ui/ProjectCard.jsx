import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"

const statusLabel = {
  concluido: "Concluído",
  "em-desenvolvimento": "Em desenvolvimento",
}

export default function ProjectCard({ project, compact = false }) {
  const { slug, title, summary, stack, status, image, repoUrl, demoUrl } = project
  const titleId = `projeto-${slug}`

  return (
    <article
      aria-labelledby={titleId}
      className="group flex flex-col overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/40 transition-colors"
    >
      {!compact && (
        <div className="relative h-44 w-full bg-gradient-to-br from-sky-900/40 to-green-900/30">
          {image ? (
            <Image
              src={image}
              alt={`Prévia do projeto ${title}`}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20"
            >
              {title.charAt(0)}
            </span>
          )}
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full border ${
              status === "concluido"
                ? "bg-green-500/20 text-green-300 border-green-500/30"
                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
            }`}
          >
            {statusLabel[status]}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 id={titleId} className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{summary}</p>

        <ul className="flex flex-wrap gap-2 mb-6" aria-label="Tecnologias">
          {stack.map((tech) => (
            <li
              key={tech}
              className="px-2.5 py-1 text-xs rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Link
            href={`/projetos/${slug}`}
            className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-green-500 hover:scale-105 transition-transform"
          >
            Ver case
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white"
            >
              <Github className="w-4 h-4 mr-1" aria-hidden="true" />
              Código
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white"
            >
              <ExternalLink className="w-4 h-4 mr-1" aria-hidden="true" />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
