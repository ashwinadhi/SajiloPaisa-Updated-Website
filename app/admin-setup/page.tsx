"use client"

import { useState, useEffect } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AdminSetupPage() {
  const { user, isLoading } = useAuth()
  const [setupStatus, setSetupStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [currentRole, setCurrentRole] = useState<string | null>(null)

  useEffect(() => {
    const checkCurrentRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setCurrentRole(userDoc.data().role)
          }
        } catch (error) {
          console.error("Error checking role:", error)
        }
      }
    }

    if (!isLoading && user) {
      checkCurrentRole()
    }
  }, [user, isLoading])

  const setupSuperAdmin = async () => {
    if (!user) return

    setSetupStatus("loading")
    setErrorMessage(null)

    try {
      // Update the current user to be a superadmin
      await setDoc(
        doc(db, "users", user.uid),
        {
          role: "superadmin",
          updatedAt: new Date(),
        },
        { merge: true },
      )

      setSetupStatus("success")
      setCurrentRole("superadmin")
    } catch (error: any) {
      console.error("Error setting up superadmin:", error)
      setSetupStatus("error")
      setErrorMessage(error.message || "An error occurred while setting up the superadmin role.")
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
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Setup</CardTitle>
            <CardDescription>You need to be logged in to set up an admin account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>Set up your account as a superadmin for testing purposes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentRole && (
            <Alert className="mb-4">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Your current role is: <strong>{currentRole}</strong>
                </AlertDescription>
              </div>
            </Alert>
          )}

          {setupStatus === "error" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {setupStatus === "success" ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>Successfully set up as superadmin!</AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          ) : (
            <Button
              onClick={setupSuperAdmin}
              className="w-full"
              disabled={setupStatus === "loading" || currentRole === "superadmin"}
            >
              {setupStatus === "loading" ? (
                <>
                  <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                  Setting up...
                </>
              ) : currentRole === "superadmin" ? (
                "Already a Superadmin"
              ) : (
                "Set as Superadmin"
              )}
            </Button>
          )}

          <div className="text-center mt-4">
            <Link href="/dashboard" className="text-primary hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

