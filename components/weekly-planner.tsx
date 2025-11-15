'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Flame } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Session = {
  day: string
  time: string
  subject: string
}

export function WeeklyPlanner() {
  const [sessions, setSessions] = useState<Session[]>([
    { day: 'LUN', time: '14:00', subject: 'Matemáticas' },
    { day: 'MIE', time: '16:00', subject: 'Historia' },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [newSession, setNewSession] = useState<Session>({ day: 'LUN', time: '', subject: '' })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM']
  const weeklyStreak = [true, true, true, false, false, false, false]

  const handleAddSession = () => {
    // kept for backwards-compatibility but prefer handleSave
    handleSave()
  }

  const handleSave = () => {
    if (!newSession.time || !newSession.subject) return

    if (editingIndex === null) {
      setSessions([...sessions, newSession])
    } else {
      setSessions(sessions.map((s, i) => (i === editingIndex ? newSession : s)))
    }

    setNewSession({ day: 'LUN', time: '', subject: '' })
    setEditingIndex(null)
    setIsOpen(false)
  }

  const handleEditSession = (index: number) => {
    const session = sessions[index]
    setNewSession(session)
    setEditingIndex(index)
    setIsOpen(true)
  }

  const handleDelete = () => {
    if (editingIndex === null) return
    setSessions(sessions.filter((_, i) => i !== editingIndex))
    setEditingIndex(null)
    setNewSession({ day: 'LUN', time: '', subject: '' })
    setIsOpen(false)
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Planifica tu Semana
        </h1>
        <p className="text-muted-foreground">
          Organiza tus sesiones de estudio
        </p>
      </div>

      <Card className="p-6 mb-6 bg-card border-2 border-primary/20">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((day, index) => (
            <div key={day} className="text-center">
              <div className={`text-xs font-semibold mb-2 ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                {day}
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="p-4 bg-secondary rounded-xl flex justify-between items-center animate-slide-up"
            >
              <div>
                <p className="font-semibold text-foreground">{session.subject}</p>
                <p className="text-sm text-muted-foreground">{session.day} - {session.time}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg" onClick={() => handleEditSession(index)}>
                Editar
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-4 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Sesión
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingIndex === null ? 'Nueva Sesión de Estudio' : 'Editar Sesión de Estudio'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="day">Día</Label>
                <select
                  id="day"
                  value={newSession.day}
                  onChange={(e) => setNewSession({ ...newSession, day: e.target.value })}
                  className="w-full p-3 border rounded-xl mt-1"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={newSession.time}
                  onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="subject">Materia</Label>
                <Input
                  id="subject"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                  placeholder="Ej: Matemáticas"
                  className="rounded-xl"
                />
              </div>
              <Button onClick={handleAddSession} className="w-full rounded-xl bg-primary hover:bg-primary/90">
                {editingIndex === null ? 'Guardar Sesión' : 'Guardar cambios'}
              </Button>
              {editingIndex !== null && (
                <Button onClick={handleDelete} variant="outline" className="w-full mt-2 rounded-xl border-red-400 text-red-600">
                  Eliminar Sesión
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      <Card className="p-5 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <h3 className="font-semibold mb-3 text-foreground">Tu racha semanal</h3>
        <div className="flex justify-around">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center gap-1">
              {weeklyStreak[index] ? (
                <Flame className="w-6 h-6 text-fire" fill="currentColor" />
              ) : (
                <Flame className="w-6 h-6 text-muted-foreground/30" />
              )}
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
