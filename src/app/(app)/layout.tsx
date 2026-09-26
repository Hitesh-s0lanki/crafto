import { auth } from "@clerk/nextjs/server"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getCreditBalance } from "@/lib/billing/ledger"
import { listGames } from "@/lib/games/queries"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.protect({ unauthenticatedUrl: "/sign-in" })
  const { orgId } = session
  const [games, credits] = await Promise.all([
    listGames(),
    getCreditBalance(orgId),
  ])

  return (
    <SidebarProvider>
      <AppSidebar games={games} credits={credits} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
