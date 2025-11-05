import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Bot, Users, BarChart3, Workflow, Settings, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Agent Team",
  description: "Manage your AI agent team",
  generator: "v0.app",
}

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "AI Agents",
    icon: Bot,
    href: "/agents",
  },
  {
    title: "Teams",
    icon: Users,
    href: "/teams",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Workflows",
    icon: Workflow,
    href: "/workflows",
  },
  {
    title: "Knowledge Base",
    icon: BookOpen,
    href: "/knowledge",
  },
]

const settingsItems = [
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans antialiased`}>
          <SidebarProvider>
            <Sidebar collapsible="icon">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                      <Link href="/dashboard">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          <Sparkles className="size-4 text-white" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                          <span className="font-semibold">AI Agent Team</span>
                          <span className="text-xs text-muted-foreground">Enterprise</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild tooltip={item.title}>
                            <Link href={item.href}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {settingsItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild tooltip={item.title}>
                            <Link href={item.href}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "size-8 rounded-lg",
                          },
                        }}
                      />
                      <div className="flex flex-col gap-0.5 leading-none text-left">
                        <span className="font-semibold text-sm">Account</span>
                        <span className="text-xs text-muted-foreground">Manage profile</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">AI Agent Team</span>
                </div>
              </header>
              <div className="flex flex-1 flex-col">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
