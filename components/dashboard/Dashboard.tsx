'use client'

import { useTheme } from '@/context/ThemeContext'
import { dailySalesData, sampleOrders, tables } from '@/data'
import { cn, formatCurrency } from '@/lib/utils'
import {
    ArrowDownRight,
    ArrowUpRight,
    ChefHat,
    Clock,
    DollarSign,
    ShoppingBag,
    TrendingUp,
    Users
} from 'lucide-react'
import PopularItems from './PopularItems'
import RecentOrders from './RecentOrders'
import RevenueChart from './RevenueChart'
import TableOverview from './TableOverview'

const stats = [
  {
    label: 'Pendapatan Hari Ini',
    value: formatCurrency(3250000),
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-success-500'
  },
  {
    label: 'Total Pesanan',
    value: '32',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-primary-500'
  },
  {
    label: 'Rata-rata Transaksi',
    value: formatCurrency(101563),
    change: '-2.1%',
    trend: 'down',
    icon: TrendingUp,
    color: 'bg-warning-500'
  },
  {
    label: 'Pelanggan Hari Ini',
    value: '48',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  }
]

export default function Dashboard() {
  const { isDark } = useTheme()
  const occupiedTables = tables.filter(t => t.status === 'occupied').length
  const activeOrders = sampleOrders.filter(o => o.status !== 'completed').length
  
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={cn('text-xl sm:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Dashboard</h1>
        <p className={cn('mt-1 text-sm sm:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Selamat datang kembali! Berikut ringkasan restoran hari ini.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={cn('p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
            <div className="flex items-start justify-between">
              <div>
                <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{stat.label}</p>
                <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-success-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-danger-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-success-500' : 'text-danger-500'}>
                    {stat.change}
                  </span>
                  <span className={cn('text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>vs kemarin</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className={cn('p-4 lg:p-6 flex items-center gap-3 lg:gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('p-3 rounded-xl', isDark ? 'bg-primary-500/20' : 'bg-primary-50')}>
            <Clock className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Pesanan Aktif</p>
            <p className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{activeOrders} pesanan</p>
          </div>
        </div>
        
        <div className={cn('p-4 lg:p-6 flex items-center gap-3 lg:gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('p-3 rounded-xl', isDark ? 'bg-warning-500/20' : 'bg-warning-50')}>
            <ChefHat className="w-6 h-6 text-warning-500" />
          </div>
          <div>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Sedang Dimasak</p>
            <p className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>7 item</p>
          </div>
        </div>
        
        <div className={cn('p-4 lg:p-6 flex items-center gap-3 lg:gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('p-3 rounded-xl', isDark ? 'bg-success-500/20' : 'bg-success-50')}>
            <Users className="w-6 h-6 text-success-500" />
          </div>
          <div>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Meja Terisi</p>
            <p className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{occupiedTables} dari {tables.length}</p>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={dailySalesData} />
        </div>
        <div>
          <PopularItems />
        </div>
      </div>
      
      {/* Orders & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <RecentOrders orders={sampleOrders} />
        <TableOverview tables={tables} />
      </div>
    </div>
  )
}
