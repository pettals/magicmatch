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

    if (profile.generationsLeft <= 0 && !profile.isPremium) {
      throw new Error('No generations left. Please upgrade to premium.')
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Generate outfit using OpenAI
      const { image, description } = await generateOutfit(params)

      // Get retailer suggestions
      const retailerSuggestions = await suggestRetailers(description)

      // Parse retailer suggestions into structured data
      const retailers = parseRetailerSuggestions(retailerSuggestions)

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

  const parseRetailerSuggestions = (suggestions: string) => {
    // This is a simplified parser. In a real app, you'd want more robust parsing
    const retailers: { name: string; url: string }[] = []
    
    // Split by newlines and look for retailer names and URLs
    const lines = suggestions.split('\n')
    for (const line of lines) {
      const urlMatch = line.match(/https?:\/\/[^\s]+/)
      if (urlMatch) {
        const url = urlMatch[0]
        const name = line.split(':')[0].trim()
        retailers.push({ name, url })
      }
    }

    return retailers
  }

  return {
    isGenerating,
    error,
    generatedOutfit,
    generate,
    canGenerate: profile?.generationsLeft > 0 || profile?.isPremium
  }
} 