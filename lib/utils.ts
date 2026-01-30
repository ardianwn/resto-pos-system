import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function generateOrderNumber(): string {
  const now = new Date()
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `ORD-${datePart}-${randomPart}`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'pending': 'bg-warning-50 text-warning-600',
    'cooking': 'bg-primary-50 text-primary-600',
    'in-progress': 'bg-primary-50 text-primary-600',
    'ready': 'bg-success-50 text-success-600',
    'served': 'bg-gray-100 text-gray-600',
    'completed': 'bg-success-50 text-success-600',
    'cancelled': 'bg-danger-50 text-danger-600',
    'available': 'bg-success-50 text-success-600',
    'occupied': 'bg-danger-50 text-danger-600',
    'reserved': 'bg-primary-50 text-primary-600',
    'cleaning': 'bg-warning-50 text-warning-600',
  }
  return colors[status] || 'bg-gray-100 text-gray-600'
}

export function calculateTimeDifference(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit`
  
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} jam`
  
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} hari`
}
