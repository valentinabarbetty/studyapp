import { CommunityHub } from "@/components/community-hub"
import { BottomNav } from "@/components/bottom-nav"
import { CoinsHeader } from "@/components/coins-header"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <CoinsHeader />
      <div className="max-w-md mx-auto pt-16">
        <CommunityHub />
        <BottomNav />
      </div>
    </div>
  )
}
