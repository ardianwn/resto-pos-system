'use client'

import { useTheme } from '@/context/ThemeContext'
import { categoryLabels, menuItems } from '@/data'
import { cn, formatCurrency } from '@/lib/utils'
import type { MenuCategory, MenuItem } from '@/types'
import { Edit, Image, Plus, Search, Trash2, X } from 'lucide-react'
import { useState } from 'react'

const categories: MenuCategory[] = ['appetizer', 'main-course', 'side-dish', 'dessert', 'beverage']

export default function MenuManagement() {
  const { isDark } = useTheme()
  const [menu, setMenu] = useState(menuItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all')
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  
  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const toggleAvailability = (itemId: string) => {
    setMenu(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ))
  }
  
  const deleteItem = (itemId: string) => {
    setMenu(prev => prev.filter(item => item.id !== itemId))
  }
  
  const menuByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filteredMenu.filter(item => item.category === cat)
    return acc
  }, {} as Record<MenuCategory, MenuItem[]>)
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn('text-xl sm:text-2xl font-bold', isDark ? 'text-white' : 'text-gray-900')}>Manajemen Menu</h1>
          <p className={cn('mt-1 text-sm sm:text-base', isDark ? 'text-gray-400' : 'text-gray-500')}>Kelola daftar menu dan harga restoran</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Tambah Menu
        </button>
      </div>
      
      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className={cn('flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn('bg-transparent outline-none text-sm flex-1 min-w-0', isDark ? 'text-white placeholder-gray-500' : 'text-gray-900')}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            )}
          >
            Semua
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                selectedCategory === cat
                  ? 'bg-primary-500 text-white'
                  : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Menu Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <div key={cat} className={cn('rounded-2xl border p-3 lg:p-4', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
            <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{categoryLabels[cat]}</p>
            <p className={cn('text-2xl font-bold mt-1', isDark ? 'text-white' : 'text-gray-900')}>
              {menu.filter(m => m.category === cat).length}
            </p>
            <p className="text-xs text-success-500 mt-1">
              {menu.filter(m => m.category === cat && m.available).length} tersedia
            </p>
          </div>
        ))}
      </div>
      
      {/* Menu List */}
      <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className={cn(isDark ? 'bg-gray-700' : 'bg-gray-50')}>
              <tr>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Menu</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Kategori</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Harga</th>
                <th className={cn('text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Waktu</th>
                <th className={cn('text-center py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Status</th>
                <th className={cn('text-right py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-500')}>Aksi</th>
              </tr>
            </thead>
          <tbody className={cn('divide-y', isDark ? 'divide-gray-700' : 'divide-gray-100')}>
            {filteredMenu.map(item => (
              <tr key={item.id} className={cn('transition-colors', isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50')}>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className={cn('font-medium', isDark ? 'text-white' : 'text-gray-900')}>{item.name}</p>
                      <p className={cn('text-sm line-clamp-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={cn('badge', isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')}>
                    {categoryLabels[item.category]}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>{formatCurrency(item.price)}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>{item.preparationTime} menit</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={cn(
                        'relative w-12 h-6 rounded-full transition-colors',
                        item.available ? 'bg-success-500' : 'bg-gray-300'
                      )}
                    >
                      <span className={cn(
                        'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                        item.available ? 'right-1' : 'left-1'
                      )} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className={cn('p-2 text-gray-400 hover:text-primary-500 rounded-lg transition-colors', isDark ? 'hover:bg-primary-500/20' : 'hover:bg-primary-50')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className={cn('p-2 text-gray-400 hover:text-danger-500 rounded-lg transition-colors', isDark ? 'hover:bg-danger-500/20' : 'hover:bg-danger-50')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      
      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={cn('rounded-2xl p-6 w-[500px] max-w-full mx-4 max-h-[90vh] overflow-y-auto', isDark ? 'bg-gray-800' : 'bg-white')}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-gray-900')}>
                {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h3>
              <button 
                onClick={() => { setShowAddModal(false); setEditingItem(null) }}
                className={cn('p-1 rounded-lg', isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}
              >
                <X className={cn('w-5 h-5', isDark ? 'text-gray-400' : 'text-gray-500')} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Nama Menu</label>
                <input
                  type="text"
                  defaultValue={editingItem?.name}
                  className={cn('input-field', isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : '')}
                  placeholder="Masukkan nama menu"
                />
              </div>
              
              <div>
                <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Deskripsi</label>
                <textarea
                  defaultValue={editingItem?.description}
                  className={cn('input-field resize-none', isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : '')}
                  rows={3}
                  placeholder="Masukkan deskripsi menu"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Kategori</label>
                  <select
                    defaultValue={editingItem?.category}
                    className={cn('input-field', isDark ? 'bg-gray-700 border-gray-600 text-white' : '')}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Harga (Rp)</label>
                  <input
                    type="number"
                    defaultValue={editingItem?.price}
                    className={cn('input-field', isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : '')}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Waktu Persiapan (menit)</label>
                <input
                  type="number"
                  defaultValue={editingItem?.preparationTime}
                  className={cn('input-field', isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : '')}
                  placeholder="10"
                />
              </div>
              
              <div>
                <label className={cn('block text-sm font-medium mb-2', isDark ? 'text-gray-300' : 'text-gray-700')}>Gambar</label>
                <div className={cn('border-2 border-dashed rounded-xl p-8 text-center', isDark ? 'border-gray-600' : 'border-gray-200')}>
                  <Image className={cn('w-10 h-10 mx-auto mb-2', isDark ? 'text-gray-500' : 'text-gray-300')} />
                  <p className={cn('text-sm', isDark ? 'text-gray-400' : 'text-gray-500')}>Klik untuk upload gambar</p>
                  <p className={cn('text-xs mt-1', isDark ? 'text-gray-500' : 'text-gray-400')}>PNG, JPG max 2MB</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingItem(null) }}
                  className="flex-1 btn-secondary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
