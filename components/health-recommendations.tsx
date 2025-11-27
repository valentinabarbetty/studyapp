"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Sun, Moon, Bell, Clock, Coffee, Target } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function HealthRecommendations() {
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    breakReminders: false,
    sleepReminders: true,
  })

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Salud y Bienestar</h1>
        <p className="text-muted-foreground">Recomendaciones para mejorar tu rendimiento</p>
      </div>

      

      <Card className="p-6 mb-4 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-2">Estudia durante el día</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Los estudios muestran que estudiar entre las 10:00 AM y 6:00 PM mejora la retención de información hasta
              en un 30%.
            </p>
            <div className="flex gap-2 text-sm font-semibold text-accent-foreground">
              <div className="px-3 py-1 bg-accent/30 rounded-lg">
                <Clock className="w-3 h-3 inline mr-1" />
                10:00 AM - 6:00 PM
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-4 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Moon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-2">Hora ideal para dormir</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Para un descanso óptimo y mejor consolidación de la memoria, te recomendamos dormir entre 7-9 horas
              diarias.
            </p>
            <div className="flex gap-2 text-sm font-semibold text-primary-foreground">
              <div className="px-3 py-1 bg-primary/40 rounded-lg">
                <Clock className="w-3 h-3 inline mr-1" />
                10:00 PM - 6:00 AM
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-4 bg-card border-border">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <Coffee className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-2">Toma descansos</h3>
            <p className="text-sm text-muted-foreground">
              Los descansos regulares mejoran la concentración y previenen el agotamiento mental.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">min/sesión</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">min/2 horas</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <p className="text-2xl font-bold text-foreground">30</p>
            <p className="text-xs text-muted-foreground">min/4 horas</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Configurar Notificaciones</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="study-reminders" className="text-sm font-medium text-foreground">
                Recordatorios de estudio
              </Label>
              <p className="text-xs text-muted-foreground">Recibe alertas para tus sesiones programadas</p>
            </div>
            <Switch
              id="study-reminders"
              checked={notifications.studyReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, studyReminders: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="break-reminders" className="text-sm font-medium text-foreground">
                Recordatorios de descanso
              </Label>
              <p className="text-xs text-muted-foreground">Te avisamos cuando es hora de tomar un break</p>
            </div>
            <Switch
              id="break-reminders"
              checked={notifications.breakReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, breakReminders: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sleep-reminders" className="text-sm font-medium text-foreground">
                Recordatorios de sueño
              </Label>
              <p className="text-xs text-muted-foreground">Te recordamos cuándo deberías ir a dormir</p>
            </div>
            <Switch
              id="sleep-reminders"
              checked={notifications.sleepReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sleepReminders: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
