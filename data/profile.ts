export const profile = {
  name: "Matheus Kauã",
  title: "Desenvolvedor Fullstack Júnior",
  stackLine: "TypeScript · Node.js · NestJS · Java · Spring Boot · React · Next.js",
  tagline:
    "Construo sistemas web completos, do banco de dados à interface. Trabalho com Java/Spring Boot, NestJS, React e Next.js, e aprendo construindo projetos ligados a problemas reais.",
  photo: "/myphot.png",
  email: "mkmateus.dev@gmail.com",
  github: "https://github.com/mk-matheus",
  linkedin: "https://www.linkedin.com/in/mk-matheus/",
  whatsapp: "https://wa.me/5581989524750",
  resume: "/curriculo_matheus_kaua.pdf", 
  facts: [
    "Sistemas para Internet, UNICAP",
    "Recife, PE",
    "Buscando vaga júnior Fullstack",
  ],
  siteUrl: "https://curriculo-portifolio-ruddy.vercel.app", // TODO(autor): domínio próprio
} as const;

export const siteTitle = `${profile.name} | ${profile.title}`;
export const siteDescription =
  "Portfólio de Matheus Kauã, desenvolvedor fullstack júnior: projetos com Java/Spring Boot, NestJS, React e Next.js.";
