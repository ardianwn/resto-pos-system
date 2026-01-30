'use client'

import { useTheme } from '@/context/ThemeContext'
import { tables } from '@/data'
import { calculateTimeDifference, cn, formatCurrency, formatTime, getStatusColor } from '@/lib/utils'
import type { Order } from '@/types'
import { Clock, MoreVertical } from 'lucide-react'

interface RecentOrdersProps {
  orders: Order[]
}

const statusLabels: Record<string, string> = {
  'pending': 'Menunggu',
  'in-progress': 'Diproses',
  'ready': 'Siap Saji',
  'completed': 'Selesai',
  'cancelled': 'Dibatalkan'
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const { isDark } = useTheme()
  
  return (
    <div className={cn('p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className={cn('font-semibold text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Pesanan Terbaru</h3>
        <button className="text-primary-500 text-xs lg:text-sm font-medium hover:text-primary-600">
          Lihat Semua
        </button>
      </div>
      
      <div className="space-y-3 lg:space-y-4">
        {orders.map((order) => {
          const table = tables.find(t => t.id === order.tableId)
          return (
            <div key={order.id} className={cn('flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl', isDark ? 'bg-gray-700/50' : 'bg-gray-50')}>
              <div className={cn('w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0', isDark ? 'bg-primary-500/20' : 'bg-primary-100')}>
                <span className="text-primary-500 font-bold text-sm lg:text-base">M{table?.number}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{order.orderNumber}</p>
                  <span className={`badge ${getStatusColor(order.status)}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className={cn('flex items-center gap-3 mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>
                  <span>{order.items.length} item</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {calculateTimeDifference(order.createdAt)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(order.totalAmount)}</p>
                <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{formatTime(order.createdAt)}</p>
              </div>
              
              <button className={cn('p-1 rounded-lg transition-colors', isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200')}>
                <MoreVertical className={cn('w-5 h-5', isDark ? 'text-gray-400' : 'text-gray-400')} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
