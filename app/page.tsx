"use client"

import { SessionStart } from "@/components/session-start"
import { BottomNav } from "@/components/bottom-nav"
import { CoinsHeader } from "@/components/coins-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <CoinsHeader />
      <div className="max-w-md mx-auto pt-16">
        <SessionStart />
        <BottomNav />
      </div>
    </div>
  )
}
