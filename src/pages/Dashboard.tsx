import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Outfit {
  id: string
  image: string
  description: string
  occasion: string
  date: string
  isFavorite: boolean
}

const Dashboard = () => {
  const [outfits] = useState<Outfit[]>([
    {
      id: '1',
      image: 'https://via.placeholder.com/300x400',
      description: 'Casual summer outfit with light denim and white sneakers',
      occasion: 'Weekend',
      date: '2024-02-20',
      isFavorite: true
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/300x400',
      description: 'Business casual look with navy blazer and khaki pants',
      occasion: 'Work',
      date: '2024-02-19',
      isFavorite: false
    }
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-black">Dashboard</h1>
        <Link
          to="/generate"
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Generate New Outfit
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white border border-black rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
            <ClockIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase text-black mb-1">Outfits Generated</p>
          <p className="text-3xl font-extrabold text-black">12</p>
        </div>
        <div className="bg-white border border-black rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
            <HeartIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase text-black mb-1">Favorites</p>
          <p className="text-3xl font-extrabold text-black">5</p>
        </div>
        <div className="bg-white border border-black rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-black text-white mb-4">
            <PlusIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase text-black mb-1">Generations Left</p>
          <p className="text-3xl font-extrabold text-black">8</p>
        </div>
      </div>

      {/* Recent Outfits */}
      <div className="bg-white border border-black rounded-2xl shadow-sm">
        <div className="px-8 py-6 border-b border-black">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-black">Recent Outfits</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {outfits.map(outfit => (
            <div key={outfit.id} className="bg-white border border-black rounded-xl overflow-hidden flex flex-col shadow-sm">
              <img
                src={outfit.image}
                alt={outfit.description}
                className="w-full h-72 object-cover border-b border-black"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-black opacity-60">{outfit.occasion}</p>
                    <p className="mt-1 text-xs text-black opacity-40">{outfit.date}</p>
                  </div>
                  <button
                    className={`p-2 rounded-full border border-black ${
                      outfit.isFavorite
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-black hover:text-white'
                    } transition-colors duration-200`}
                  >
                    <HeartIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-base text-black mb-4">{outfit.description}</p>
                <button className="btn-secondary w-full mt-auto">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 