'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Iniciar Sesión de Estudio
        </h1>
        <p className="text-muted-foreground">
          Elige tu tiempo de concentración
        </p>
      </div>

      <Card className="p-6 mb-6 bg-card border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">Duración de la sesión</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
                selectedTime === time
                  ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
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

      <Card className="p-5 bg-muted/50 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Próxima Misión
            </p>
            <p className="font-semibold text-foreground">
              Reto Diario: 3 Sesiones
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">+200 XP</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
