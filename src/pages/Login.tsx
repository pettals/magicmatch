import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../services/supabase'

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In or Sign Up</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
        />
      </div>
    </div>
  )
}

export default Login 