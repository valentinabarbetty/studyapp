'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trophy, Users, Target, Calendar, Plus, Check } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Challenge = {
  id: number
  title: string
  description: string
  goal: number
  current: number
  participants: number
  endDate: string
  active: boolean
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: '100 Horas en Septiembre',
      description: 'Completar 100 horas de estudio en equipo',
      goal: 100,
      current: 67,
      participants: 5,
      endDate: '30 Sep',
      active: true,
    },
    {
      id: 2,
      title: 'Racha Perfecta',
      description: 'Mantener 30 días consecutivos estudiando',
      goal: 30,
      current: 18,
      participants: 8,
      endDate: '15 Oct',
      active: true,
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [newChallenge, setNewChallenge] = useState({ title: '', goal: '' })

  const handleCreateChallenge = () => {
    if (newChallenge.title && newChallenge.goal) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsOpen(false)
        setNewChallenge({ title: '', goal: '' })
      }, 2000)
    }
  }

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
          <Card className="p-8 max-w-sm mx-4 text-center bg-card animate-slide-up">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-success">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Reto Creado con Éxito
            </h2>
            <p className="text-muted-foreground">
              Tu reto cooperativo ha sido creado
            </p>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-md mx-auto p-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/community">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Retos Cooperativos</h1>
          </div>

          <Card className="p-6 mb-6 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-accent-foreground" />
                <div>
                  <h3 className="font-bold text-foreground">Retos Activos</h3>
                  <p className="text-sm text-muted-foreground">
                    {challenges.filter((c) => c.active).length} en progreso
                  </p>
                </div>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="w-4 h-4 mr-1" />
                    Crear
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nuevo Reto Cooperativo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="challenge-title">Título del Reto</Label>
                      <Input
                        id="challenge-title"
                        value={newChallenge.title}
                        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                        placeholder="Ej: 50 Horas en Octubre"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="challenge-goal">Meta (horas)</Label>
                      <Input
                        id="challenge-goal"
                        type="number"
                        value={newChallenge.goal}
                        onChange={(e) => setNewChallenge({ ...newChallenge, goal: e.target.value })}
                        placeholder="50"
                        className="rounded-xl"
                      />
                    </div>
                    <Button onClick={handleCreateChallenge} className="w-full rounded-xl bg-primary hover:bg-primary/90">
                      Crear Reto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-5 bg-card border-border hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-sm font-semibold text-primary">{challenge.participants}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>Progreso del grupo</span>
                    </div>
                    <span className="font-bold text-foreground">
                      {challenge.current}/{challenge.goal} hrs
                    </span>
                  </div>
                  <Progress value={(challenge.current / challenge.goal) * 100} className="h-3" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Termina: {challenge.endDate}</span>
                    </div>
                    {(challenge.current / challenge.goal) * 100 >= 100 ? (
                      <div className="px-3 py-1 bg-success text-white rounded-lg text-sm font-semibold">
                        Completado
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Ver detalles
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-6 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/30">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">Recompensas Grupales</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Al completar retos, todo el grupo recibe recompensas especiales
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <p className="text-xs text-muted-foreground">Insignias</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🪙</div>
                  <p className="text-xs text-muted-foreground">Monedas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">⭐</div>
                  <p className="text-xs text-muted-foreground">XP Extra</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
