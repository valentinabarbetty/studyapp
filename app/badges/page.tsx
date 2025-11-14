import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

type Badge = {
  id: number
  name: string
  description: string
  icon: string
  unlocked: boolean
}

export default function BadgesPage() {
  const badges: Badge[] = [
    { id: 1, name: 'Primera Sesión', description: 'Completa tu primera sesión de estudio', icon: '🎯', unlocked: true },
    { id: 2, name: 'Racha de Fuego', description: 'Mantén una racha de 7 días', icon: '🔥', unlocked: true },
    { id: 3, name: 'Maestro del Tiempo', description: 'Completa 50 sesiones', icon: '⏰', unlocked: true },
    { id: 4, name: 'Colaborador', description: 'Únete a tu primer grupo', icon: '🤝', unlocked: false },
    { id: 5, name: 'Madrugador', description: 'Estudia antes de las 7am', icon: '🌅', unlocked: false },
    { id: 6, name: 'Noctámbulo', description: 'Estudia después de las 10pm', icon: '🌙', unlocked: false },
    { id: 7, name: 'Concentración Máxima', description: 'Completa una sesión de 60 minutos', icon: '🧠', unlocked: false },
    { id: 8, name: 'Campeón Mensual', description: 'Completa 100 sesiones en un mes', icon: '🏆', unlocked: false },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Galería de Insignias</h1>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-1">
                {badges.filter(b => b.unlocked).length}/{badges.length}
              </h2>
              <p className="text-sm text-muted-foreground">Insignias desbloqueadas</p>
            </div>
            <div className="text-6xl">🏅</div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <Card
              key={badge.id}
              className={`p-5 relative group cursor-pointer transition-all hover:scale-105 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30'
                  : 'bg-muted/30 border-muted'
              }`}
            >
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-muted/60 rounded-lg flex items-center justify-center backdrop-blur-[2px]">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="text-center">
                <div className={`text-5xl mb-3 ${!badge.unlocked && 'grayscale opacity-30'}`}>
                  {badge.icon}
                </div>
                <h3 className={`font-semibold mb-1 text-sm ${
                  badge.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge.name}
                </h3>
                <p className={`text-xs ${
                  badge.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/50'
                }`}>
                  {badge.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
