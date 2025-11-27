"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Flame, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type Session = {
  day: string
  time: string
  subject: string
  duration: number
}

const sessionsByDay: Record<string, Session[]> = {
  LUN: [
    { day: "LUN", time: "09:00", subject: "Matemáticas", duration: 50 },
    { day: "LUN", time: "14:00", subject: "Historia", duration: 45 },
  ],
  MAR: [
    { day: "MAR", time: "10:00", subject: "Física", duration: 60 },
    { day: "MAR", time: "16:00", subject: "Literatura", duration: 50 },
  ],
  MIE: [
    { day: "MIE", time: "11:00", subject: "Química", duration: 55 },
    { day: "MIE", time: "15:00", subject: "Inglés", duration: 45 },
  ],
  JUE: [
    { day: "JUE", time: "09:30", subject: "Biología", duration: 50 },
    { day: "JUE", time: "14:30", subject: "Arte", duration: 60 },
  ],
  VIE: [
    { day: "VIE", time: "10:00", subject: "Programación", duration: 90 },
    { day: "VIE", time: "16:00", subject: "Música", duration: 45 },
  ],
  SAB: [{ day: "SAB", time: "10:00", subject: "Repaso General", duration: 120 }],
  DOM: [{ day: "DOM", time: "11:00", subject: "Lectura Libre", duration: 60 }],
}

export function WeeklyPlanner() {
  const [routineGenerated, setRoutineGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDay, setSelectedDay] = useState("LUN")
  const [sessions, setSessions] = useState<Session[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [newSession, setNewSession] = useState({ day: "LUN", time: "", subject: "", duration: 45 })

  const days = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"]
  const weeklyStreak = [true, true, true, false, false, false, false]

  const handleGenerateRoutine = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setRoutineGenerated(true)
      setSelectedDay("LUN")
      setSessions(sessionsByDay["LUN"])
      setIsGenerating(false)
    }, 2000)
  }

  const handleDayClick = (day: string) => {
    setSelectedDay(day)
    setSessions(sessionsByDay[day] || [])
  }

  const handleAddSession = () => {
    if (newSession.time && newSession.subject) {
      setSessions([...sessions, newSession])
      setNewSession({ day: selectedDay, time: "", subject: "", duration: 45 })
      setIsOpen(false)
    }
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Planifica tu Semana</h1>
        <p className="text-muted-foreground">Organiza tus sesiones de estudio</p>
      </div>

      {!routineGenerated && !isGenerating && (
        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-3">Crea tu Rutina Semanal</h3>
          <p className="text-muted-foreground mb-6">Generaremos un plan de estudio personalizado para ti</p>
          <Button
            onClick={handleGenerateRoutine}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generar rutina semanal
          </Button>
        </Card>
      )}

      {isGenerating && (
        <Card className="p-12 mb-6 bg-card border-2 border-primary/30 text-center">
          <div className="animate-pulse">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-foreground mb-2">Generando rutina semanal...</h3>
            <p className="text-muted-foreground">Estamos creando el plan perfecto para ti</p>
          </div>
        </Card>
      )}

      {routineGenerated && (
        <>
          <Card className="p-6 mb-6 bg-card border-2 border-primary/20">
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day, index) => (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`text-center transition-all ${selectedDay === day ? "scale-110" : "hover:scale-105"}`}
                >
                  <div
                    className={`text-xs font-semibold mb-2 ${
                      selectedDay === day ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {day}
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      selectedDay === day
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-primary/20"
                    }`}
                  >
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-foreground mb-3">Sesiones de {selectedDay}</h3>

            <div className="space-y-3">
              {sessions.length > 0 ? (
                sessions.map((session, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary rounded-xl flex justify-between items-center animate-slide-up"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.time} - {session.duration} min
                      </p>
                    </div>
                    <Link href={`/focus?duration=${Math.floor(session.duration / 60) || 25}`}>
                      <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                        Iniciar
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No hay sesiones programadas para este día</p>
              )}
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
                  <DialogTitle>Nueva Sesión de Estudio</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="day">Día</Label>
                    <select
                      id="day"
                      value={newSession.day}
                      onChange={(e) => setNewSession({ ...newSession, day: e.target.value })}
                      className="w-full p-3 border rounded-xl mt-1 bg-background"
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
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
                    Guardar Sesión
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          <Link href="/pomodoro">
            <Card className="p-5 mb-6 bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍅</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Técnica Pomodoro</h3>
                    <p className="text-sm text-muted-foreground">25 min enfoque + 5 min descanso</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                  Iniciar
                </Button>
              </div>
            </Card>
          </Link>
        </>
      )}

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
