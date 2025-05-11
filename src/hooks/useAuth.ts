import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, profiles, UserProfile } from '../services/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        setUser(currentUser)

        if (currentUser) {
          try {
            const userProfile = await profiles.get(currentUser.id)
            setProfile(userProfile)
          } catch (error) {
            // If profile doesn't exist, that's okay - it will be created during onboarding
            console.log('No profile found for user - will be created during onboarding')
          }
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            const userProfile = await profiles.get(session.user.id)
            setProfile(userProfile)
          } catch (error) {
            // If profile doesn't exist, that's okay - it will be created during onboarding
            console.log('No profile found for user - will be created during onboarding')
          }
        } else {
          setProfile(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data: { user } } = await supabase.auth.signInWithPassword({ email, password })
      setUser(user)
      return user
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data: { user } } = await supabase.auth.signUp({ email, password })
      setUser(user)
      return user
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  }
} 