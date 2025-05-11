import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export interface OutfitGenerationParams {
  style: string
  occasion: string
  color: string
  gender: string
  budget: string
}

export const generateOutfit = async (params: OutfitGenerationParams) => {
  if (!process.env.REACT_APP_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured')
  }

  try {
    // Generate outfit description using GPT-4
    const descriptionResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert. Generate a detailed outfit description based on the given parameters.'
        },
        {
          role: 'user',
          content: `Create a ${params.style} outfit for a ${params.occasion} occasion. 
                   The outfit should be ${params.color} themed and suitable for ${params.gender}.
                   Budget range: ${params.budget}.
                   Include specific details about each clothing item.`
        }
      ]
    })

    const outfitDescription = descriptionResponse.choices[0]?.message?.content || ''

    // Generate outfit image using DALL-E 3
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `A high-quality fashion photograph of a ${params.style} outfit for ${params.occasion}. 
               The outfit should be ${params.color} themed and suitable for ${params.gender}.
               Style: Photorealistic, professional fashion photography.
               Composition: Full body shot, neutral background, well-lit.
               Focus on the clothing details and overall aesthetic.`,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural'
    })

    const imageUrl = imageResponse.data?.[0]?.url
    if (!imageUrl) {
      throw new Error('Failed to generate outfit image')
    }

    // Get retailer suggestions
    const retailerResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert. Suggest specific retailers where the user can find similar items.'
        },
        {
          role: 'user',
          content: `Based on this outfit description: "${outfitDescription}"
                   Suggest 3-4 specific retailers where someone could find similar items.
                   For each retailer, include:
                   1. The retailer name
                   2. Why they're a good match
                   3. Price range
                   Format the response as a JSON array of objects with 'name', 'reason', and 'priceRange' properties.`
        }
      ]
    })

    const retailersText = retailerResponse.choices[0]?.message?.content || '[]'
    const retailers = JSON.parse(retailersText)

    return {
      description: outfitDescription,
      image: imageUrl,
      retailers
    }
  } catch (error) {
    console.error('Error generating outfit:', error)
    throw error
  }
}

export const suggestRetailers = async (description: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a fashion expert. Suggest retailers where the user can find similar items to the outfit described.'
        },
        {
          role: 'user',
          content: `For this outfit: ${description}, suggest 3-5 retailers where I can find similar items. Format each suggestion as "Retailer Name: URL"`
        }
      ]
    })

    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error suggesting retailers:', error)
    throw error
  }
} 