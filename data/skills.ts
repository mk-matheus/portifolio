import type { SkillBlock } from "./types";

// TODO(autor): revisar; manter só tecnologias que realmente usa.
export const skills: SkillBlock[] = [
  {
    id: "backend",
    title: "Backend",
    description:
      "APIs REST com Java/Spring Boot e NestJS, autenticação JWT, PostgreSQL e arquitetura em camadas.",
    items: ["Java", "Spring Boot", "NestJS", "JWT", "PostgreSQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Interfaces com React, Next.js e TypeScript, componentização, responsividade e Tailwind.",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "qualidade",
    title: "Qualidade e entrega",
    description: "Versionamento com Git e Conventional Commits, testes e Docker.",
    items: ["Git", "Conventional Commits", "Testes", "Docker"],
  },
];
