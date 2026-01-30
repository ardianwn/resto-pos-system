'use client'

import { useTheme } from '@/context/ThemeContext'
import { tables } from '@/data'
import { cn } from '@/lib/utils'
import type { Table, TableStatus } from '@/types'
import { Clock, Plus, Sparkles, Users, Utensils, X } from 'lucide-react'
import { useState } from 'react'

const statusConfig: Record<TableStatus, { label: string; color: string; bgColor: string; borderColor: string; darkBgColor: string; darkBorderColor: string }> = {
  available: { 
    label: 'Tersedia', 
    color: 'text-success-600', 
    bgColor: 'bg-success-50 hover:bg-success-100',
    borderColor: 'border-success-200 hover:border-success-300',
    darkBgColor: 'bg-success-500/10 hover:bg-success-500/20',
    darkBorderColor: 'border-success-500/30 hover:border-success-500/50'
  },
  occupied: { 
    label: 'Terisi', 
    color: 'text-danger-600', 
    bgColor: 'bg-danger-50',
    borderColor: 'border-danger-200',
    darkBgColor: 'bg-danger-500/10',
    darkBorderColor: 'border-danger-500/30'
  },
  reserved: { 
    label: 'Dipesan', 
    color: 'text-primary-600', 
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    darkBgColor: 'bg-primary-500/10',
    darkBorderColor: 'border-primary-500/30'
  },
  cleaning: { 
    label: 'Dibersihkan', 
    color: 'text-warning-600', 
    bgColor: 'bg-warning-50',
    borderColor: 'border-warning-200',
    darkBgColor: 'bg-warning-500/10',
    darkBorderColor: 'border-warning-500/30'
  },
}

export default function TableManagement() {
  const { isDark } = useTheme()
  const [tableList, setTableList] = useState(tables)
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  
  const sections = ['all', ...Array.from(new Set(tables.map(t => t.section)))]
  
  const filteredTables = selectedSection === 'all' 
    ? tableList 
    : tableList.filter(t => t.section === selectedSection)
  
  const stats = {
    available: tableList.filter(t => t.status === 'available').length,
    occupied: tableList.filter(t => t.status === 'occupied').length,
    reserved: tableList.filter(t => t.status === 'reserved').length,
    cleaning: tableList.filter(t => t.status === 'cleaning').length,
  }
  
  const updateTableStatus = (tableId: string, newStatus: TableStatus) => {
    setTableList(prev => prev.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ))
    setSelectedTable(null)
  }
  
  const getStatusIcon = (status: TableStatus) => {
    switch (status) {
      case 'available':
        return <Sparkles className="w-5 h-5" />
      case 'occupied':
        return <Utensils className="w-5 h-5" />
      case 'reserved':
        return <Clock className="w-5 h-5" />
      case 'cleaning':
        return <Sparkles className="w-5 h-5" />
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn('text-xl sm:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Manajemen Meja</h1>
          <p className={cn('mt-1 text-sm sm:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Kelola status meja dan kapasitas restoran</p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Tambah Meja
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cn('p-4 flex items-center gap-3 lg:gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-success-500/20' : 'bg-success-50')}>
            <Sparkles className="w-6 h-6 text-success-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{stats.available}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Tersedia</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-danger-500/20' : 'bg-danger-50')}>
            <Utensils className="w-6 h-6 text-danger-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{stats.occupied}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Terisi</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-primary-500/20' : 'bg-primary-50')}>
            <Clock className="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{stats.reserved}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Dipesan</p>
          </div>
        </div>
        <div className={cn('p-4 flex items-center gap-4 rounded-2xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', isDark ? 'bg-warning-500/20' : 'bg-warning-50')}>
            <Sparkles className="w-6 h-6 text-warning-500" />
          </div>
          <div>
            <p className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>{stats.cleaning}</p>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Dibersihkan</p>
          </div>
        </div>
      </div>
      
      {/* Section Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {sections.map(section => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={cn(
              'px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              selectedSection === section
                ? 'bg-primary-500 text-white'
                : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            )}
          >
            {section === 'all' ? 'Semua Meja' : section}
          </button>
        ))}
      </div>
      
      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-4">
        {filteredTables.map(table => {
          const config = statusConfig[table.status]
          return (
            <div
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={cn(
                'p-4 lg:p-6 cursor-pointer transition-all border-2 rounded-2xl',
                isDark ? config.darkBgColor : config.bgColor,
                isDark ? config.darkBorderColor : config.borderColor
              )}
            >
              <div className="text-center">
                <div className={cn(
                  'w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl mx-auto flex items-center justify-center mb-2 lg:mb-3',
                  isDark ? (
                    table.status === 'available' ? 'bg-success-500/30' :
                    table.status === 'occupied' ? 'bg-danger-500/30' :
                    table.status === 'reserved' ? 'bg-primary-500/30' : 'bg-warning-500/30'
                  ) : (
                    table.status === 'available' ? 'bg-success-100' :
                    table.status === 'occupied' ? 'bg-danger-100' :
                    table.status === 'reserved' ? 'bg-primary-100' : 'bg-warning-100'
                  )
                )}>
                  <span className={cn('text-lg lg:text-2xl font-bold', isDark ? config.color.replace('600', '400') : config.color)}>
                    {table.number}
                  </span>
                </div>
                
                <p className={cn('text-xs lg:text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{table.section}</p>
                
                <div className={cn('flex items-center justify-center gap-1 mt-1 lg:mt-2', isDark ? 'text-gray-400' : 'text-gray-500')}>
                  <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs lg:text-sm">{table.capacity} kursi</span>
                </div>
                
                <div className={cn(
                  'inline-flex items-center gap-1 mt-2 lg:mt-3 px-2 lg:px-3 py-1 rounded-full text-xs font-medium',
                  isDark ? config.color.replace('600', '400') : config.color,
                  isDark ? (
                    table.status === 'available' ? 'bg-success-500/30' :
                    table.status === 'occupied' ? 'bg-danger-500/30' :
                    table.status === 'reserved' ? 'bg-primary-500/30' : 'bg-warning-500/30'
                  ) : (
                    table.status === 'available' ? 'bg-success-100' :
                    table.status === 'occupied' ? 'bg-danger-100' :
                    table.status === 'reserved' ? 'bg-primary-100' : 'bg-warning-100'
                  )
                )}>
                  {getStatusIcon(table.status)}
                  {config.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Table Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={cn('rounded-2xl p-6 w-96 max-w-full mx-4', isDark ? 'bg-gray-800' : 'bg-white')}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>Meja {selectedTable.number}</h3>
              <button 
                onClick={() => setSelectedTable(null)}
                className={cn('p-1 rounded-lg', isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}
              >
                <X className={cn('w-5 h-5', isDark ? 'text-gray-400' : 'text-gray-500')} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Lokasi</span>
                <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{selectedTable.section}</span>
              </div>
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Kapasitas</span>
                <span className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{selectedTable.capacity} orang</span>
              </div>
              <div className={cn('flex items-center justify-between py-3 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                <span className={cn('font-medium', statusConfig[selectedTable.status].color)}>
                  {statusConfig[selectedTable.status].label}
                </span>
              </div>
              
              <div className="pt-4">
                <p className={cn('text-sm font-medium mb-3', isDark ? 'text-gray-300' : 'text-gray-700')}>Ubah Status</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, 'available')}
                    className={cn(
                      'p-3 rounded-xl text-sm font-medium transition-all',
                      selectedTable.status === 'available'
                        ? 'bg-success-500 text-white'
                        : isDark ? 'bg-success-500/20 text-success-400 hover:bg-success-500/30' : 'bg-success-50 text-success-600 hover:bg-success-100'
                    )}
                  >
                    Tersedia
                  </button>
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, 'occupied')}
                    className={cn(
                      'p-3 rounded-xl text-sm font-medium transition-all',
                      selectedTable.status === 'occupied'
                        ? 'bg-danger-500 text-white'
                        : isDark ? 'bg-danger-500/20 text-danger-400 hover:bg-danger-500/30' : 'bg-danger-50 text-danger-600 hover:bg-danger-100'
                    )}
                  >
                    Terisi
                  </button>
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, 'reserved')}
                    className={cn(
                      'p-3 rounded-xl text-sm font-medium transition-all',
                      selectedTable.status === 'reserved'
                        ? 'bg-primary-500 text-white'
                        : isDark ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                    )}
                  >
                    Dipesan
                  </button>
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, 'cleaning')}
                    className={cn(
                      'p-3 rounded-xl text-sm font-medium transition-all',
                      selectedTable.status === 'cleaning'
                        ? 'bg-warning-500 text-white'
                        : isDark ? 'bg-warning-500/20 text-warning-400 hover:bg-warning-500/30' : 'bg-warning-50 text-warning-600 hover:bg-warning-100'
                    )}
                  >
                    Bersihkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
