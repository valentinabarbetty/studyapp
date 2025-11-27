"use client"

import { SessionStart } from "@/components/session-start"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <SessionStart />
        <BottomNav />
      </div>
    </div>
  )
}
