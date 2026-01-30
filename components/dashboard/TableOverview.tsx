'use client'

import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import type { Table } from '@/types'
import { Users } from 'lucide-react'

interface TableOverviewProps {
  tables: Table[]
}

const statusLabels: Record<string, string> = {
  'available': 'Tersedia',
  'occupied': 'Terisi',
  'reserved': 'Dipesan',
  'cleaning': 'Dibersihkan'
}

export default function TableOverview({ tables }: TableOverviewProps) {
  const { isDark } = useTheme()
  const sections = Array.from(new Set(tables.map(t => t.section)))
  
  const getTableStatusClass = (status: string) => {
    if (isDark) {
      switch (status) {
        case 'available':
          return 'bg-success-500/20 border-success-500/50 text-success-400'
        case 'occupied':
          return 'bg-danger-500/20 border-danger-500/50 text-danger-400'
        case 'reserved':
          return 'bg-primary-500/20 border-primary-500/50 text-primary-400'
        case 'cleaning':
          return 'bg-warning-500/20 border-warning-500/50 text-warning-400'
        default:
          return 'bg-gray-700 border-gray-600 text-gray-400'
      }
    }
    switch (status) {
      case 'available':
        return 'bg-success-50 border-success-200 text-success-600'
      case 'occupied':
        return 'bg-danger-50 border-danger-200 text-danger-600'
      case 'reserved':
        return 'bg-primary-50 border-primary-200 text-primary-600'
      case 'cleaning':
        return 'bg-warning-50 border-warning-200 text-warning-600'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }
  
  return (
    <div className={cn('p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className={cn('font-semibold text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Status Meja</h3>
        <button className="text-primary-500 text-xs lg:text-sm font-medium hover:text-primary-600">
          Lihat Semua
        </button>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 lg:gap-4 mb-4 lg:mb-6">
        {Object.entries(statusLabels).map(([status, label]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={cn('w-3 h-3 rounded-full', {
              'bg-success-500': status === 'available',
              'bg-danger-500': status === 'occupied',
              'bg-primary-500': status === 'reserved',
              'bg-warning-500': status === 'cleaning',
            })} />
            <span className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{label}</span>
          </div>
        ))}
      </div>
      
      {/* Tables by Section */}
      <div className="space-y-4">
        {sections.map(section => (
          <div key={section}>
            <p className={cn('text-xs font-medium uppercase tracking-wider mb-2', isDark ? 'text-gray-500' : 'text-gray-400')}>
              {section}
            </p>
            <div className="flex flex-wrap gap-2">
              {tables
                .filter(t => t.section === section)
                .map(table => (
                  <div
                    key={table.id}
                    className={cn(
                      'w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105',
                      getTableStatusClass(table.status)
                    )}
                  >
                    <span className="font-bold text-sm">{table.number}</span>
                    <div className="flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5" />
                      <span className="text-[10px]">{table.capacity}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
