import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const agents = [
  {
    name: "Alex AI",
    role: "Cross-Platform ADs Manager",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/03/David-AI-Ai-Specialist-social-ads.png",
    href: "/dashboard/alex-ai",
  },
  {
    name: "Tony AI",
    role: "Consulente Vendite Digitale",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Tony-AI-strategiest.png",
    href: "/dashboard/tony-ai",
  },
  {
    name: "Aladino AI",
    role: "Consulente di Nuovi Servizi",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Aladdin-AI-consultant.png",
    href: "/dashboard/aladino-ai",
  },
  {
    name: "Lara AI",
    role: "Social Media Manager",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Lara-AI-social-strategiest.png",
    href: "/dashboard/lara-ai",
  },
  {
    name: "Simone AI",
    role: "SEO Copywriter",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Simone-AI-seo-copy.png",
    href: "/dashboard/simone-ai",
  },
  {
    name: "Mike AI",
    role: "Consulente Marketing Digitale",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Mike-AI-digital-marketing-mg.png",
    href: "/dashboard/mike-ai",
  },
  {
    name: "Valentina AI",
    role: "SEO Optimizer",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/03/Valentina-AI-AI-SEO-optimizer.png",
    href: "/dashboard/valentina-ai",
  },
  {
    name: "Niko AI",
    role: "SEO Manager",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Niko-AI.png",
    href: "/dashboard/niko-ai",
  },
  {
    name: "Jim AI",
    role: "Digital Sales Coach",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2025/02/Jim-AI-%E2%80%93-AI-Coach.png",
    href: "/dashboard/jim-ai",
  },
  {
    name: "Daniele AI",
    role: "Specialista per Landing Page e Funnel",
    image: "https://www.ai-scaleup.com/wp-content/uploads/2024/11/Gary-AI-SMMg-icon.png",
    href: "/dashboard/daniele-ai",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto w-[90%] max-w-7xl px-5 py-10">
        {/* Header Section */}
        <header className="mb-12 rounded-xl bg-[#235E84] px-5 py-8 text-center shadow-sm">
          <h1 className="mb-2 font-sans text-4xl font-bold leading-tight text-white">
            Incontra i nostri Specialisti AI
          </h1>
          <p className="text-lg text-white/90">Scegli un agente AI e avvia la conversazione con un clic.</p>
        </header>

        {/* Agents Grid */}
        <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {agents.map((agent) => (
            <Link key={agent.name} href={agent.href} className="group">
              <Card className="overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Agent Avatar */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Agent Info */}
                <div className="p-6">
                  <h3 className="mb-2 font-sans text-lg font-semibold text-card-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.role}</p>
                </div>
              </Card>
            </Link>
          ))}
        </main>
      </div>
    </div>
  )
}
