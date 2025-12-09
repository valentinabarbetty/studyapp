"use client"

import { useEffect } from "react"
import { showToast } from "@/components/ui/use-toast"
import { SessionStart } from "@/components/session-start"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  useEffect(() => {
    showToast("No has realizado alguna sesión aún. ¡Vamos a estudiar! ✨")
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
