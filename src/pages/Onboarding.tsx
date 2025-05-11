import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserPreferences {
  height: string
  weight: string
  stylePreferences: string[]
  occasions: string[]
}

const styleOptions = [
  'Casual',
  'Formal',
  'Sporty',
  'Bohemian',
  'Minimalist',
  'Vintage',
  'Streetwear',
  'Business Casual'
]

const occasionOptions = [
  'Date Night',
  'Job Interview',
  'Vacation',
  'Party',
  'Work',
  'Weekend',
  'Special Event',
  'Everyday'
]

const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState<UserPreferences>({
    height: '',
    weight: '',
    stylePreferences: [],
    occasions: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMultiSelect = (type: 'stylePreferences' | 'occasions', value: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would typically save the preferences to Supabase
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold uppercase tracking-widest text-black mb-2">Let's Get to Know You</h2>
        <p className="mt-2 text-lg text-black opacity-60">Help us create your perfect outfits by sharing your preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {step === 1 && (
          <div className="space-y-10 bg-white border border-black rounded-2xl p-10">
            <h3 className="text-2xl font-bold uppercase text-black mb-6">Your Measurements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="height" className="block text-sm font-semibold uppercase text-black mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={preferences.height}
                  onChange={handleInputChange}
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-semibold uppercase text-black mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={preferences.weight}
                  onChange={handleInputChange}
                  className="input-field mt-1"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary w-full mt-10"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 bg-white border border-black rounded-2xl p-10">
            <h3 className="text-2xl font-bold uppercase text-black mb-6">Style Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {styleOptions.map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleMultiSelect('stylePreferences', style)}
                  className={`p-4 border-2 rounded-xl font-semibold uppercase text-black transition-colors duration-200 focus:outline-none ${
                    preferences.stylePreferences.includes(style)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-primary w-full mt-10"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 bg-white border border-black rounded-2xl p-10">
            <h3 className="text-2xl font-bold uppercase text-black mb-6">Occasions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {occasionOptions.map(occasion => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => handleMultiSelect('occasions', occasion)}
                  className={`p-4 border-2 rounded-xl font-semibold uppercase text-black transition-colors duration-200 focus:outline-none ${
                    preferences.occasions.includes(occasion)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {occasion}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-10"
            >
              Complete Setup
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Onboarding 