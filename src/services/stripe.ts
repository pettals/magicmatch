import { loadStripe } from '@stripe/stripe-js'

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key')
}

export const stripePromise = loadStripe(stripePublicKey)

export const createCheckoutSession = async (priceId: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
      }),
    })

    const session = await response.json()

    // Redirect to Stripe Checkout
    const stripe = await stripePromise
    if (!stripe) throw new Error('Stripe failed to load')
    
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export const createPortalSession = async () => {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
    })

    const session = await response.json()

    // Redirect to Stripe Customer Portal
    window.location.href = session.url
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

export const PRICE_IDS = {
  PREMIUM_MONTHLY: 'price_xxx', // Replace with your actual Stripe price ID
} 