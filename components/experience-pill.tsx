import { Sparkles, ArrowUpRight } from "lucide-react"

const USER_XP = 12480
const NEXT_GOAL = 15000

const progress = Math.min(USER_XP / NEXT_GOAL, 1)

export function ExperiencePill() {
  return (
    <div className="fixed top-4 right-4 z-40 drop-shadow-xl">
      <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 px-4 py-3 text-primary-foreground ring-1 ring-primary/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/90">
            <span>Experiencia</span>
            <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold">
              {USER_XP.toLocaleString()} XP
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-white">Rumbo a {NEXT_GOAL.toLocaleString()} XP</span>
            <ArrowUpRight className="h-4 w-4 text-white/70" />
          </div>
          <div className="h-2 w-56 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white/90"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
