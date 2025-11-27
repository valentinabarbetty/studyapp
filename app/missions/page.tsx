import { HealthRecommendations } from "@/components/health-recommendations"
import { BottomNav } from "@/components/bottom-nav"

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <HealthRecommendations />
        <BottomNav />
      </div>
    </div>
  )
}
