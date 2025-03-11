"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase"
import {
  type UserWithRole,
  getCurrentUserWithRole,
  signInWithEmail,
  signInWithGoogle,
  registerWithEmailAndPassword,
  signOut,
} from "@/lib/auth-service"

type AuthContextType = {
  user: UserWithRole | null
  firebaseUser: FirebaseUser | null
  isLoading: boolean
  signInWithEmailAndPassword: (email: string, password: string) => Promise<UserWithRole>
  signInWithGoogleProvider: () => Promise<UserWithRole>
  registerUser: (email: string, password: string, displayName: string) => Promise<UserWithRole>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  isLoading: true,
  signInWithEmailAndPassword: async () => {
    throw new Error("Not implemented")
  },
  signInWithGoogleProvider: async () => {
    throw new Error("Not implemented")
  },
  registerUser: async () => {
    throw new Error("Not implemented")
  },
  signOutUser: async () => {
    throw new Error("Not implemented")
  },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<UserWithRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser)

      if (firebaseUser) {
        try {
          const userWithRole = await getCurrentUserWithRole()
          setUser(userWithRole)
        } catch (error) {
          console.error("Error getting user role:", error)
          setUser(null)
        }
      } else {
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userWithRole = await signInWithEmail(email, password)
      setUser(userWithRole)
      return userWithRole
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signInWithGoogleProvider = async () => {
    try {
      const userWithRole = await signInWithGoogle()
      setUser(userWithRole)
      return userWithRole
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const registerUser = async (email: string, password: string, displayName: string) => {
    try {
      const userWithRole = await registerWithEmailAndPassword(email, password, displayName)
      setUser(userWithRole)
      return userWithRole
    } catch (error) {
      console.error("Error registering user:", error)
      throw error
    }
  }

  const signOutUser = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        signInWithEmailAndPassword,
        signInWithGoogleProvider,
        registerUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

