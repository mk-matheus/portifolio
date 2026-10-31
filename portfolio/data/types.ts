export type ProjectStatus = "concluido" | "em-desenvolvimento";

export interface Project {
  slug: string;
  title: string;
  /** Uma linha: problema ou resultado. */
  summary: string;
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  image?: string;
  /** Só preencha com URLs reais e funcionando; se ausente, o botão é omitido. */
  repoUrl?: string;
  demoUrl?: string;
  /** Estrutura do case (/projetos/[slug]). Conteúdo textual vem do autor. */
  case?: {
    problem: string;
    solution: string;
    decisions: string[];
    role: string;
    result: string;
  };
}

export type Experience =
  | {
      type: "professional";
      role: string;
      company: string;
      period: string;
      description: string;
      stack?: string[];
      /** Detalhamento por etapa/empresa (ex.: residência com várias parceiras). */
      highlights?: { company: string; term: string; text: string }[];
    }
  | {
      type: "academic";
      kind: "education";
      title: string;
      institution: string;
      period: string;
    }
  | {
      type: "academic";
      kind: "certification";
      title: string;
      issuer: string;
      year: string;
      credentialUrl?: string;
    };

export interface SkillBlock {
  id: string;
  title: string;
  description: string;
  items: string[];
}
