export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const calculateBMI = (height: number, weight: number) => {
  // Height in meters, weight in kg
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

export const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export const getStyleTips = (stylePreference: string) => {
  const tips: Record<string, string[]> = {
    'Casual': [
      'Focus on comfortable, everyday pieces',
      'Layer with denim and basic tees',
      'Add personality with accessories'
    ],
    'Formal': [
      'Invest in well-tailored pieces',
      'Stick to classic colors and patterns',
      'Pay attention to fit and finish'
    ],
    'Sporty': [
      'Choose performance fabrics',
      'Mix athletic and casual pieces',
      'Keep it functional and comfortable'
    ],
    'Bohemian': [
      'Embrace flowing fabrics and patterns',
      'Layer with natural materials',
      'Add unique accessories and jewelry'
    ],
    'Minimalist': [
      'Focus on quality over quantity',
      'Stick to a neutral color palette',
      'Choose clean lines and simple silhouettes'
    ],
    'Vintage': [
      'Mix eras for a unique look',
      'Look for quality second-hand pieces',
      'Add modern touches to classic styles'
    ],
    'Streetwear': [
      'Mix high and low fashion',
      'Experiment with bold graphics',
      'Layer with statement pieces'
    ],
    'Business Casual': [
      'Balance professional and comfortable pieces',
      'Add personality with accessories',
      'Keep it polished but relaxed'
    ]
  }

  return tips[stylePreference] || []
}

export const getOccasionTips = (occasion: string) => {
  const tips: Record<string, string[]> = {
    'Date Night': [
      'Choose something that makes you feel confident',
      'Consider the venue and weather',
      'Add a special touch with accessories'
    ],
    'Job Interview': [
      'Research the company dress code',
      'Keep it professional and polished',
      'Choose comfortable, well-fitted pieces'
    ],
    'Vacation': [
      'Pack versatile, mix-and-match pieces',
      'Consider the climate and activities',
      'Don\'t forget comfortable shoes'
    ],
    'Party': [
      'Make a statement with your outfit',
      'Consider the party theme',
      'Balance style with comfort'
    ],
    'Work': [
      'Follow company dress code',
      'Choose comfortable, professional pieces',
      'Layer for changing temperatures'
    ],
    'Weekend': [
      'Focus on comfort and style',
      'Choose easy-to-wear pieces',
      'Add personality with accessories'
    ],
    'Special Event': [
      'Consider the event dress code',
      'Choose something memorable',
      'Pay attention to details'
    ],
    'Everyday': [
      'Focus on comfort and versatility',
      'Choose easy-to-wear pieces',
      'Build a capsule wardrobe'
    ]
  }

  return tips[occasion] || []
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password: string) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
} 