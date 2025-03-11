"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { UserRole } from "@/lib/auth-service"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Settings, User, CreditCard, BarChart3, Shield } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ["user", "admin", "superadmin"],
  },
  {
    title: "My Profile",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
    roles: ["user", "admin", "superadmin"],
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["user", "admin", "superadmin"],
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin", "superadmin"],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["admin", "superadmin"],
  },
  {
    title: "System Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["superadmin"],
  },
  {
    title: "Role Management",
    href: "/role-management",
    icon: <Shield className="h-5 w-5" />,
    roles: ["superadmin"],
  },
]

interface DashboardNavProps {
  userRole: UserRole
}

export function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname()

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <nav className="grid gap-1">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:text-primary",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

