import OpenAI from 'openai'

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!openaiApiKey) {
  throw new Error('Missing OpenAI API key')
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true
})

export interface OutfitGenerationParams {
  occasion: string
  stylePreferences: string[]
  height: number
  weight: number
}

export const generateOutfit = async (params: OutfitGenerationParams) => {
  try {
    // Generate outfit description using GPT-4
    const descriptionResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a fashion expert. Generate a detailed outfit description based on the user's preferences and measurements."
        },
        {
          role: "user",
          content: `Create an outfit for a ${params.occasion} occasion. 
            Style preferences: ${params.stylePreferences.join(', ')}.
            Height: ${params.height}cm, Weight: ${params.weight}kg.
            Include specific details about colors, fabrics, and styling tips.`
        }
      ]
    })

    const outfitDescription = descriptionResponse.choices[0].message.content

    // Generate outfit image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a high-quality fashion photograph of a person wearing: ${outfitDescription}. 
        The image should be well-lit, professional, and showcase the outfit clearly. 
        The person should be shown from head to toe.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    })

    return {
      description: outfitDescription,
      image: imageResponse.data[0].url
    }
  } catch (error) {
    console.error('Error generating outfit:', error)
    throw error
  }
}

export const suggestRetailers = async (outfitDescription: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a fashion expert. Suggest specific retailers and products that match the outfit description."
        },
        {
          role: "user",
          content: `For this outfit: ${outfitDescription}, suggest specific retailers and products that would match this look. 
            Include direct links to the products if possible.`
        }
      ]
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error suggesting retailers:', error)
    throw error
  }
} 