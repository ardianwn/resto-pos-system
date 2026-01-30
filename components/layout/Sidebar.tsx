'use client'

import { useSidebar } from '@/context/SidebarContext'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import {
    BarChart3,
    ChefHat,
    ClipboardList,
    Grid3X3,
    LayoutDashboard,
    LogOut,
    Settings,
    ShoppingCart,
    UtensilsCrossed
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ShoppingCart, label: 'Kasir (POS)', href: '/pos' },
  { icon: ChefHat, label: 'Dapur', href: '/kitchen' },
  { icon: Grid3X3, label: 'Meja', href: '/tables' },
  { icon: UtensilsCrossed, label: 'Menu', href: '/menu' },
  { icon: ClipboardList, label: 'Pesanan', href: '/orders' },
  { icon: BarChart3, label: 'Laporan', href: '/reports' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()
  const { isDark } = useTheme()


  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
        />
      )}
      
      <aside 
        className={cn(
          'flex flex-col transition-all duration-300 z-50',
          'fixed lg:relative h-full',
          isDark 
            ? 'bg-gray-800 border-r border-gray-700' 
            : 'bg-white border-r border-gray-100',
          isOpen ? 'w-60 lg:w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'
        )} 
        suppressHydrationWarning
      >
        {/* Logo */}
        <div className={cn(
          'h-14 lg:h-16 flex items-center px-3 lg:px-4 border-b',
          isDark ? 'border-gray-700' : 'border-gray-100'
        )}>
          <div className={cn('flex items-center gap-2 lg:gap-3', !isOpen && 'lg:justify-center lg:w-full')}>
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            {isOpen && (
              <div className="lg:block">
                <h1 className={cn('font-bold text-sm lg:text-base', isDark ? 'text-white' : 'text-gray-900')}>RestoPOS</h1>
                <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>Restaurant System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => window.innerWidth < 1024 && close()}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? isDark 
                      ? 'bg-primary-500/20 text-primary-400' 
                      : 'bg-primary-50 text-primary-600'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  !isOpen && 'lg:justify-center lg:px-2'
                )}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && (isDark ? 'text-primary-400' : 'text-primary-500'))} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Menu */}
        <div className={cn(
          'px-3 py-4 border-t space-y-1',
          isDark ? 'border-gray-700' : 'border-gray-100'
        )}>
          <div
            role="button"
            tabIndex={0}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer',
              isDark 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              !isOpen && 'lg:justify-center lg:px-2'
            )}
            title={!isOpen ? 'Pengaturan' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Pengaturan</span>}
          </div>
          <div
            role="button"
            tabIndex={0}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer',
              isDark 
                ? 'text-danger-400 hover:bg-danger-500/20' 
                : 'text-danger-500 hover:bg-danger-50',
              !isOpen && 'lg:justify-center lg:px-2'
            )}
            title={!isOpen ? 'Keluar' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Keluar</span>}
          </div>
        </div>
      </aside>
    </>
  )
}
