'use client'

import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import Header from './Header'
import Sidebar from './Sidebar'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { isDark } = useTheme()

  return (
    <div className={cn('flex h-screen', isDark ? 'bg-gray-900' : 'bg-gray-50')}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className={cn(
          'flex-1 overflow-y-auto p-4 lg:p-6',
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
