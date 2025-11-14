'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { BottomNav } from '@/components/bottom-nav'

export default function CoinsPage() {
  const [showLevelUp, setShowLevelUp] = useState(false)
  const coins = 350

  useEffect(() => {
    // Simulate level up animation on mount
    setShowLevelUp(true)
    setTimeout(() => setShowLevelUp(false), 3000)
  }, [])

  const themes = [
    { id: 1, name: 'Modo Nocturno', price: 100, unlocked: true },
    { id: 2, name: 'Bosque Verde', price: 150, unlocked: false },
    { id: 3, name: 'Océano Azul', price: 200, unlocked: false },
    { id: 4, name: 'Atardecer Rosa', price: 250, unlocked: false },
  ]

  return (
    <>
      {showLevelUp && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
          <Card className="p-8 max-w-sm mx-4 text-center bg-gradient-to-br from-accent to-accent/60 border-accent animate-pulse-success">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-accent-foreground mb-4">
              ¡Level Up!
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-accent-foreground rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <span className="text-4xl font-bold text-accent-foreground">+50</span>
            </div>
            <p className="text-lg text-accent-foreground/90 font-semibold">
              Monedas de Conocimiento
            </p>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-md mx-auto p-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Monedas e Inventario</h1>
          </div>

          <Card className="p-6 mb-6 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">Tus Monedas</h2>
              <div className="flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-accent-foreground rounded-full flex items-center justify-center">
                  <span className="text-lg">🧠</span>
                </div>
                <span className="text-2xl font-bold text-accent-foreground">{coins}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Gana monedas completando sesiones y misiones
            </p>
          </Card>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Tienda de Temas</h2>
            </div>
            <div className="space-y-3">
              {themes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`p-5 ${
                    theme.unlocked
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{theme.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent-foreground rounded-full flex items-center justify-center">
                          <span className="text-xs">🧠</span>
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {theme.price}
                        </span>
                      </div>
                    </div>
                    {theme.unlocked ? (
                      <div className="px-4 py-2 bg-success text-white rounded-lg font-semibold text-sm">
                        Desbloqueado
                      </div>
                    ) : (
                      <Button
                        disabled={coins < theme.price}
                        className="rounded-lg bg-primary hover:bg-primary/90"
                      >
                        Comprar
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
