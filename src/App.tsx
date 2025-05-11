import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import OutfitGenerator from './pages/OutfitGenerator'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={!!user} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <OutfitGenerator />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App 