import ProjectCard from "@/components/ui/ProjectCard"
import { projects } from "@/data/projects"

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <h2 id="projetos-titulo" data-reveal className="text-3xl md:text-4xl font-bold text-white mb-3">
          Projetos
        </h2>
        <p data-reveal className="text-slate-400 mb-10">
          O que já construí. Cada projeto tem um case com problema, solução e decisões técnicas.
        </p>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <li key={project.slug} data-reveal className="flex">
              <div data-tilt className="flex w-full">
                <ProjectCard project={project} />
              </div>
            </li>
          ))}
        </ul>

        {others.length > 0 && (
          <div className="mt-14">
            <h3 data-reveal className="text-xl font-semibold text-white mb-6">Outros projetos</h3>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project) => (
                <li key={project.slug} data-reveal className="flex">
                  <div data-tilt className="flex w-full">
                    <ProjectCard project={project} compact />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
