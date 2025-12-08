"use client"

import { useEffect } from "react"
import { showToast } from "@/components/ui/use-toast"
import { SessionStart } from "@/components/session-start"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  useEffect(() => {
    const sessions = localStorage.getItem("sessionsCompleted")
    if (!sessions) {
      showToast("No has realizado una sesión aún. ¡Haz una para ganar XP!")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <SessionStart />
        <BottomNav />
      </div>
    </div>
  )
}
