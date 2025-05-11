import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import BrandIcons from '../components/BrandIcons'

interface Retailer {
  name: string
  brand: 'zara' | 'hm' | 'plt' | 'shein'
  url: string
}

interface GeneratedOutfit {
  id: string
  image: string
  description: string
  retailers: Retailer[]
}

const retailers: Retailer[] = [
  {
    name: 'Zara',
    brand: 'zara',
    url: 'https://www.zara.com'
  },
  {
    name: 'H&M',
    brand: 'hm',
    url: 'https://www.hm.com'
  },
  {
    name: 'PLT',
    brand: 'plt',
    url: 'https://www.prettylittlething.com'
  },
  {
    name: 'Shein',
    brand: 'shein',
    url: 'https://www.shein.com'
  }
]

const OutfitGenerator = () => {
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedOccasion, setSelectedOccasion] = useState('')
  const [generatedOutfit, setGeneratedOutfit] = useState<GeneratedOutfit | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Here we would typically call the OpenAI API
    // For now, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setGeneratedOutfit({
      id: '1',
      image: 'https://via.placeholder.com/600x800',
      description: 'A sophisticated business casual outfit featuring a tailored blazer, crisp white shirt, and dark-wash jeans. Perfect for a professional setting while maintaining comfort and style.',
      retailers
    })
    setIsGenerating(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Generate Your Outfit</h1>
        <p className="mt-2 text-gray-600">
          Let AI create the perfect outfit for your occasion
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
            Select Occasion
          </label>
          <select
            id="occasion"
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="input-field mt-1"
          >
            <option value="">Choose an occasion</option>
            <option value="work">Work</option>
            <option value="date">Date Night</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal Event</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedOccasion || isGenerating}
          className={`btn-primary w-full flex items-center justify-center ${
            (!selectedOccasion || isGenerating) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <SparklesIcon className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Generate Outfit
            </>
          )}
        </button>

        {generatedOutfit && (
          <div className="mt-8">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={generatedOutfit.image}
                alt="Generated outfit"
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Outfit Description</h3>
              <p className="mt-2 text-gray-600">{generatedOutfit.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Shop the Look</h3>
              <div className="mt-4 flex space-x-4">
                {generatedOutfit.retailers.map(retailer => (
                  <a
                    key={retailer.name}
                    href={retailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                  >
                    <BrandIcons brand={retailer.brand} className="w-8 h-8" />
                    <span className="text-sm font-medium text-gray-700">
                      {retailer.name}
                    </span>
                    <ShoppingBagIcon className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Save to Dashboard
              </button>
              <button
                onClick={handleGenerate}
                className="btn-primary"
              >
                Generate Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutfitGenerator 