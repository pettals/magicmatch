import { ShoppingBagIcon } from '@heroicons/react/24/outline'

interface BrandIconProps {
  brand: 'zara' | 'hm' | 'plt' | 'shein'
  className?: string
}

const BrandIcons = ({ brand, className = 'h-6 w-6' }: BrandIconProps) => {
  // For now, we'll use a generic shopping bag icon for all brands
  return (
    <ShoppingBagIcon className={className} />
  )
}

export default BrandIcons 