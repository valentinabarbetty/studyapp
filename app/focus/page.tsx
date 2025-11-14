'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Play, Pause, X } from 'lucide-react'
import { Card } from '@/components/ui/card'

function FocusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const duration = parseInt(searchParams.get('duration') || '25')
  
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isRunning, setIsRunning] = useState(true)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    console.log('[v0] Focus session started, duration:', duration, 'minutes')
    
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push('/complete')
          return 0
        }
        
        if (prev === 300 && !showWarning) {
          setShowWarning(true)
          console.log('[v0] 5 minutes warning triggered')
        }
        
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, duration, router, showWarning])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  const handleAbandon = () => {
    if (confirm('¿Seguro que quieres abandonar la sesión?')) {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-6">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 bg-success/20 text-success rounded-full font-semibold mb-4 animate-pulse-success">
            🔇 Modo Foco Activado
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Mantén la concentración
          </h1>
        </div>

        <Card className="p-8 bg-card border-2 border-primary/20 mb-6">
          <div className="relative w-64 h-64 mx-auto mb-6">
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
                className="text-primary transition-all duration-1000"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground mb-2">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(progress)}% completado
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="outline"
              size="lg"
              className="flex-1 rounded-xl"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Reanudar
                </>
              )}
            </Button>
            <Button
              onClick={handleAbandon}
              variant="destructive"
              size="lg"
              className="rounded-xl"
            >
              <X className="w-4 h-4 mr-2" />
              Abandonar
            </Button>
          </div>
        </Card>

        {showWarning && (
          <Card className="p-4 bg-accent/20 border-accent animate-slide-up">
            <p className="text-center font-semibold text-accent-foreground">
              ⏰ ¡Últimos 5 minutos! Mantén el enfoque
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function FocusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">Cargando...</div>
      </div>
    </div>}>
      <FocusContent />
    </Suspense>
  )
}
