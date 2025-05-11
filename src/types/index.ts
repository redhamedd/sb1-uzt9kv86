// Define types for our application
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  stockThreshold: number;
  category: string;
  tags: string[];
  variants?: ProductVariant[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  attributes: {
    [key: string]: string; // e.g., { color: 'red', size: 'medium' }
  };
  price: number;
  cost: number;
  stock: number;
  sku: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned';
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  price: number;
  cost: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: Address;
  products: string[]; // Product IDs
  notes?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string; // ID of related entity (product, order, etc.)
  relatedType?: 'product' | 'order' | 'supplier';
}

export interface DashboardStats {
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  orders: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  profit: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  lowStockItems: number;
  pendingOrders: number;
}