"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function CompletePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sessionDuration = Number.parseInt(searchParams.get("duration") || "25")
  const reward = useMemo(
    () => Number.parseInt(searchParams.get("reward") || "") || Math.max(50, Math.round(sessionDuration * 4)),
    [searchParams, sessionDuration],
  )
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#A4D69C', '#FFD93D', '#FF6B3D', '#CDEDC6'][Math.floor(Math.random() * 4)],
              }}
            />
          </div>
        ))}
      </div>

      <div className={`max-w-md w-full text-center z-10 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center animate-pulse-success">
              <Sparkles className="w-16 h-16 text-accent-foreground" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">¡Sesión Completada!</h1>

          <div className="inline-block px-8 py-4 bg-success text-white rounded-3xl text-3xl font-bold mb-6 animate-pulse-success">
            +{reward} XP
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            ¡Excelente trabajo! Has completado una sesión de estudio de {sessionDuration} minutos y ganaste una
            recompensa acorde a tu esfuerzo.
          </p>
        </div>

        <Button
          onClick={() => router.push('/')}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
