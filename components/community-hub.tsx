'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Trophy, Target } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

type Group = {
  id: number
  name: string
  members: number
  progress: number
  image: string
}

export function CommunityHub() {
  const myGroups: Group[] = [
    { id: 1, name: 'Matemáticas Avanzadas', members: 5, progress: 75, image: '📐' },
    { id: 2, name: 'Club de Lectura', members: 8, progress: 60, image: '📚' },
  ]

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Comunidad</h1>
          <p className="text-muted-foreground">Estudia en grupo y alcanza tus metas</p>
        </div>
      </div>

      <Link href="/community/create">
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Plus className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Crear Nuevo Grupo</h3>
              <p className="text-sm text-muted-foreground">
                Invita a tus amigos y estudien juntos
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Mis Grupos
        </h2>
        <div className="space-y-3">
          {myGroups.map((group) => (
            <Link key={group.id} href={`/community/group/${group.id}`}>
              <Card className="p-5 bg-card border-border hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                    {group.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.members} miembros</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso grupal</span>
                    <span className="font-semibold text-foreground">{group.progress}%</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/community/challenges">
        <Card className="p-6 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/30 hover:scale-105 transition-transform cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Retos Cooperativos</h3>
              <p className="text-sm text-muted-foreground">
                Compite con otros grupos y gana recompensas
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
