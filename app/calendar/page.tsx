import { WeeklyPlanner } from '@/components/weekly-planner'
import { BottomNav } from '@/components/bottom-nav'

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <WeeklyPlanner />
        <BottomNav />
      </div>
    </div>
  )
}
