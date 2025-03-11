"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, CheckCircle, User, Shield } from "lucide-react"
import Link from "next/link"
import type { UserWithRole } from "@/lib/auth-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

type UserRole = "user" | "admin" | "superadmin"

export default function UserManagementPage() {
  const { user, isLoading } = useAuth()
  const [users, setUsers] = useState<UserWithRole[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is admin or superadmin
    if (!isLoading && user) {
      if (user.role !== "admin" && user.role !== "superadmin") {
        router.push("/dashboard")
      } else {
        fetchUsers()
      }
    }
  }, [user, isLoading, router])

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true)
      const usersQuery = query(collection(db, "users"), orderBy("displayName"))
      const querySnapshot = await getDocs(usersQuery)

      const usersData: UserWithRole[] = []
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserWithRole
        usersData.push(userData)
      })

      setUsers(usersData)
    } catch (error: any) {
      console.error("Error fetching users:", error)
      setError(error.message || "Failed to load users")
    } finally {
      setLoadingUsers(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    if (!user) return

    // Only superadmin can create other superadmins
    if (newRole === "superadmin" && user.role !== "superadmin") {
      setError("Only superadmins can create other superadmins")
      return
    }

    setUpdatingUser(userId)
    setError(null)
    setSuccessMessage(null)

    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date(),
      })

      // Update local state
      setUsers(users.map((u) => (u.uid === userId ? { ...u, role: newRole as UserRole } : u)))

      setSuccessMessage(`User role updated successfully to ${newRole}`)
    } catch (error: any) {
      console.error("Error updating user role:", error)
      setError(error.message || "Failed to update user role")
    } finally {
      setUpdatingUser(null)
    }
  }

  if (isLoading || loadingUsers) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user roles and permissions.{" "}
              {user.role === "superadmin"
                ? "As a superadmin, you can assign any role."
                : "As an admin, you can only assign regular user roles."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Current Role</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userData) => (
                      <tr key={userData.uid} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {userData.photoURL ? (
                                <img
                                  src={userData.photoURL || "/placeholder.svg"}
                                  alt={userData.displayName || ""}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <span>{userData.displayName || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{userData.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-primary" />
                            <span>{userData.role}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Select
                              disabled={updatingUser === userData.uid || userData.uid === user.uid}
                              onValueChange={(value) => updateUserRole(userData.uid, value)}
                              defaultValue={userData.role}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                {user.role === "superadmin" && <SelectItem value="superadmin">Superadmin</SelectItem>}
                              </SelectContent>
                            </Select>

                            {updatingUser === userData.uid && (
                              <div className="h-4 w-4 border-2 border-primary border-t-transparent animate-spin rounded-full"></div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

