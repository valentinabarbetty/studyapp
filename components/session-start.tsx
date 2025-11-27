"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { Sun, Moon, Bell, Clock, Coffee, Target } from "lucide-react"

export function SessionStart() {
  const [selectedTime, setSelectedTime] = useState(25)
  const router = useRouter()
  const times = [25, 50, 60]

  const handleStart = () => {
    router.push(`/focus?duration=${selectedTime}`)
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Iniciar Sesión de Estudio</h1>
        <p className="text-muted-foreground">Elige tu tiempo de concentración</p>
      </div>

      <Card className="p-6 mb-6 bg-card border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Duración de la sesión</h2>
        </div>

        <div className="flex gap-3 mb-6">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`flex-1 py-4 px-4 rounded-2xl font-semibold text-lg transition-all ${
                selectedTime === time
                  ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {time} min
            </button>
          ))}
        </div>

        <Button
          onClick={handleStart}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
        >
          Iniciar Sesión
        </Button>
      </Card>

      <Link href="/missions/daily-challenge">
        <Card className="p-6 mb-4 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-2">Próxima Misión - Reto Diario</h3>
              <p className="text-sm text-muted-foreground mb-1">Completa 3 sesiones de estudio hoy</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-3 py-1 bg-accent/40 rounded-lg text-xs font-semibold text-accent-foreground">
                  3 Sesiones Pendientes
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
