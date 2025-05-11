import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  isAuthenticated: boolean
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-black shadow-none">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold uppercase tracking-widest text-black">
              MagicMatch
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="font-semibold uppercase text-black hover:text-white hover:bg-black px-4 py-2 rounded-full transition-colors duration-200">
                  Dashboard
                </Link>
                <Link to="/generate" className="btn-primary">
                  Generate Outfit
                </Link>
              </>
            ) : (
              <>
                <Link to="/onboarding" className="font-semibold uppercase text-black hover:text-white hover:bg-black px-4 py-2 rounded-full transition-colors duration-200">
                  Get Started
                </Link>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-white hover:bg-black p-2 rounded-full transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 font-semibold uppercase text-black hover:text-white hover:bg-black rounded-full transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/generate"
                  className="block px-3 py-2 font-semibold uppercase text-black hover:text-white hover:bg-black rounded-full transition-colors duration-200"
                >
                  Generate Outfit
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/onboarding"
                  className="block px-3 py-2 font-semibold uppercase text-black hover:text-white hover:bg-black rounded-full transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 font-semibold uppercase text-black hover:text-white hover:bg-black rounded-full transition-colors duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 