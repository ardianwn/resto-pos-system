'use client'

import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'
import { currentUser } from '@/data'
import { cn } from '@/lib/utils'
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react'

export default function Header() {
  const { toggle } = useSidebar()
  const { isDark, toggleTheme } = useTheme()
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <header className={cn(
      'h-14 lg:h-16 border-b flex items-center justify-between px-3 sm:px-4 lg:px-6',
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    )}>
      {/* Left Side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {/* Menu Toggle Button */}
        <span
          onClick={toggle}
          className={cn(
            'p-2 rounded-xl transition-colors cursor-pointer flex-shrink-0',
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          )}
        >
          <Menu className={cn('w-5 h-5', isDark ? 'text-gray-300' : 'text-gray-600')} />
        </span>
        
        {/* Search Bar */}
        <div className={cn(
          'hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl flex-1 max-w-xs lg:max-w-md',
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        )}>
          <Search className={cn('w-4 h-4 flex-shrink-0', isDark ? 'text-gray-400' : 'text-gray-400')} />
          <input
            type="text"
            placeholder="Cari menu, pesanan, atau meja..."
            className={cn(
              'bg-transparent outline-none text-sm flex-1 min-w-0',
              isDark ? 'text-gray-200 placeholder:text-gray-500' : 'text-gray-700 placeholder:text-gray-400'
            )}
          />
        </div>
        <span className={cn('text-sm hidden lg:block flex-shrink-0', isDark ? 'text-gray-400' : 'text-gray-500')}>
          {today}
        </span>
      </div>
      
      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Button */}
        <button className={cn(
          'sm:hidden p-2 rounded-xl transition-colors',
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        )}>
          <Search className={cn('w-5 h-5', isDark ? 'text-gray-300' : 'text-gray-600')} />
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'p-2 rounded-xl transition-colors',
            isDark ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
          )}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Notifications */}
        <button className={cn(
          'relative p-2 rounded-xl transition-colors',
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        )}>
          <Bell className={cn('w-5 h-5', isDark ? 'text-gray-300' : 'text-gray-600')} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>
        
        {/* User Profile */}
        <button className={cn(
          'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-colors',
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
        )}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-left hidden md:block">
            <p className={cn('text-sm font-medium', isDark ? 'text-gray-200' : 'text-gray-900')}>
              {currentUser.name}
            </p>
            <p className={cn('text-xs capitalize', isDark ? 'text-gray-400' : 'text-gray-500')}>
              {currentUser.role}
            </p>
          </div>
          <ChevronDown className={cn('w-4 h-4 hidden sm:block', isDark ? 'text-gray-400' : 'text-gray-400')} />
        </button>
      </div>
    </header>
  )
}
