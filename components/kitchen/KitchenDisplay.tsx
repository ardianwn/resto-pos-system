'use client'

import { useTheme } from '@/context/ThemeContext'
import { calculateTimeDifference, cn } from '@/lib/utils'
import { AlertCircle, Bell, CheckCircle, ChefHat, Clock, Timer } from 'lucide-react'
import { useState } from 'react'

type ItemStatus = 'pending' | 'cooking' | 'ready'
type OrderPriority = 'normal' | 'high'

interface KitchenOrderItem {
  name: string
  quantity: number
  notes: string
  status: ItemStatus
}

interface KitchenOrder {
  id: string
  orderNumber: string
  tableNumber: number
  items: KitchenOrderItem[]
  createdAt: Date
  priority: OrderPriority
}

const kitchenOrders: KitchenOrder[] = [
  {
    id: 'k-1',
    orderNumber: 'ORD-20260130-001',
    tableNumber: 2,
    items: [
      { name: 'Nasi Goreng Spesial', quantity: 2, notes: 'Pedas level 2', status: 'cooking' as const },
      { name: 'Es Teh Manis', quantity: 2, notes: '', status: 'ready' as const },
    ],
    createdAt: new Date(Date.now() - 25 * 60000),
    priority: 'normal' as const
  },
  {
    id: 'k-2',
    orderNumber: 'ORD-20260130-002',
    tableNumber: 4,
    items: [
      { name: 'Ayam Bakar Madu', quantity: 3, notes: 'Tanpa sambal', status: 'cooking' as const },
      { name: 'Rendang Sapi', quantity: 1, notes: '', status: 'pending' as const },
      { name: 'Es Jeruk Segar', quantity: 4, notes: '', status: 'ready' as const },
    ],
    createdAt: new Date(Date.now() - 15 * 60000),
    priority: 'high' as const
  },
  {
    id: 'k-3',
    orderNumber: 'ORD-20260130-003',
    tableNumber: 10,
    items: [
      { name: 'Ikan Bakar Sambal', quantity: 2, notes: 'Extra sambal matah', status: 'pending' as const },
      { name: 'Lumpia Goreng', quantity: 3, notes: '', status: 'cooking' as const },
      { name: 'Kopi Susu', quantity: 2, notes: 'Gula dipisah', status: 'pending' as const },
    ],
    createdAt: new Date(Date.now() - 8 * 60000),
    priority: 'normal' as const
  },
  {
    id: 'k-4',
    orderNumber: 'ORD-20260130-004',
    tableNumber: 7,
    items: [
      { name: 'Mie Goreng Seafood', quantity: 2, notes: '', status: 'pending' as const },
      { name: 'Sate Lilit Bali', quantity: 4, notes: '', status: 'pending' as const },
    ],
    createdAt: new Date(Date.now() - 3 * 60000),
    priority: 'normal' as const
  },
]

export default function KitchenDisplay() {
  const { isDark } = useTheme()
  const [orders, setOrders] = useState(kitchenOrders)
  
  const updateItemStatus = (orderId: string, itemIndex: number, newStatus: 'pending' | 'cooking' | 'ready') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const newItems = [...order.items]
        newItems[itemIndex] = { ...newItems[itemIndex], status: newStatus }
        return { ...order, items: newItems }
      }
      return order
    }))
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'cooking':
        return <ChefHat className="w-4 h-4" />
      case 'ready':
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-500 text-white'
      case 'cooking':
        return 'bg-primary-500 text-white animate-pulse'
      case 'ready':
        return 'bg-success-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }
  
  const getTimeClass = (createdAt: Date) => {
    const diffMins = Math.floor((Date.now() - createdAt.getTime()) / 60000)
    if (diffMins >= 20) return 'text-danger-400'
    if (diffMins >= 15) return 'text-warning-400'
    return isDark ? 'text-gray-400' : 'text-gray-500'
  }
  
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={cn('text-xl lg:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Kitchen Display</h1>
          <p className={cn('mt-1 text-sm lg:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Pantau dan kelola pesanan dapur secara real-time</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
          <div className={cn('flex items-center justify-center gap-2', isDark ? 'text-gray-400' : 'text-gray-500')}>
            <Timer className="w-5 h-5" />
            <span className="text-sm">Auto-refresh: 30s</span>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            Notifikasi
          </button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning-500"></div>
          <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Menunggu</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
          <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Dimasak</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500"></div>
          <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Siap Saji</span>
        </div>
      </div>
      
      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {orders.map((order) => {
          const allReady = order.items.every(item => item.status === 'ready')
          const hasPending = order.items.some(item => item.status === 'pending')
          
          return (
            <div 
              key={order.id}
              className={cn(
                'rounded-2xl overflow-hidden',
                allReady ? 'bg-success-500/20 border-2 border-success-500' :
                order.priority === 'high' ? (isDark ? 'bg-gray-800 border-2 border-danger-500' : 'bg-white border-2 border-danger-500') :
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              )}
            >
              {/* Order Header */}
              <div className={cn(
                'px-4 py-3 flex items-center justify-between',
                order.priority === 'high' && !allReady ? 'bg-danger-500/20' : (isDark ? 'bg-gray-700/50' : 'bg-gray-50')
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', isDark ? 'bg-white/10' : 'bg-primary-100')}>
                    <span className={cn('font-bold', isDark ? 'text-white' : 'text-primary-600')}>M{order.tableNumber}</span>
                  </div>
                  <div>
                    <p className={cn('font-medium text-sm', isDark ? 'text-white' : 'text-gray-900')}>{order.orderNumber}</p>
                    <div className={cn('flex items-center gap-1 text-xs', getTimeClass(order.createdAt))}>
                      <Clock className="w-3 h-3" />
                      {calculateTimeDifference(order.createdAt)}
                    </div>
                  </div>
                </div>
                {order.priority === 'high' && !allReady && (
                  <div className="flex items-center gap-1 bg-danger-500 text-white text-xs px-2 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    Prioritas
                  </div>
                )}
                {allReady && (
                  <button className="bg-success-500 hover:bg-success-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors">
                    Selesai
                  </button>
                )}
              </div>
              
              {/* Order Items */}
              <div className="p-4 space-y-3">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className={cn(
                      'p-3 rounded-xl transition-all',
                      item.status === 'ready' ? 'bg-success-500/10' :
                      item.status === 'cooking' ? 'bg-primary-500/10' :
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={cn('font-medium text-lg', isDark ? 'text-white' : 'text-gray-900')}>{item.quantity}x</span>
                          <span className={cn('font-medium truncate', isDark ? 'text-white' : 'text-gray-900')}>{item.name}</span>
                        </div>
                        {item.notes && (
                          <p className="text-yellow-500 text-xs mt-1 italic">Catatan: {item.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const nextStatus = item.status === 'pending' ? 'cooking' :
                                            item.status === 'cooking' ? 'ready' : 'pending'
                          updateItemStatus(order.id, index, nextStatus)
                        }}
                        className={cn(
                          'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                          getStatusClass(item.status)
                        )}
                      >
                        {getStatusIcon(item.status)}
                        {item.status === 'pending' ? 'Mulai' :
                         item.status === 'cooking' ? 'Siap' : 'Selesai'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Empty State */}
      {orders.length === 0 && (
        <div className={cn('flex flex-col items-center justify-center py-20', isDark ? 'text-gray-400' : 'text-gray-500')}>
          <ChefHat className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-medium">Tidak ada pesanan</p>
          <p className="text-sm mt-1">Semua pesanan telah selesai diproses</p>
        </div>
      )}
    </div>
  )
}
