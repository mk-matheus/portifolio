/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rotas antigas (multipágina) apontam para a âncora equivalente da landing page.
  async redirects() {
    return [
      { source: "/sobre", destination: "/#sobre", permanent: true },
      { source: "/projetos", destination: "/#projetos", permanent: true },
      { source: "/experiencia-academica", destination: "/#experiencia", permanent: true },
      { source: "/experiencia-profissional", destination: "/#experiencia", permanent: true },
      // /jogo: experimento marcado para remoção (arquivos só serão apagados na Fase 7).
      { source: "/jogo", destination: "/#projetos", permanent: false },
    ]
  },
}

export default nextConfig
