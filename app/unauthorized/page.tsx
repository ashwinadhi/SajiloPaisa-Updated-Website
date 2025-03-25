"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-muted-foreground mb-6">
          You do not have permission to view this page. Please contact the administrator if you believe this is a mistake.
        </p>
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}