import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], display: "swap" })
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { profile, siteTitle, siteDescription } from "@/data/profile"

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Matheus Kauã",
    "Desenvolvedor Fullstack",
    "Desenvolvedor Full Stack Júnior",
    "Java",
    "Spring Boot",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Portfólio Fullstack",
    "Recife",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: profile.siteUrl,
    siteName: siteTitle,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body suppressHydrationWarning className="bg-slate-900 text-slate-100 min-h-screen overflow-x-hidden antialiased">
        <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-slate-900 to-green-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
