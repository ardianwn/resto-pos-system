// Types for Restaurant POS System

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  image: string
  available: boolean
  preparationTime: number // in minutes
}

export type MenuCategory = 
  | 'appetizer'
  | 'main-course'
  | 'dessert'
  | 'beverage'
  | 'side-dish'

export interface OrderItem {
  id: string
  menuItem: MenuItem
  quantity: number
  notes?: string
  status: OrderItemStatus
}

export type OrderItemStatus = 'pending' | 'cooking' | 'ready' | 'served'

export interface Order {
  id: string
  orderNumber: string
  tableId: string
  items: OrderItem[]
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  totalAmount: number
  paymentMethod?: PaymentMethod
  paidAt?: Date
  customerName?: string
}

export type OrderStatus = 'pending' | 'in-progress' | 'ready' | 'completed' | 'cancelled'

export type PaymentMethod = 'cash' | 'card' | 'qris' | 'e-wallet'

export interface Table {
  id: string
  number: number
  capacity: number
  status: TableStatus
  currentOrderId?: string
  section: string
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export type UserRole = 'admin' | 'cashier' | 'kitchen' | 'waiter'

export interface DailySales {
  date: string
  revenue: number
  orders: number
  avgOrderValue: number
}

export interface TopSellingItem {
  menuItem: MenuItem
  quantity: number
  revenue: number
}
