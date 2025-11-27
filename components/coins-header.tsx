"use client"

import { Coins } from "lucide-react"
import Link from "next/link"

interface CoinsHeaderProps {
  coins?: number
}

export function CoinsHeader({ coins = 450 }: CoinsHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-40">
      <div className="max-w-md mx-auto px-6 py-3 flex justify-end">
        <Link href="/coins">
          <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full hover:bg-accent/30 transition-colors cursor-pointer">
            <Coins className="w-5 h-5 text-accent-foreground" />
            <span className="font-bold text-accent-foreground">{coins}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
