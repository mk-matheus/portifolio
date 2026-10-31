import { profile } from "@/data/profile"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 px-6 py-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Feito com Next.js e Tailwind CSS</p>
      </div>
    </footer>
  )
}
