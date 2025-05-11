import { FC } from 'react'

interface BrandIconProps {
  brand?: string
  className?: string
}

const BrandIcons: FC<BrandIconProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className="flex items-center space-x-4">
      <img src="/src/assets/icons/zara-logo.svg" alt="Zara" className={className} />
      <img src="/src/assets/icons/hm-icon.svg" alt="H&M" className={className} />
      <img src="/src/assets/icons/shein-icon.svg" alt="Shein" className={className} />
      <img src="/src/assets/icons/PrettyLittleThing-Icon.png" alt="PrettyLittleThing" className={className} />
    </div>
  )
}

export default BrandIcons 