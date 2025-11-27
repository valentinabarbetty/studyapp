'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Target, Clock } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { BottomNav } from '@/components/bottom-nav'

export default function GroupDetailPage() {
  const group = {
    name: 'Matemáticas Avanzadas',
    description: 'Grupo dedicado al estudio de cálculo y álgebra lineal',
    members: [
      { id: 1, name: 'Leidy', avatar: 'L', progress: 85, hours: 12 },
      { id: 2, name: 'María', avatar: 'M', progress: 70, hours: 10 },
      { id: 3, name: 'Carlos', avatar: 'C', progress: 60, hours: 8 },
      { id: 4, name: 'Ana', avatar: 'A', progress: 45, hours: 6 },
      { id: 5, name: 'Juan', avatar: 'J', progress: 30, hours: 4 },
    ],
    totalHours: 40,
    goalHours: 50,
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-gradient-to-br from-primary/20 to-accent/10 p-6 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/community">
              <Button variant="ghost" size="icon" className="rounded-full bg-card">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-3xl">
              📐
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">{group.name}</h1>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Meta Grupal</h3>
              </div>
              <span className="font-bold text-foreground">
                {group.totalHours}/{group.goalHours} hrs
              </span>
            </div>
            <Progress value={(group.totalHours / group.goalHours) * 100} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {group.goalHours - group.totalHours} horas para completar la meta
            </p>
          </Card>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Miembros del Grupo</h2>
            </div>
            <div className="space-y-3">
              {group.members.map((member, index) => (
                <Card
                  key={member.id}
                  className="p-4 bg-card border-border mb-5 last:mb-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`/generic-placeholder-icon.png?height=48&width=48`} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs">
                          👑
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{member.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{member.hours} horas esta semana</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{member.progress}%</div>
                    </div>
                  </div>
                  <Progress value={member.progress} className="h-2" />
                </Card>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
