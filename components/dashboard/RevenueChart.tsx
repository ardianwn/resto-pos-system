'use client'

import { useTheme } from '@/context/ThemeContext'
import { cn, formatCurrency } from '@/lib/utils'
import type { DailySales } from '@/types'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface RevenueChartProps {
  data: DailySales[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const { isDark } = useTheme()
  
  return (
    <div className={cn('p-4 lg:p-6 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 lg:mb-6">
        <div>
          <h3 className={cn('font-semibold text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>Pendapatan 7 Hari Terakhir</h3>
          <p className={cn('text-xs lg:text-sm mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>Total: {formatCurrency(39350000)}</p>
        </div>
        <select className={cn('text-xs lg:text-sm border rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500', isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900')}>
          <option>7 Hari Terakhir</option>
          <option>30 Hari Terakhir</option>
          <option>Bulan Ini</option>
        </select>
      </div>
      
      <div className="h-56 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ea6c0a" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ea6c0a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}jt`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1f2937' : 'white', 
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: isDark ? '#f3f4f6' : '#111827'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Pendapatan']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ea6c0a" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
