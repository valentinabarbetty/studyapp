"use client"

import { useState, useEffect, use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pause, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const sessions = [
  {
    id: 1,
    name: "Sesión 1 - Cálculo",
    duration: 45,
    icon: "📐",
  },
  {
    id: 2,
    name: "Sesión 2 - Lectura",
    duration: 30,
    icon: "📚",
  },
  {
    id: 3,
    name: "Sesión 3 - Práctica",
    duration: 60,
    icon: "✍️",
  },
]

export default function SessionTimerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const sessionId = Number.parseInt(resolvedParams.id)
  const session = sessions.find((s) => s.id === sessionId)

  const [timeLeft, setTimeLeft] = useState((session?.duration || 45) * 60)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push("/complete")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, router])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = session ? ((session.duration * 60 - timeLeft) / (session.duration * 60)) * 100 : 0

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="absolute top-6 left-6">
          <Link href="/missions/daily-challenge">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <Card className="p-8 bg-card border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
              {session.icon}
            </div>
            <h2 className="text-xl font-bold text-foreground">{session.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Reto Diario</p>
          </div>

          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground tabular-nums">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground mt-2">minutos restantes</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              size="lg"
              variant={isRunning ? "outline" : "default"}
              onClick={() => setIsRunning(!isRunning)}
              className="rounded-xl min-w-[140px]"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Continuar
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
