import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type UserCredential,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"

// User roles
export type UserRole = "user" | "admin" | "superadmin"

// User type with role
export interface UserWithRole {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
}

// Register a new user with email and password
export async function registerWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string,
): Promise<UserWithRole> {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, { displayName })

    // Create user document in Firestore with default role
    const userData: UserWithRole = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL,
      role: "user", // Default role
    }

    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return userData
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string): Promise<UserWithRole> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return await getUserWithRole(userCredential)
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<UserWithRole> {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)

    // Check if this is a new user (first time sign in with Google)
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

    if (!userDoc.exists()) {
      // Create new user document for Google sign-in
      const userData: UserWithRole = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: "user", // Default role
      }

      await setDoc(doc(db, "users", userCredential.user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      return userData
    }

    return await getUserWithRole(userCredential)
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

// Get user with role from Firestore
export async function getUserWithRole(userCredential: UserCredential): Promise<UserWithRole> {
  try {
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserWithRole
      return userData
    } else {
      // This should not happen normally, but just in case
      const defaultUserData: UserWithRole = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: "user", // Default role
      }

      await setDoc(doc(db, "users", userCredential.user.uid), {
        ...defaultUserData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      return defaultUserData
    }
  } catch (error) {
    console.error("Error getting user role:", error)
    throw error
  }
}

// Sign out
export async function signOut(): Promise<void> {
  return firebaseSignOut(auth)
}

// Get current user with role
export async function getCurrentUserWithRole(): Promise<UserWithRole | null> {
  const user = auth.currentUser

  if (!user) {
    return null
  }

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      return userDoc.data() as UserWithRole
    }

    return null
  } catch (error) {
    console.error("Error getting current user role:", error)
    return null
  }
}

// Update user role (admin function)
export async function updateUserRole(userId: string, newRole: UserRole): Promise<void> {
  try {
    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        role: newRole,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

