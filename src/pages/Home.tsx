import { Link } from 'react-router-dom'
import { SparklesIcon, UserGroupIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import BrandIcons from '../components/BrandIcons'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-[60vh] text-white text-center px-4 sm:px-6 lg:px-8 overflow-hidden w-full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 uppercase">
            <span className="block">This is</span>
            <span className="block italic">MagicMatch</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-2xl font-light mb-8 opacity-90">
            AI-powered fashion styling. Editorial looks. Personalized for you.
          </p>
          <Link
            to="/onboarding"
            className="inline-block px-10 py-4 border border-white text-white font-semibold rounded-full uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight uppercase text-black">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="border border-black rounded-2xl p-8 flex flex-col items-center bg-white shadow-sm">
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">Free</h3>
              <p className="text-5xl font-extrabold mb-2 text-black">$0</p>
              <p className="mb-6 text-lg text-gray-700">1 outfit generation credit per month</p>
              <ul className="mb-8 space-y-2 text-gray-700 text-center">
                <li>AI-powered outfit suggestions</li>
                <li>Personalized styling tips</li>
                <li>Access to basic features</li>
              </ul>
              <Link
                to="/onboarding"
                className="inline-block px-8 py-3 border border-black text-black font-semibold rounded-full uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
            {/* Premium Plan */}
            <div className="border border-black rounded-2xl p-8 flex flex-col items-center bg-black text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">Premium</h3>
              <p className="text-5xl font-extrabold mb-2 text-white">$2.99</p>
              <p className="mb-6 text-lg text-gray-200">10 outfit generations per month</p>
              <ul className="mb-8 space-y-2 text-gray-200 text-center">
                <li>All Free features</li>
                <li>Priority AI access</li>
                <li>Early access to new styles</li>
              </ul>
              <Link
                to="/onboarding"
                className="inline-block px-8 py-3 border border-white text-white font-semibold rounded-full uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base font-semibold tracking-widest uppercase text-black">Features</h2>
            <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-black">
              Fashion, Personalized
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white mb-6">
                <SparklesIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase">AI-Powered</h3>
              <p className="text-gray-700">Get personalized outfit recommendations based on your unique style and preferences.</p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white mb-6">
                <UserGroupIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase">Personalized</h3>
              <p className="text-gray-700">Input your measurements and style preferences for truly customized suggestions.</p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white mb-6">
                <ShoppingBagIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase">Shop the Look</h3>
              <p className="text-gray-700 mb-6">Find and purchase the exact items from our trusted retail partners.</p>
              <div className="flex items-center justify-center gap-6 mt-2">
                <BrandIcons brand="zara" className="w-12 h-12" />
                <BrandIcons brand="hm" className="w-12 h-12" />
                <BrandIcons brand="plt" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retail Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-black uppercase">Shop Your Style</h2>
            <p className="mt-4 text-lg text-gray-600">Find your perfect look from our trusted retail partners</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <BrandIcons brand="zara" className="w-24 h-24" />
            <BrandIcons brand="hm" className="w-24 h-24" />
            <BrandIcons brand="plt" className="w-24 h-24" />
            <BrandIcons brand="shein" className="w-24 h-24" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home 