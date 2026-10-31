import type { Project } from "./types";

// Ordem: destaques primeiro. URLs omitidas = TODO(autor); nunca inventar links.
export const projects: Project[] = [
  {
    slug: "oliveiras-multimarcas",
    title: "Oliveiras Multimarcas",
    summary:
      "Sistema de gestão para concessionária de veículos usados, projeto de conclusão de disciplina (PI5, UNICAP) para cliente real.",
    stack: ["Next.js", "React", "Java 21", "Spring Boot", "PostgreSQL", "Amazon S3", "LangGraph", "GPT-4.1-mini"],
    status: "concluido", // TODO(autor): confirmar status
    featured: true,
    // TODO(autor): repoUrl, demoUrl, imagem e texto do case
  },
  {
    slug: "inventory-api",
    title: "Inventory API",
    summary:
      "API de gestão de estoque para a loja de produtos descartáveis de um familiar, com multi-tenancy schema-per-tenant.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "Java Records"],
    status: "em-desenvolvimento",
    featured: true,
    // TODO(autor): repoUrl e texto do case
  },
  {
    slug: "shopbank",
    title: "ShopBank",
    summary: "E-commerce com API em Spring Boot, front-end em React/Vite e app mobile (Expo).",
    stack: ["Spring Boot", "React", "Vite", "Expo"],
    status: "concluido", // TODO(autor): confirmar status
    featured: true,
    // TODO(autor): repoUrl, demoUrl, imagem e texto do case
  },
  {
    slug: "resumeforge",
    title: "ResumeForge",
    summary: "Aplicação full-stack para criação de currículos.", // TODO(autor): revisar descrição
    stack: ["Node.js", "JWT", "PostgreSQL", "Sequelize", "Next.js 14", "Tailwind", "React Hook Form", "Zod"],
    status: "concluido", // TODO(autor): confirmar status
    featured: false,
    // TODO(autor): repoUrl, demoUrl
  },
  {
    slug: "dashboard-produtos",
    title: "Dashboard de Produtos",
    summary: "CRUD de produtos consumindo API REST (Back4App) e uma API pública, com layout responsivo.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "concluido",
    featured: false,
    image: "/dashbord.png",
    repoUrl: "https://github.com/Ewayrton/projetoFinal-programacaoWeb-2024.2.git",
    demoUrl: "https://projeto-final-programacao-web-2024-2-six.vercel.app/",
  },
  // TODO(autor): Recifeirinha só entra com demo e repositório reais; GymTracker se estiver apresentável.
];
