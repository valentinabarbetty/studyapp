"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Zap } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

export default function DailyChallengeSessionsPage() {
  const sessions = [
    {
      id: 1,
      name: "Sesión 1 - Cálculo",
      duration: "45 minutos",
      difficulty: "Media",
      difficultyColor: "bg-yellow-500",
      icon: "📐",
    },
    {
      id: 2,
      name: "Sesión 2 - Lectura",
      duration: "30 minutos",
      difficulty: "Fácil",
      difficultyColor: "bg-green-500",
      icon: "📚",
    },
    {
      id: 3,
      name: "Sesión 3 - Práctica",
      duration: "60 minutos",
      difficulty: "Difícil",
      difficultyColor: "bg-red-500",
      icon: "✍️",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/missions">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reto Diario</h1>
              <p className="text-sm text-muted-foreground">3 sesiones por completar</p>
            </div>
          </div>

          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="p-6 bg-card border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {session.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{session.name}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Zap className="w-4 h-4" />
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${session.difficultyColor}`}
                        >
                          {session.difficulty}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                      Comenzar Sesión
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-6 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Recompensa al completar</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-foreground">+300 XP</span>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </Card>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
