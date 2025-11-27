import { UserProfile } from "@/components/user-profile"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <UserProfile />
        <BottomNav />
      </div>
    </div>
  )
}
