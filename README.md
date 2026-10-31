<div align="center">

# 💻 Matheus Kauã — Portfólio Fullstack

**Portfólio pessoal interativo desenvolvido para apresentar projetos reais, decisões arquiteturais e trajetória como Desenvolvedor Fullstack.**

[![Portfólio Online](https://img.shields.io/badge/🌐_Acessar_Portfólio-0EA5E9?style=for-the-badge)](https://curriculo-portifolio-ruddy.vercel.app)
[![Licença MIT](https://img.shields.io/badge/Licença-MIT-22C55E?style=for-the-badge)](./LICENSE)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

<!-- Dica: você pode adicionar um print ou GIF da página inicial abaixo -->
<!-- ![Prévia do Portfólio](https://curriculo-portifolio-ruddy.vercel.app/opengraph-image) -->

## 📌 Sobre o Projeto

Este repositório contém o código-fonte do meu portfólio profissional. Mais do que uma vitrine estática de links, o projeto foi construído com foco em **engenharia de front-end, performance, acessibilidade e SEO técnico**, refletindo na prática a forma como estruturo aplicações web modernas de ponta a ponta.

A aplicação reúne minha trajetória acadêmica e profissional, competências técnicas em **Backend, Frontend e DevOps**, além de páginas dedicadas de **estudo de caso (*Case Studies*)** para detalhar o problema, a solução e as decisões técnicas por trás de cada projeto.

🔗 **Demonstração ao vivo:** [curriculo-portifolio-ruddy.vercel.app](https://curriculo-portifolio-ruddy.vercel.app)

---

## ✨ Destaques Técnicos e Funcionalidades

- **🎨 Diagrama Arquitetural Interativo em HTML5 Canvas:** Componente customizado (`ArchitectureCanvas`) que renderiza em alta definição (`devicePixelRatio` / HiDPI) o fluxo entre *Frontend, API REST, Banco de Dados e DevOps*, sincronizando partículas de dados em tempo real com o *scroll* da página (`ScrollTrigger` *scrub*) e com o foco/*hover* nos cards de competências.
- **⚡ Animações Performáticas com GSAP:** Entrada tipográfica escalonada no *Hero*, barra de progresso de leitura, *reveal* em cascata e efeito *tilt 3D* nos cards — animando exclusivamente `transform` e `opacity` e pausando loops fora da *viewport* com `IntersectionObserver`.
- **♿ Acessibilidade (`a11y`) e Respeito ao Usuário:** Suporte completo a `prefers-reduced-motion` via `gsap.matchMedia()`, fallback `<noscript>` para exibição imediata sem JavaScript, navegação por teclado e marcação semântica com atributos ARIA.
- **📖 Páginas Estáticas de Case Studies (`/projetos/[slug]`):** Rotas geradas estaticamente no *build* (`generateStaticParams`) com metadados individuais para documentar contexto, arquitetura, stack e aprendizados de cada sistema.
- **🗂️ Arquitetura Orientada a Dados (*Data-Driven*):** Todo o conteúdo do portfólio (perfil, projetos, skills e experiências) é centralizado e tipado em TypeScript na pasta `data/`, desacoplando dados da camada de interface.
- **🔍 SEO Técnico Completo:** Geração dinâmica de imagem Open Graph via código (`next/og`), `sitemap.xml` e `robots.txt` nativos, URLs canônicas e redirecionamentos permanentes (`308`) preservando rotas antigas.

---

## 🛠️ Tecnologias Utilizadas

| Camada / Categoria | Tecnologias |
| :--- | :--- |
| **Framework & UI** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Linguagens** | [TypeScript 5](https://www.typescriptlang.org/), JavaScript (JSX) |
| **Estilização** | [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS |
| **Animações & Gráficos** | [GSAP 3.15](https://gsap.com/) (`@gsap/react`, `ScrollTrigger`), HTML5 Canvas 2D API |
| **Ícones & Tipografia** | [Lucide React](https://lucide.dev/), `next/font` (Inter) |
| **SEO & Metadados** | Next Metadata API, `next/og` (`ImageResponse`) |

---

## 📂 Estrutura do Repositório

```text
portifolio/
├── portfolio/                        # Aplicação principal Next.js
│   ├── app/
│   │   ├── projetos/[slug]/page.jsx  # Página dinâmica (SSG) de Case Study de cada projeto
│   │   ├── layout.jsx                # Layout raiz e configuração global de SEO/OpenGraph
│   │   ├── opengraph-image.tsx       # Geração dinâmica do card de compartilhamento social
│   │   ├── page.jsx                  # Landing page principal
│   │   ├── robots.ts                 # Regras de indexação para buscadores
│   │   └── sitemap.ts                # Sitemap XML gerado dinamicamente
│   ├── components/
│   │   ├── animations/               # ArchitectureCanvas, HeroAnimation, ScrollEffects, HeroPhoto
│   │   ├── sections/                 # Seções da página (WhatIDo, Projects, Experience, Contact)
│   │   ├── ui/                       # Componentes reutilizáveis (ProjectCard)
│   │   ├── Navigation.jsx            # Barra de navegação responsiva
│   │   └── Footer.jsx                # Rodapé
│   ├── data/                         # Fonte única de dados tipados (TypeScript)
│   │   ├── experiences.ts            # Experiências profissionais, acadêmicas e certificações
│   │   ├── profile.ts                # Dados pessoais, links de contato e SEO base
│   │   ├── projects.ts               # Portfólio de projetos e estudos de caso
│   │   ├── skills.ts                 # Blocos de competências técnicas
│   │   └── types.ts                  # Contratos e interfaces TypeScript
│   └── public/                       # Imagens, prévias de projetos e currículo em PDF
├── LICENSE                           # Licença MIT
└── README.md                         # Documentação do repositório
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- **Node.js** `18.18+` (recomendado `20 LTS` ou superior)
- **npm** (ou gerenciador equivalente)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Matheus-Kaua-Goncalves-de-Souza/prog-front-end-.git
   cd prog-front-end-/portfolio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse **[http://localhost:3000](http://localhost:3000)** no seu navegador.

### Scripts disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com *Hot Reload* |
| `npm run build` | Gera a versão otimizada de produção e pré-renderiza as rotas estáticas |
| `npm run start` | Inicia o servidor Node.js servindo a *build* de produção |
| `npm run lint` | Executa a verificação estática de código com Next Lint |

---

## ✏️ Personalização de Conteúdo

A manutenção do portfólio não exige alterar componentes React. Para atualizar informações, basta editar os arquivos tipados em `./portfolio/data/`:

- **`profile.ts`**: Nome, cargo, bio, redes sociais, e-mail e arquivo do currículo (`/public`).
- **`projects.ts`**: Lista de projetos em destaque, stacks, links de repositório/demo e textos dos *cases*.
- **`experiences.ts`**: Histórico profissional, residência tecnológica, formação acadêmica e certificações.
- **`skills.ts`**: Categorias e tecnologias exibidas na seção *"O que faço"*.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

---

## 📬 Contato

**Matheus Kauã** — *Desenvolvedor Fullstack Júnior* (Recife, PE)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mk-matheus/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mk-matheus)
[![E-mail](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mkmateus.dev@gmail.com)
[![Portfólio](https://img.shields.io/badge/Portfólio-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white)](https://curriculo-portifolio-ruddy.vercel.app)
