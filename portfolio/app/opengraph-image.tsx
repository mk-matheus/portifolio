import { ImageResponse } from "next/og"
import { profile } from "@/data/profile"

export const alt = `${profile.name} | ${profile.title}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
// @vercel/og quebra no prerender em Windows (path.join em URL file://); renderiza sob demanda.
export const dynamic = "force-dynamic"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #064e3b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              background: "rgba(14, 165, 233, 0.2)",
              border: "1px solid rgba(14, 165, 233, 0.4)",
              color: "#38bdf8",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Portfólio Fullstack
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #38bdf8 0%, #4ade80 50%, #facc15 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: "32px", color: "#e2e8f0", fontWeight: 600 }}>
            {profile.title}
          </div>
          <div style={{ fontSize: "20px", color: "#94a3b8", maxWidth: "900px" }}>
            {profile.stackLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "30px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          <div>Recife, PE · Brasil</div>
          <div style={{ color: "#38bdf8" }}>curriculo-portifolio-ruddy.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
