import { CommunityHub } from "@/components/community-hub"
import { BottomNav } from "@/components/bottom-nav"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <CommunityHub />
        <BottomNav />
      </div>
    </div>
  )
}
