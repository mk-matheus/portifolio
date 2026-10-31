import { profile } from "@/data/profile";
import WhatIDo from "@/components/sections/WhatIDo";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Image from "next/image";
import HeroAnimation from "@/components/animations/HeroAnimation";
import HeroPhoto from "@/components/animations/HeroPhoto";
import ScrollEffects from "@/components/animations/ScrollEffects";
import { Code } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollEffects />
      {/* 1. Quem sou (Hero) */}
      <section
        id="sobre"
        aria-labelledby="sobre-titulo"
        className="relative px-6 pt-32 pb-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HeroAnimation />

            <div className="hero-photo-parallax flex justify-center lg:justify-end">
              <HeroPhoto>
                <div className="hero-photo-frame absolute inset-0 bg-gradient-to-r from-sky-500 via-green-500 to-yellow-400 rounded-3xl p-1">
                  <div className="relative w-full h-full bg-slate-900 rounded-3xl overflow-hidden">
                    <Image
                      src={profile.photo}
                      alt={`${profile.name} - ${profile.title}`}
                      fill
                      priority
                      sizes="(min-width: 768px) 384px, 320px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="hero-photo-badge absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-sky-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Code className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
              </HeroPhoto>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O que faço */}
      <WhatIDo />

      {/* 3. Projetos */}
      <Projects />

      {/* 4. Experiência */}
      <Experience />

      {/* 5. Contato */}
      <Contact />
    </div>
  );
}
