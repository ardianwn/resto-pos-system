'use client'

import { useTheme } from '@/context/ThemeContext'
import { dailySalesData } from '@/data'
import { cn, formatCurrency } from '@/lib/utils'
import {
    Calendar,
    DollarSign,
    Download,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
    Users
} from 'lucide-react'
import { useState } from 'react'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

const weeklyData = [
  { name: 'Minggu 1', revenue: 28500000, orders: 285, customers: 420 },
  { name: 'Minggu 2', revenue: 32100000, orders: 312, customers: 485 },
  { name: 'Minggu 3', revenue: 29800000, orders: 298, customers: 445 },
  { name: 'Minggu 4', revenue: 35600000, orders: 356, customers: 520 },
]

const categoryData = [
  { name: 'Makanan Utama', value: 45, revenue: 28500000 },
  { name: 'Minuman', value: 25, revenue: 12500000 },
  { name: 'Appetizer', value: 15, revenue: 8500000 },
  { name: 'Dessert', value: 10, revenue: 5500000 },
  { name: 'Pendamping', value: 5, revenue: 2500000 },
]

const COLORS = ['#ea6c0a', '#22c55e', '#f59e0b', '#3b82f6', '#8b5cf6']

const hourlyData = [
  { hour: '10:00', orders: 5 },
  { hour: '11:00', orders: 12 },
  { hour: '12:00', orders: 28 },
  { hour: '13:00', orders: 35 },
  { hour: '14:00', orders: 18 },
  { hour: '15:00', orders: 8 },
  { hour: '16:00', orders: 6 },
  { hour: '17:00', orders: 10 },
  { hour: '18:00', orders: 22 },
  { hour: '19:00', orders: 38 },
  { hour: '20:00', orders: 32 },
  { hour: '21:00', orders: 15 },
]

const topItems = [
  { name: 'Nasi Goreng Spesial', sold: 145, revenue: 6525000 },
  { name: 'Ayam Bakar Madu', sold: 128, revenue: 7040000 },
  { name: 'Rendang Sapi', sold: 98, revenue: 6370000 },
  { name: 'Kopi Susu', sold: 185, revenue: 4070000 },
  { name: 'Es Teh Manis', sold: 210, revenue: 1680000 },
]

export default function Reports() {
  const { isDark } = useTheme()
  const [dateRange, setDateRange] = useState('weekly')
  
  const totalRevenue = 126000000
  const totalOrders = 1251
  const avgOrderValue = Math.round(totalRevenue / totalOrders)
  const totalCustomers = 1870
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className={cn('text-xl sm:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Laporan & Analitik</h1>
          <p className={cn('mt-1 text-sm sm:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Analisis performa bisnis restoran Anda</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={cn('px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500', isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900')}
          >
            <option value="daily">Hari Ini</option>
            <option value="weekly">Minggu Ini</option>
            <option value="monthly">Bulan Ini</option>
            <option value="yearly">Tahun Ini</option>
          </select>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Pilih Tanggal
          </button>
          <button className="btn-primary flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Total Pendapatan</p>
              <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center gap-1 mt-2 text-success-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+18.5%</span>
                <span className={cn('text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>vs bulan lalu</span>
              </div>
            </div>
            <div className={cn('p-3 rounded-xl', isDark ? 'bg-success-500/20' : 'bg-success-50')}>
              <DollarSign className="w-6 h-6 text-success-500" />
            </div>
          </div>
        </div>
        
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Total Pesanan</p>
              <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>{totalOrders.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-success-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12.3%</span>
                <span className={cn('text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>vs bulan lalu</span>
              </div>
            </div>
            <div className={cn('p-3 rounded-xl', isDark ? 'bg-primary-500/20' : 'bg-primary-50')}>
              <ShoppingBag className="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>
        
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Rata-rata Transaksi</p>
              <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(avgOrderValue)}</p>
              <div className="flex items-center gap-1 mt-2 text-danger-500">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">-2.1%</span>
                <span className={cn('text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>vs bulan lalu</span>
              </div>
            </div>
            <div className={cn('p-3 rounded-xl', isDark ? 'bg-warning-500/20' : 'bg-warning-50')}>
              <TrendingUp className="w-6 h-6 text-warning-500" />
            </div>
          </div>
        </div>
        
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Total Pelanggan</p>
              <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>{totalCustomers.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-success-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+25.8%</span>
                <span className={cn('text-sm', isDark ? 'text-gray-500' : 'text-gray-400')}>vs bulan lalu</span>
              </div>
            </div>
            <div className={cn('p-3 rounded-xl', isDark ? 'bg-blue-500/20' : 'bg-blue-50')}>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className={cn('lg:col-span-2 p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className={cn('font-semibold text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Tren Pendapatan Mingguan</h3>
          </div>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea6c0a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea6c0a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }} tickFormatter={(v) => `${(v/1000000)}jt`} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Pendapatan']} 
                  contentStyle={isDark ? { backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f3f4f6' } : undefined}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ea6c0a" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Distribution */}
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <h3 className={cn('font-semibold mb-6', isDark ? 'text-white' : 'text-gray-900')}>Distribusi Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Persentase']} 
                  contentStyle={isDark ? { backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f3f4f6' } : undefined}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((cat, index) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-600')}>{cat.name}</span>
                </div>
                <span className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-gray-900')}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Hourly Orders */}
        <div className={cn('p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <h3 className={cn('font-semibold mb-4 lg:mb-6 text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Pesanan per Jam</h3>
          <div className="h-56 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={isDark ? { backgroundColor: '#1f2937', border: '1px solid #374151', color: '#f3f4f6' } : undefined} />
                <Bar dataKey="orders" fill="#ea6c0a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Selling Items */}
        <div className={cn('p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <h3 className={cn('font-semibold mb-6', isDark ? 'text-white' : 'text-gray-900')}>Menu Terlaris Bulan Ini</h3>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold', isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600')}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{item.name}</span>
                    <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.sold} terjual</span>
                  </div>
                  <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-gray-700' : 'bg-gray-100')}>
                    <div 
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${(item.sold / topItems[0].sold) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={cn('font-semibold w-28 text-right', isDark ? 'text-white' : 'text-gray-900')}>
                  {formatCurrency(item.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary Table */}
      <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
        <div className={cn('p-6 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
          <h3 className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>Ringkasan Penjualan Harian</h3>
        </div>
        <table className="w-full">
          <thead className={cn(isDark ? 'bg-gray-700' : 'bg-gray-50')}>
            <tr>
              <th className={cn('text-left py-4 px-6 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Tanggal</th>
              <th className={cn('text-left py-4 px-6 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Pendapatan</th>
              <th className={cn('text-left py-4 px-6 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Pesanan</th>
              <th className={cn('text-left py-4 px-6 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Rata-rata</th>
              <th className={cn('text-left py-4 px-6 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>vs Kemarin</th>
            </tr>
          </thead>
          <tbody className={cn('divide-y', isDark ? 'divide-gray-700' : 'divide-gray-100')}>
            {dailySalesData.map((day, index) => {
              const prevRevenue = index < dailySalesData.length - 1 ? dailySalesData[index + 1].revenue : day.revenue
              const change = ((day.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
              const isPositive = Number(change) >= 0
              
              return (
                <tr key={day.date} className={cn('transition-colors', isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50')}>
                  <td className={cn('py-4 px-6 font-medium', isDark ? 'text-white' : 'text-gray-900')}>{day.date} 2026</td>
                  <td className={cn('py-4 px-6 font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(day.revenue)}</td>
                  <td className={cn('py-4 px-6', isDark ? 'text-gray-400' : 'text-gray-600')}>{day.orders} pesanan</td>
                  <td className={cn('py-4 px-6', isDark ? 'text-gray-400' : 'text-gray-600')}>{formatCurrency(day.avgOrderValue)}</td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-1 ${isPositive ? 'text-success-500' : 'text-danger-500'}`}>
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {isPositive ? '+' : ''}{change}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
