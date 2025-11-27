"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flame, Award, Coins } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function UserProfile() {
  const avatarOptions = [
    { id: "female-light", src: "/avatars/female-light.svg", label: "Mujer piel clara" },
    { id: "female-medium", src: "/avatars/female-medium.svg", label: "Mujer piel media" },
    { id: "female-dark", src: "/avatars/female-dark.svg", label: "Mujer piel oscura" },
    { id: "male-light", src: "/avatars/male-light.svg", label: "Hombre piel clara" },
    { id: "male-medium", src: "/avatars/male-medium.svg", label: "Hombre piel media" },
    { id: "male-dark", src: "/avatars/male-dark.svg", label: "Hombre piel oscura" },
  ]

  const weeklyData = [
    { day: "LUN", percentage: 80, completed: true },
    { day: "MAR", percentage: 20, completed: false },
    { day: "MIE", percentage: 60, completed: false },
    { day: "JUE", percentage: 40, completed: false },
    { day: "VIE", percentage: 70, completed: false },
    { day: "SAB", percentage: 10, completed: false },
    { day: "DOM", percentage: 50, completed: false },
  ]

  const currentXP = 1200
  const nextLevelXP = 1500
  const progressPercentage = (currentXP / nextLevelXP) * 100
  const [coins, setCoins] = useState(450)
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0])

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
        <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
          <Coins className="w-5 h-5 text-accent-foreground" />
          <span className="font-bold text-accent-foreground">{coins}</span>
        </div>
      </div>

      <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src={selectedAvatar.src} alt={selectedAvatar.label} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">L</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-1">Leidy</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-accent-foreground" />
                <span className="font-semibold text-accent-foreground text-sm">Nivel 2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tu progreso:</span>
            <span className="font-semibold text-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-muted" />
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-primary">{currentXP} XP</span>
            <span className="text-muted-foreground">{nextLevelXP} XP</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6 bg-card border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Imagen de perfil</h3>
            <p className="text-sm text-muted-foreground">Elige entre 6 avatares precargados.</p>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">3 hombres · 3 mujeres</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {avatarOptions.map((option) => {
            const isSelected = selectedAvatar.id === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedAvatar(option)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition hover:scale-[1.02] ${
                  isSelected ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-muted bg-muted/20"
                }`}
              >
                <Avatar className="w-16 h-16 border border-border bg-background">
                  <AvatarImage src={option.src} alt={option.label} />
                  <AvatarFallback className="bg-muted text-foreground">{option.label.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">{option.label}</span>
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 mb-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Tu avance semanal</h3>
        <div className="flex items-end justify-between gap-2 h-40 mb-3">
          {weeklyData.map((data, index) => (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2 h-full">
              <div className="w-full h-32 bg-muted/30 rounded-lg relative flex items-end">
                <div
                  className="w-full bg-primary rounded-lg transition-all duration-500"
                  style={{ height: `${data.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary">{data.percentage}%</span>
              <span className="text-xs font-medium text-muted-foreground">{data.day}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mb-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Tu racha semanal</h3>
        <div className="flex justify-around">
          {weeklyData.map((data) => (
            <div key={data.day} className="flex flex-col items-center gap-2">
              {data.completed ? (
                <Flame className="w-7 h-7 text-fire" fill="currentColor" />
              ) : (
                <Flame className="w-7 h-7 text-muted-foreground/20" />
              )}
              <span className="text-xs text-muted-foreground font-medium">{data.day}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/badges">
          <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30 hover:scale-105 transition-transform cursor-pointer">
            <Award className="w-8 h-8 text-accent-foreground mb-2" />
            <p className="font-semibold text-foreground">Insignias</p>
            <p className="text-sm text-muted-foreground">Ver colección</p>
          </Card>
        </Link>
        <Link href="/coins">
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 hover:scale-105 transition-transform cursor-pointer">
            <Coins className="w-8 h-8 text-primary mb-2" />
            <p className="font-semibold text-foreground">Monedas</p>
            <p className="text-sm text-muted-foreground">Ver inventario</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
