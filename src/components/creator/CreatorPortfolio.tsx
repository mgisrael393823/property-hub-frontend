
import { useState } from "react"
import { GalleryHorizontal } from "lucide-react"

interface PortfolioItem {
  id: string
  imageUrl: string
  title: string
  type: string
}

interface CreatorPortfolioProps {
  items: PortfolioItem[]
}

export function CreatorPortfolio({ items }: CreatorPortfolioProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-white mb-4 font-jakarta flex items-center gap-2">
        <GalleryHorizontal className="h-5 w-5" />
        Portfolio
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group aspect-video overflow-hidden rounded-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-center">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-300">{item.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
