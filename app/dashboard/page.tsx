"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, LogOut } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import type { UserRole } from "@/lib/auth-service"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardPage() {
  const { user, isLoading, signOutUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSignOut = async () => {
    try {
      await signOutUser()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-md bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary absolute transform -rotate-12"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Sajilo-Paisa
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL || "/placeholder.svg"}
                    alt={user.displayName || "User"}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user.displayName}</div>
                <div className="text-xs text-muted-foreground">{getRoleBadge(user.role)}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <DashboardNav userRole={user.role} />

          <div className="mt-6">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </aside>

        <main>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.displayName}</h1>
            <p className="text-muted-foreground">You are logged in as {getRoleBadge(user.role)}</p>
          </div>

          {renderDashboardContent(user.role)}
        </main>
      </div>
    </div>
  )
}

function getRoleBadge(role: UserRole) {
  switch (role) {
    case "superadmin":
      return "Super Admin"
    case "admin":
      return "Administrator"
    case "user":
    default:
      return "Regular User"
  }
}

function renderDashboardContent(role: UserRole) {
  switch (role) {
    case "superadmin":
      return <SuperAdminDashboard />
    case "admin":
      return <AdminDashboard />
    case "user":
    default:
      return <UserDashboard />
  }
}

function SuperAdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
          <Button className="w-full" asChild>
            <Link href="/user-management">Manage Users</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">₹10M+</div>
              <div className="text-sm text-muted-foreground">Daily Transactions</div>
            </div>
          </div>
          <Button className="w-full">View Transactions</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Broker Partners</div>
            </div>
          </div>
          <Button className="w-full">Manage Partners</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 md:col-span-2 lg:col-span-3">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid gap-2 md:grid-cols-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin-setup">Admin Setup</Link>
            </Button>
            <Button variant="outline" size="sm">
              System Backup
            </Button>
            <Button variant="outline" size="sm">
              View Audit Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
          <Button className="w-full" asChild>
            <Link href="/user-management">Manage Users</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">₹5M+</div>
              <div className="text-sm text-muted-foreground">Weekly Transactions</div>
            </div>
          </div>
          <Button className="w-full">View Transactions</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Available Reports</div>
            </div>
          </div>
          <Button className="w-full">View Reports</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 md:col-span-2 lg:col-span-3">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid gap-2 md:grid-cols-3">
            <Button variant="outline" size="sm">
              Add New User
            </Button>
            <Button variant="outline" size="sm">
              Update Content
            </Button>
            <Button variant="outline" size="sm">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">My Profile</div>
              <div className="font-medium">View and edit</div>
            </div>
          </div>
          <Button className="w-full">Edit Profile</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Recent Transactions</div>
            </div>
          </div>
          <Button className="w-full">View Transactions</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Saved Payment Methods</div>
            </div>
          </div>
          <Button className="w-full">Manage Payment Methods</Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 md:col-span-2 lg:col-span-3">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid gap-2 md:grid-cols-3">
            <Button variant="outline" size="sm">
              Make a Payment
            </Button>
            <Button variant="outline" size="sm">
              View Recent Activity
            </Button>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

