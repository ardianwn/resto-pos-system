'use client'

import { useTheme } from '@/context/ThemeContext'
import { categoryLabels, menuItems, tables } from '@/data'
import { cn, formatCurrency } from '@/lib/utils'
import type { MenuCategory, MenuItem, OrderItem } from '@/types'
import { Banknote, CreditCard, Minus, Plus, QrCode, Search, Trash2, Wallet } from 'lucide-react'
import { useState } from 'react'

const categories: { key: MenuCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'appetizer', label: 'Appetizer' },
  { key: 'main-course', label: 'Makanan Utama' },
  { key: 'side-dish', label: 'Pendamping' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'beverage', label: 'Minuman' },
]

const paymentMethods = [
  { key: 'cash', label: 'Tunai', icon: Banknote },
  { key: 'card', label: 'Kartu', icon: CreditCard },
  { key: 'qris', label: 'QRIS', icon: QrCode },
  { key: 'e-wallet', label: 'E-Wallet', icon: Wallet },
]

export default function POSInterface() {
  const { isDark } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<OrderItem[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('')
  const [showPayment, setShowPayment] = useState(false)
  
  const availableTables = tables.filter(t => t.status === 'available')
  
  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && item.available
  })
  
  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.menuItem.id === item.id)
      if (existing) {
        return prev.map(ci => 
          ci.menuItem.id === item.id 
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        )
      }
      return [...prev, { 
        id: `cart-${Date.now()}`, 
        menuItem: item, 
        quantity: 1, 
        status: 'pending' 
      }]
    })
  }
  
  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(ci => ci.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci)
        .filter(ci => ci.quantity > 0)
    })
  }
  
  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(ci => ci.id !== itemId))
  }
  
  const subtotal = cartItems.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax
  
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Menu Section */}
      <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden">
        {/* Search & Categories */}
        <div className="space-y-4 mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className={cn('flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
              <Search className={cn('w-5 h-5 flex-shrink-0', isDark ? 'text-gray-400' : 'text-gray-400')} />
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn('bg-transparent outline-none text-sm flex-1 min-w-0', isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400')}
              />
            </div>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className={cn('px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500', isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900')}
            >
              <option value="">Pilih Meja</option>
              {availableTables.map(table => (
                <option key={table.id} value={table.id}>
                  Meja {table.number} ({table.capacity} kursi)
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all',
                  selectedCategory === cat.key
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4">
            {filteredMenu.map(item => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                className={cn('p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg', isDark ? 'bg-gray-800 border-gray-700 hover:border-primary-500' : 'bg-white border-gray-100 hover:border-primary-200')}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-cover rounded-xl mb-3"
                />
                <h3 className={cn('font-medium text-sm truncate', isDark ? 'text-white' : 'text-gray-900')}>{item.name}</h3>
                <p className={cn('text-xs mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>{categoryLabels[item.category]}</p>
                <p className="font-bold text-primary-500 mt-2">{formatCurrency(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cart Section */}
      <div className={cn('w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l flex flex-col max-h-[50vh] lg:max-h-full', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
        <div className={cn('p-4 lg:p-6 border-b', isDark ? 'border-gray-700' : 'border-gray-100')}>
          <h2 className={cn('font-bold text-base lg:text-lg', isDark ? 'text-white' : 'text-gray-900')}>Pesanan Saat Ini</h2>
          {selectedTable && (
            <p className={cn('text-sm mt-1', isDark ? 'text-gray-400' : 'text-gray-500')}>
              Meja {tables.find(t => t.id === selectedTable)?.number}
            </p>
          )}
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className={cn('flex flex-col items-center justify-center h-full', isDark ? 'text-gray-500' : 'text-gray-400')}>
              <p className="text-sm">Keranjang kosong</p>
              <p className="text-xs mt-1">Klik menu untuk menambahkan</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={cn('flex gap-3 p-3 rounded-xl', isDark ? 'bg-gray-700/50' : 'bg-gray-50')}>
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={cn('font-medium text-sm truncate', isDark ? 'text-white' : 'text-gray-900')}>
                    {item.menuItem.name}
                  </h4>
                  <p className="text-sm text-primary-500 font-medium mt-1">
                    {formatCurrency(item.menuItem.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1) }}
                      className={cn('w-7 h-7 flex items-center justify-center border rounded-lg transition-colors', isDark ? 'bg-gray-600 border-gray-500 hover:bg-gray-500 text-white' : 'bg-white border-gray-200 hover:bg-gray-100')}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={cn('text-sm font-medium w-8 text-center', isDark ? 'text-white' : 'text-gray-900')}>{item.quantity}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1) }}
                      className={cn('w-7 h-7 flex items-center justify-center border rounded-lg transition-colors', isDark ? 'bg-gray-600 border-gray-500 hover:bg-gray-500 text-white' : 'bg-white border-gray-200 hover:bg-gray-100')}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromCart(item.id) }}
                    className={cn('p-1', isDark ? 'text-gray-400 hover:text-danger-400' : 'text-gray-400 hover:text-danger-500')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className={cn('font-bold text-sm', isDark ? 'text-white' : 'text-gray-900')}>
                    {formatCurrency(item.menuItem.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Cart Summary */}
        <div className={cn('p-6 border-t space-y-4', isDark ? 'border-gray-700' : 'border-gray-100')}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Subtotal</span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Pajak (10%)</span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>{formatCurrency(tax)}</span>
            </div>
            <div className={cn('flex justify-between pt-2 border-t', isDark ? 'border-gray-700' : 'border-gray-100')}>
              <span className={cn('font-semibold', isDark ? 'text-white' : 'text-gray-900')}>Total</span>
              <span className="font-bold text-lg text-primary-500">{formatCurrency(total)}</span>
            </div>
          </div>
          
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              disabled={cartItems.length === 0 || !selectedTable}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proses Pembayaran
            </button>
          ) : (
            <div className="space-y-3">
              <p className={cn('text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-700')}>Metode Pembayaran</p>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(method => (
                  <button
                    key={method.key}
                    className={cn('flex items-center justify-center gap-2 p-3 border rounded-xl transition-all', isDark ? 'border-gray-600 hover:border-primary-500 hover:bg-primary-500/10 text-white' : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50 text-gray-700')}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setCartItems([])
                  setSelectedTable('')
                  setShowPayment(false)
                }}
                className="w-full btn-success"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
