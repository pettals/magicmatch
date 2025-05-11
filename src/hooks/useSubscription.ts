import { useState } from 'react'
import { createCheckoutSession, createPortalSession, PRICE_IDS } from '../services/stripe'
import { profiles } from '../services/supabase'
import { useAuth } from './useAuth'

export const useSubscription = () => {
  const { user, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upgradeToPremium = async () => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      await createCheckoutSession(PRICE_IDS.PREMIUM_MONTHLY)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upgrade to premium'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const manageSubscription = async () => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      await createPortalSession()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to manage subscription'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async () => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setIsLoading(true)
    setError(null)

    try {
      await profiles.update(user.id, {
        isPremium: false,
        generationsLeft: 1 // Reset to free tier
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel subscription'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    isPremium: profile?.isPremium ?? false,
    upgradeToPremium,
    manageSubscription,
    cancelSubscription
  }
} 