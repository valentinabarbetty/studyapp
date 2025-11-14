'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function CreateGroupPage() {
  const router = useRouter()
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<number[]>([])

  const friends = [
    { id: 1, name: 'María García', avatar: 'MG' },
    { id: 2, name: 'Carlos Pérez', avatar: 'CP' },
    { id: 3, name: 'Ana López', avatar: 'AL' },
    { id: 4, name: 'Juan Martínez', avatar: 'JM' },
  ]

  const handleCreate = () => {
    if (groupName && description) {
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/community')
      }, 2000)
    }
  }

  const toggleFriend = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
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
              Grupo Creado con Éxito
            </h2>
            <p className="text-muted-foreground">
              Tu grupo ha sido creado y tus amigos han sido invitados
            </p>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto p-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/community">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Crear Nuevo Grupo</h1>
          </div>

          <Card className="p-6 mb-6 bg-card border-border">
            <div className="space-y-5">
              <div>
                <Label htmlFor="image" className="text-sm font-semibold text-foreground mb-2 block">
                  Imagen del Grupo
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Agrega una imagen representativa para tu grupo
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-foreground mb-2 block">
                  Nombre del Grupo
                </Label>
                <Input
                  id="name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Ej: Matemáticas Avanzadas"
                  className="rounded-xl h-12"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-foreground mb-2 block">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe los objetivos y temas del grupo..."
                  className="rounded-xl min-h-24 resize-none"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-foreground mb-3 block">
                  Invitar a tus Amigos
                </Label>
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedFriends.includes(friend.id)
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-muted border-2 border-transparent'
                      }`}
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {friend.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-1 font-medium text-foreground">{friend.name}</span>
                      {selectedFriends.includes(friend.id) && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleCreate}
            disabled={!groupName || !description}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
          >
            Crear Grupo
          </Button>
        </div>
      </div>
    </>
  )
}
