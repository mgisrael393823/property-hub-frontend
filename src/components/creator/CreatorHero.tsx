
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatorHeroProps {
  name: string
  rating: number
  location: string
  services: string[]
  avatarUrl: string
  bannerUrl?: string
}

export function CreatorHero({
  name,
  rating,
  location,
  services,
  avatarUrl,
  bannerUrl,
}: CreatorHeroProps) {
  return (
    <div className="relative">
      <div 
        className="h-64 w-full bg-gradient-to-r from-brand-purple/20 to-brand-dark"
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Avatar className="h-24 w-24 ring-4 ring-white">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white truncate">{name}</h1>
              <div className="flex items-center mt-1.5">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-200">{rating}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-200">{location}</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-brand-purple/10 text-brand-purple"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
