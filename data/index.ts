import type { DailySales, MenuItem, Order, Table, User } from '@/types'

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Lumpia Goreng',
    description: 'Lumpia isi sayuran segar dengan saus sambal',
    price: 25000,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1606525437679-037aca74a3e9?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 10
  },
  {
    id: 'app-2',
    name: 'Sate Lilit Bali',
    description: 'Sate ayam cincang khas Bali dengan bumbu rempah',
    price: 35000,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 15
  },
  {
    id: 'app-3',
    name: 'Sup Jagung',
    description: 'Sup jagung manis dengan telur dan jamur',
    price: 28000,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 8
  },
  
  // Main Course
  {
    id: 'main-1',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam, dan kerupuk',
    price: 45000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 15
  },
  {
    id: 'main-2',
    name: 'Ayam Bakar Madu',
    description: 'Ayam bakar dengan olesan madu dan rempah',
    price: 55000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 25
  },
  {
    id: 'main-3',
    name: 'Rendang Sapi',
    description: 'Rendang daging sapi dengan santan dan rempah autentik',
    price: 65000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 20
  },
  {
    id: 'main-4',
    name: 'Ikan Bakar Sambal',
    description: 'Ikan gurame bakar dengan sambal matah',
    price: 75000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 30
  },
  {
    id: 'main-5',
    name: 'Mie Goreng Seafood',
    description: 'Mie goreng dengan udang, cumi, dan sayuran',
    price: 50000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 15
  },
  {
    id: 'main-6',
    name: 'Soto Ayam',
    description: 'Soto ayam kuning dengan nasi dan pelengkap',
    price: 40000,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 12
  },
  
  // Side Dishes
  {
    id: 'side-1',
    name: 'Nasi Putih',
    description: 'Nasi putih pulen satu porsi',
    price: 8000,
    category: 'side-dish',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 2
  },
  {
    id: 'side-2',
    name: 'Kerupuk Udang',
    description: 'Kerupuk udang renyah',
    price: 5000,
    category: 'side-dish',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 1
  },
  {
    id: 'side-3',
    name: 'Tahu Tempe Goreng',
    description: 'Tahu dan tempe goreng dengan sambal',
    price: 15000,
    category: 'side-dish',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 8
  },
  
  // Desserts
  {
    id: 'des-1',
    name: 'Es Cendol',
    description: 'Cendol dengan gula merah dan santan',
    price: 18000,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 5
  },
  {
    id: 'des-2',
    name: 'Pisang Goreng Keju',
    description: 'Pisang goreng dengan topping keju dan cokelat',
    price: 22000,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 10
  },
  {
    id: 'des-3',
    name: 'Klepon',
    description: 'Bola ketan isi gula merah dengan parutan kelapa',
    price: 15000,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 3
  },
  
  // Beverages
  {
    id: 'bev-1',
    name: 'Es Teh Manis',
    description: 'Teh manis dingin yang menyegarkan',
    price: 8000,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 2
  },
  {
    id: 'bev-2',
    name: 'Es Jeruk Segar',
    description: 'Jus jeruk segar dengan es',
    price: 15000,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 3
  },
  {
    id: 'bev-3',
    name: 'Kopi Susu',
    description: 'Kopi arabika dengan susu segar',
    price: 22000,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 5
  },
  {
    id: 'bev-4',
    name: 'Jus Alpukat',
    description: 'Jus alpukat kental dengan susu kental manis',
    price: 25000,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 5
  },
  {
    id: 'bev-5',
    name: 'Air Mineral',
    description: 'Air mineral botol 600ml',
    price: 6000,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
    available: true,
    preparationTime: 1
  }
]

export const tables: Table[] = [
  // Indoor Section
  { id: 't-1', number: 1, capacity: 2, status: 'available', section: 'Indoor' },
  { id: 't-2', number: 2, capacity: 2, status: 'occupied', section: 'Indoor', currentOrderId: 'ord-1' },
  { id: 't-3', number: 3, capacity: 4, status: 'available', section: 'Indoor' },
  { id: 't-4', number: 4, capacity: 4, status: 'occupied', section: 'Indoor', currentOrderId: 'ord-2' },
  { id: 't-5', number: 5, capacity: 6, status: 'reserved', section: 'Indoor' },
  { id: 't-6', number: 6, capacity: 6, status: 'available', section: 'Indoor' },
  
  // Outdoor Section
  { id: 't-7', number: 7, capacity: 2, status: 'available', section: 'Outdoor' },
  { id: 't-8', number: 8, capacity: 4, status: 'cleaning', section: 'Outdoor' },
  { id: 't-9', number: 9, capacity: 4, status: 'available', section: 'Outdoor' },
  { id: 't-10', number: 10, capacity: 6, status: 'occupied', section: 'Outdoor', currentOrderId: 'ord-3' },
  
  // VIP Section
  { id: 't-11', number: 11, capacity: 8, status: 'reserved', section: 'VIP Room' },
  { id: 't-12', number: 12, capacity: 10, status: 'available', section: 'VIP Room' },
]

export const sampleOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-20260130-001',
    tableId: 't-2',
    items: [
      { id: 'oi-1', menuItem: menuItems[3], quantity: 2, status: 'cooking' },
      { id: 'oi-2', menuItem: menuItems[15], quantity: 2, status: 'ready' },
      { id: 'oi-3', menuItem: menuItems[8], quantity: 2, status: 'served' },
    ],
    status: 'in-progress',
    createdAt: new Date(Date.now() - 25 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
    totalAmount: 116000,
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-20260130-002',
    tableId: 't-4',
    items: [
      { id: 'oi-4', menuItem: menuItems[4], quantity: 3, status: 'cooking' },
      { id: 'oi-5', menuItem: menuItems[5], quantity: 1, status: 'pending' },
      { id: 'oi-6', menuItem: menuItems[16], quantity: 4, status: 'served' },
    ],
    status: 'in-progress',
    createdAt: new Date(Date.now() - 15 * 60000),
    updatedAt: new Date(Date.now() - 2 * 60000),
    totalAmount: 292000,
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-20260130-003',
    tableId: 't-10',
    items: [
      { id: 'oi-7', menuItem: menuItems[6], quantity: 2, status: 'pending' },
      { id: 'oi-8', menuItem: menuItems[0], quantity: 3, status: 'cooking' },
      { id: 'oi-9', menuItem: menuItems[17], quantity: 2, status: 'pending' },
    ],
    status: 'pending',
    createdAt: new Date(Date.now() - 8 * 60000),
    updatedAt: new Date(Date.now() - 8 * 60000),
    totalAmount: 269000,
  },
]

export const currentUser: User = {
  id: 'user-1',
  name: 'Ahmad Rizky',
  email: 'ahmad@restoran.com',
  role: 'cashier',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
}

export const dailySalesData: DailySales[] = [
  { date: '24 Jan', revenue: 4850000, orders: 45, avgOrderValue: 107778 },
  { date: '25 Jan', revenue: 5230000, orders: 52, avgOrderValue: 100577 },
  { date: '26 Jan', revenue: 6100000, orders: 58, avgOrderValue: 105172 },
  { date: '27 Jan', revenue: 5780000, orders: 55, avgOrderValue: 105091 },
  { date: '28 Jan', revenue: 7250000, orders: 68, avgOrderValue: 106618 },
  { date: '29 Jan', revenue: 6890000, orders: 64, avgOrderValue: 107656 },
  { date: '30 Jan', revenue: 3250000, orders: 32, avgOrderValue: 101563 },
]

export const categoryLabels: Record<string, string> = {
  'appetizer': 'Appetizer',
  'main-course': 'Makanan Utama',
  'dessert': 'Dessert',
  'beverage': 'Minuman',
  'side-dish': 'Pendamping'
}
