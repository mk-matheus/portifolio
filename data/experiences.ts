import type { Experience } from "./types";

// TODO(autor): revisar datas, empresas e redação.
export const experiences: Experience[] = [
  {
    type: "professional",
    role: "Estagiário Desenvolvedor Fullstack",
    company: "Perpart (Pernambuco Participações e Investimentos S/A)",
    period: "01/2026 – atual",
    description:
      "Participação no desenvolvimento de um sistema completo de gestão de RH interno e na refatoração para micro frontends. Boas práticas de código, versionamento e testes.",
    stack: ["NestJS", "Next.js", "React", "TypeScript", "Git", "Docker"],
  },
  {
    type: "professional",
    role: "Estagiário de Suporte",
    company: "Perpart (Pernambuco Participações e Investimentos S/A)",
    period: "09/2025 – 12/2025",
    description:
      "Troubleshooting, documentação de processos, infraestrutura de rede, GPO e Active Directory (supervisionado).",
    stack: ["ITIL", "GPO", "Active Directory", "Troubleshooting", "Documentação", "Infraestrutura de Rede"],
  },
  {
    type: "professional",
    role: "Residente",
    company: "Porto Digital Residência Tecnológica",
    period: "1º semestre de 2025", // TODO(autor): confirmar período total da residência (2º ao 4º período)
    description:
      "Programa de imersão em empresas parceiras, com uma experiência diferente a cada período:",
    highlights: [
      {
        company: "Beg Inovações",
        term: "2º período",
        text: "Modelagem de regras de negócio e fluxo de dados com ferramentas no-code.",
      },
      {
        company: "Ferreira Costa",
        term: "3º período",
        text: "Procedures e packages em Oracle PL/SQL para automatizar rotinas de gestão de dados de funcionários.",
      },
      {
        company: "Bidweb",
        term: "4º período",
        text: "Segurança de APIs REST com Java e Spring Security (JWT, prevenção de SQL Injection e XSS).",
      },
    ],
    stack: ["No-code", "Oracle", "PL/SQL", "Java", "Spring Security", "JWT"],
  },
  {
    type: "academic",
    kind: "education",
    title: "Tecnólogo em Inteligência Artificial e Machine Learning",
    institution: "UNIASSELVI",
    period: "2026 – 2029 (em andamento)", 
  },
  {
    type: "academic",
    kind: "education",
    title: "Tecnólogo em Sistemas para Internet",
    institution: "UNICAP TECH – ICAM",
    period: "2024 – 2026 (concluído)", 
  },
  {
    type: "academic",
    kind: "education",
    title: "Curso Técnico em Informática",
    institution: "ETE Jurandir Bezerra Lins",
    period: "2020 – 2022 (concluído)",
  },
  {
    type: "academic",
    kind: "certification",
    title: "Trilha Node.js",
    issuer: "Rocketseat",
    year: "2025",
    // TODO(autor): credentialUrl
  },
  // TODO(autor): demais certificações relevantes para vaga fullstack.
];
