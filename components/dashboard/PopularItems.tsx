'use client'

import { useTheme } from '@/context/ThemeContext'
import { menuItems } from '@/data'
import { cn } from '@/lib/utils'

const popularItems = [
  { item: menuItems[3], sold: 45 }, // Nasi Goreng
  { item: menuItems[4], sold: 38 }, // Ayam Bakar
  { item: menuItems[5], sold: 32 }, // Rendang
  { item: menuItems[17], sold: 28 }, // Kopi Susu
  { item: menuItems[6], sold: 25 }, // Ikan Bakar
]

export default function PopularItems() {
  const { isDark } = useTheme()
  const maxSold = Math.max(...popularItems.map(p => p.sold))
  
  return (
    <div className={cn('p-4 lg:p-6 h-full rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
      <h3 className={cn('font-semibold mb-4 lg:mb-6 text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Menu Terlaris Hari Ini</h3>
      
      <div className="space-y-3 lg:space-y-4">
        {popularItems.map((popular, index) => (
          <div key={popular.item.id} className="flex items-center gap-3">
            <span className={cn('text-sm font-medium w-5', isDark ? 'text-gray-500' : 'text-gray-400')}>
              #{index + 1}
            </span>
            <img 
              src={popular.item.image}
              alt={popular.item.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-medium truncate', isDark ? 'text-white' : 'text-gray-900')}>
                {popular.item.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className={cn('flex-1 h-1.5 rounded-full overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-100')}>
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${(popular.sold / maxSold) * 100}%` }}
                  />
                </div>
                <span className={cn('text-xs whitespace-nowrap', isDark ? 'text-gray-400' : 'text-gray-500')}>
                  {popular.sold} terjual
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={cn('mt-6 pt-4 border-t', isDark ? 'border-gray-700' : 'border-gray-100')}>
        <div className="flex items-center justify-between text-sm">
          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Terjual</span>
          <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>168 item</span>
        </div>
      </div>
    </div>
  )
}
