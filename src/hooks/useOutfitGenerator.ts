import { useState } from 'react'
import { generateOutfit, suggestRetailers, OutfitGenerationParams } from '../services/openai'
import { outfits } from '../services/supabase'
import { useAuth } from './useAuth'

export const useOutfitGenerator = () => {
  const { user, profile } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedOutfit, setGeneratedOutfit] = useState<{
    image: string
    description: string
    retailers: { name: string; url: string }[]
  } | null>(null)

  const generate = async (params: OutfitGenerationParams) => {
    if (!user || !profile) {
      throw new Error('User must be authenticated')
    }

    if ((profile.generationsLeft ?? 0) <= 0 && !profile.isPremium) {
      throw new Error('No generations left. Please upgrade to premium.')
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate outfit using OpenAI
      const { image, description } = await generateOutfit(params)

      if (!image || !description) {
        throw new Error('Failed to generate outfit')
      }

      // Get retailer suggestions
      const retailerSuggestions = await suggestRetailers(description)

      // Parse retailer suggestions into structured data
      const retailers = parseRetailerSuggestions(retailerSuggestions || '')

      const outfit = {
        image,
        description,
        retailers
      }

      // Save to database
      await outfits.create(user.id, {
        image,
        description,
        occasion: params.occasion,
        retailers
      })

      setGeneratedOutfit(outfit)
      return outfit
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate outfit'
      setError(errorMessage)
      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  const parseRetailerSuggestions = (suggestions: string): { name: string; url: string }[] => {
    // Basic implementation - you might want to enhance this
    return suggestions.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [name, url] = line.split(':').map(s => s.trim())
        return { name, url: url || '#' }
      })
  }

  return {
    isGenerating,
    error,
    generatedOutfit,
    generate,
    canGenerate: (profile?.generationsLeft ?? 0) > 0 || profile?.isPremium
  }
} 