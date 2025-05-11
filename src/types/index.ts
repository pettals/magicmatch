export interface User {
  id: string
  email: string
  created_at: string
}

export interface UserProfile {
  id: string
  height: number
  weight: number
  stylePreferences: string[]
  occasions: string[]
  generationsLeft: number
  isPremium: boolean
  created_at: string
  updated_at: string
}

export interface Outfit {
  id: string
  user_id: string
  image: string
  description: string
  occasion: string
  retailers: Retailer[]
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface Retailer {
  name: string
  logo: string
  url: string
}

export interface OutfitGenerationParams {
  occasion: string
  stylePreferences: string[]
  height: number
  weight: number
}

export interface GeneratedOutfit {
  image: string
  description: string
  retailers: Retailer[]
}

export type StylePreference =
  | 'Casual'
  | 'Formal'
  | 'Sporty'
  | 'Bohemian'
  | 'Minimalist'
  | 'Vintage'
  | 'Streetwear'
  | 'Business Casual'

export type Occasion =
  | 'Date Night'
  | 'Job Interview'
  | 'Vacation'
  | 'Party'
  | 'Work'
  | 'Weekend'
  | 'Special Event'
  | 'Everyday' 