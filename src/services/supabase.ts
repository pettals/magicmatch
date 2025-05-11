import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserProfile {
  id: string
  height: number
  weight: number
  stylePreferences: string[]
  occasions: string[]
  generationsLeft: number
  isPremium: boolean
}

export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },
}

export const profiles = {
  create: async (userId: string, profile: Omit<UserProfile, 'id'>) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profile }])
      .select()
      .single()
    if (error) throw error
    return data
  },

  get: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data as UserProfile
  },

  update: async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

export const outfits = {
  create: async (userId: string, outfit: {
    image: string
    description: string
    occasion: string
    retailers: { name: string; url: string }[]
  }) => {
    const { data, error } = await supabase
      .from('outfits')
      .insert([{ user_id: userId, ...outfit }])
      .select()
      .single()
    if (error) throw error
    return data
  },

  list: async (userId: string) => {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  toggleFavorite: async (outfitId: string, isFavorite: boolean) => {
    const { data, error } = await supabase
      .from('outfits')
      .update({ is_favorite: isFavorite })
      .eq('id', outfitId)
      .select()
      .single()
    if (error) throw error
    return data
  },
} 