'use client'

import { useTheme } from '@/context/ThemeContext'
import { sampleOrders, tables } from '@/data'
import { calculateTimeDifference, cn, formatCurrency, formatDate, formatTime } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'
import { CheckCircle, Clock, Eye, MoreVertical, Search, Timer, XCircle } from 'lucide-react'
import { useState } from 'react'

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  pending: { label: 'Menunggu', color: 'bg-warning-50 text-warning-600', icon: Clock },
  'in-progress': { label: 'Diproses', color: 'bg-primary-50 text-primary-600', icon: Timer },
  ready: { label: 'Siap Saji', color: 'bg-success-50 text-success-600', icon: CheckCircle },
  completed: { label: 'Selesai', color: 'bg-gray-100 text-gray-600', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-danger-50 text-danger-600', icon: XCircle },
}

const allOrders: Order[] = [
  ...sampleOrders,
  {
    id: 'ord-4',
    orderNumber: 'ORD-20260129-045',
    tableId: 't-1',
    items: sampleOrders[0].items,
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 60 * 60000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60000),
    totalAmount: 185000,
    paymentMethod: 'qris',
    paidAt: new Date(Date.now() - 2 * 60 * 60000),
  },
  {
    id: 'ord-5',
    orderNumber: 'ORD-20260129-044',
    tableId: 't-6',
    items: sampleOrders[1].items,
    status: 'completed',
    createdAt: new Date(Date.now() - 4 * 60 * 60000),
    updatedAt: new Date(Date.now() - 3.5 * 60 * 60000),
    totalAmount: 320000,
    paymentMethod: 'card',
    paidAt: new Date(Date.now() - 3.5 * 60 * 60000),
  },
  {
    id: 'ord-6',
    orderNumber: 'ORD-20260129-043',
    tableId: 't-9',
    items: sampleOrders[2].items,
    status: 'cancelled',
    createdAt: new Date(Date.now() - 5 * 60 * 60000),
    updatedAt: new Date(Date.now() - 4.8 * 60 * 60000),
    totalAmount: 145000,
  },
]

export default function OrdersManagement() {
  const { isDark } = useTheme()
  const [orders] = useState(allOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })
  
  const orderStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    'in-progress': orders.filter(o => o.status === 'in-progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn('text-xl sm:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Manajemen Pesanan</h1>
          <p className={cn('mt-1 text-sm sm:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Pantau dan kelola semua pesanan restoran</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cn('p-4 flex items-center gap-3 lg:gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-warning-500/20' : 'bg-warning-50')}>
            <Clock className="w-6 h-6 text-warning-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{orderStats.pending}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Menunggu</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-primary-500/20' : 'bg-primary-50')}>
            <Timer className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{orderStats['in-progress']}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Diproses</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-success-500/20' : 'bg-success-50')}>
            <CheckCircle className="w-6 h-6 text-success-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{orderStats.completed}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Selesai</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-danger-500/20' : 'bg-danger-50')}>
            <XCircle className="w-6 h-6 text-danger-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{orderStats.cancelled}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Dibatalkan</p>
          </div>
        </div>
      </div>
      
      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className={cn('flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari nomor pesanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn('bg-transparent outline-none text-sm flex-1 min-w-0', isDark ? 'text-white placeholder-gray-500' : 'text-gray-900')}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
          <button
            onClick={() => setSelectedStatus('all')}
            className={cn(
              'px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              selectedStatus === 'all'
                ? 'bg-primary-500 text-white'
                : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            )}
          >
            Semua
          </button>
          {(['pending', 'in-progress', 'completed', 'cancelled'] as OrderStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={cn(
                'px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                selectedStatus === status
                  ? 'bg-primary-500 text-white'
                  : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {statusConfig[status].label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Orders Table */}
      <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className={cn(isDark ? 'bg-gray-700' : 'bg-gray-50')}>
              <tr>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>No. Pesanan</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Meja</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Item</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Total</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Waktu</th>
                <th className={cn('text-center py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Status</th>
                <th className={cn('text-right py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Aksi</th>
              </tr>
            </thead>
          <tbody className={cn('divide-y', isDark ? 'divide-gray-700' : 'divide-gray-100')}>
            {filteredOrders.map(order => {
              const table = tables.find(t => t.id === order.tableId)
              const config = statusConfig[order.status]
              const StatusIcon = config.icon
              
              return (
                <tr key={order.id} className={cn('transition-colors', isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50')}>
                  <td className="py-4 px-6">
                    <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{order.orderNumber}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', isDark ? 'bg-primary-500/20' : 'bg-primary-50')}>
                        <span className="text-primary-600 font-bold text-sm">{table?.number}</span>
                      </div>
                      <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{table?.section}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn(isDark ? 'text-white' : 'text-gray-900')}>{order.items.length} item</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(order.totalAmount)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className={cn('text-sm', isDark ? 'text-white' : 'text-gray-900')}>{formatTime(order.createdAt)}</p>
                      <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>{calculateTimeDifference(order.createdAt)} lalu</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <span className={cn('badge flex items-center gap-1', config.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className={cn('p-2 text-gray-400 hover:text-primary-500 rounded-lg transition-colors', isDark ? 'hover:bg-primary-500/20' : 'hover:bg-primary-50')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className={cn('p-2 text-gray-400 rounded-lg transition-colors', isDark ? 'hover:text-gray-200 hover:bg-gray-700' : 'hover:text-gray-600 hover:bg-gray-100')}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
      
      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={cn('rounded-2xl p-6 w-[500px] max-w-full mx-4 max-h-[90vh] overflow-y-auto', isDark ? 'bg-gray-800' : 'bg-white')}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>{selectedOrder.orderNumber}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className={cn('p-1 rounded-lg', isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}
              >
                <XCircle className={cn('w-5 h-5', isDark ? 'text-gray-400' : 'text-gray-500')} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={cn(isDark ? 'text-gray-400' : 'text-gray-500')}>Status</span>
                <span className={cn('badge', statusConfig[selectedOrder.status].color)}>
                  {statusConfig[selectedOrder.status].label}
                </span>
              </div>
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={cn(isDark ? 'text-gray-400' : 'text-gray-500')}>Meja</span>
                <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>
                  Meja {tables.find(t => t.id === selectedOrder.tableId)?.number}
                </span>
              </div>
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={cn(isDark ? 'text-gray-400' : 'text-gray-500')}>Waktu Pesan</span>
                <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{formatDate(selectedOrder.createdAt)} {formatTime(selectedOrder.createdAt)}</span>
              </div>
              
              <div className="pt-4">
                <p className={cn('text-sm font-medium mb-3', isDark ? 'text-gray-300' : 'text-gray-700')}>Detail Pesanan</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className={cn('flex items-center justify-between p-3 rounded-xl', isDark ? 'bg-gray-700' : 'bg-gray-50')}>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{item.menuItem.name}</p>
                          <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.quantity}x {formatCurrency(item.menuItem.price)}</p>
                        </div>
                      </div>
                      <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(item.quantity * item.menuItem.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={cn('pt-4 border-t', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <div className="flex items-center justify-between text-lg">
                  <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>Total</span>
                  <span className="font-bold text-primary-500">{formatCurrency(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
