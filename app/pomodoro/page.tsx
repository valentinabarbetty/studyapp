"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch between work and break
          if (isBreak) {
            setIsBreak(false)
            setTimeLeft(25 * 60)
            setCompletedCycles((c) => c + 1)
          } else {
            setIsBreak(true)
            setTimeLeft(5 * 60)
          }
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, isBreak])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = isBreak ? ((5 * 60 - timeLeft) / (5 * 60)) * 100 : ((25 * 60 - timeLeft) / (25 * 60)) * 100

  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(25 * 60)
  }

  return (
    <>
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-md mx-auto p-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/calendar">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Técnica Pomodoro</h1>
          </div>

          <Card className="p-8 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="text-center mb-6">
              <div
                className={`inline-block px-6 py-2 rounded-full font-semibold mb-4 ${
                  isBreak ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                }`}
              >
                {isBreak ? "☕ Tiempo de Descanso" : "🍅 Tiempo de Enfoque"}
              </div>
            </div>

            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className={isBreak ? "text-success" : "text-primary"}
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground">{isBreak ? "Descanso" : "Concentración"}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                size="lg"
                className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar
                  </>
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg" className="rounded-xl bg-transparent">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-card rounded-xl">
                <div className="text-2xl font-bold text-primary">{completedCycles}</div>
                <div className="text-xs text-muted-foreground">Ciclos</div>
              </div>
              <div className="p-3 bg-card rounded-xl">
                <div className="text-2xl font-bold text-accent">25</div>
                <div className="text-xs text-muted-foreground">Enfoque</div>
              </div>
              <div className="p-3 bg-card rounded-xl">
                <div className="text-2xl font-bold text-success">5</div>
                <div className="text-xs text-muted-foreground">Descanso</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50 border-border">
            <h3 className="font-semibold text-foreground mb-3">¿Cómo funciona?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Enfócate durante 25 minutos sin interrupciones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">2.</span>
                <span>Toma un descanso de 5 minutos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>Después de 4 ciclos, toma un descanso largo de 15-30 min</span>
              </li>
            </ul>
          </Card>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
