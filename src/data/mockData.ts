import { Product, Order, Supplier, Notification, DashboardStats, User } from '../types';

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@ecommerceapp.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
};

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    sku: 'WE-001',
    price: 149.99,
    cost: 72.50,
    stock: 45,
    stockThreshold: 10,
    category: 'Electronics',
    tags: ['audio', 'wireless', 'headphones'],
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500'],
    createdAt: '2024-04-10T09:00:00Z',
    updatedAt: '2024-06-15T14:30:00Z',
    variants: [
      {
        id: 'var1',
        name: 'Black',
        attributes: { color: 'black' },
        price: 149.99,
        cost: 72.50,
        stock: 30,
        sku: 'WE-001-BLK'
      },
      {
        id: 'var2',
        name: 'White',
        attributes: { color: 'white' },
        price: 149.99,
        cost: 72.50,
        stock: 15,
        sku: 'WE-001-WHT'
      }
    ]
  },
  {
    id: 'prod2',
    name: 'Smart Watch',
    description: 'Fitness and health tracking smart watch',
    sku: 'SW-002',
    price: 249.99,
    cost: 120.00,
    stock: 8,
    stockThreshold: 10,
    category: 'Electronics',
    tags: ['wearable', 'fitness', 'smart device'],
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'],
    createdAt: '2024-03-15T11:20:00Z',
    updatedAt: '2024-06-20T09:45:00Z'
  },
  {
    id: 'prod3',
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with 20-hour battery life',
    sku: 'BS-003',
    price: 79.99,
    cost: 35.25,
    stock: 28,
    stockThreshold: 15,
    category: 'Electronics',
    tags: ['audio', 'bluetooth', 'portable'],
    images: ['https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=500'],
    createdAt: '2024-02-20T13:45:00Z',
    updatedAt: '2024-06-18T16:10:00Z'
  },
  {
    id: 'prod4',
    name: 'Laptop Bag',
    description: 'Stylish and durable laptop bag with multiple compartments',
    sku: 'LB-004',
    price: 59.99,
    cost: 22.80,
    stock: 35,
    stockThreshold: 10,
    category: 'Accessories',
    tags: ['bag', 'laptop', 'travel'],
    images: ['https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&w=500'],
    createdAt: '2024-05-05T08:30:00Z',
    updatedAt: '2024-06-22T10:20:00Z'
  },
  {
    id: 'prod5',
    name: 'Mechanical Keyboard',
    description: 'Customizable mechanical keyboard with RGB lighting',
    sku: 'MK-005',
    price: 129.99,
    cost: 58.45,
    stock: 4,
    stockThreshold: 5,
    category: 'Electronics',
    tags: ['keyboard', 'gaming', 'mechanical'],
    images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500'],
    createdAt: '2024-04-28T15:15:00Z',
    updatedAt: '2024-06-21T14:50:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord1',
    customerId: 'cust1',
    customerName: 'Julie Smith',
    status: 'delivered',
    total: 179.98,
    items: [
      {
        id: 'item1',
        productId: 'prod3',
        productName: 'Bluetooth Speaker',
        quantity: 1,
        price: 79.99,
        cost: 35.25
      },
      {
        id: 'item2',
        productId: 'prod4',
        productName: 'Laptop Bag',
        quantity: 1,
        price: 59.99,
        cost: 22.80
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-06-18T09:24:00Z',
    updatedAt: '2024-06-20T14:35:00Z'
  },
  {
    id: 'ord2',
    customerId: 'cust2',
    customerName: 'Michael Chen',
    status: 'processing',
    total: 249.99,
    items: [
      {
        id: 'item3',
        productId: 'prod2',
        productName: 'Smart Watch',
        quantity: 1,
        price: 249.99,
        cost: 120.00
      }
    ],
    shippingAddress: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10022',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    createdAt: '2024-06-21T11:05:00Z',
    updatedAt: '2024-06-21T11:30:00Z'
  },
  {
    id: 'ord3',
    customerId: 'cust3',
    customerName: 'Sarah Williams',
    status: 'shipped',
    total: 149.99,
    items: [
      {
        id: 'item4',
        productId: 'prod1',
        productName: 'Wireless Earbuds',
        variantId: 'var1',
        variantName: 'Black',
        quantity: 1,
        price: 149.99,
        cost: 72.50
      }
    ],
    shippingAddress: {
      street: '789 Oak Rd',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-06-20T15:45:00Z',
    updatedAt: '2024-06-21T08:15:00Z'
  },
  {
    id: 'ord4',
    customerId: 'cust4',
    customerName: 'David Rodriguez',
    status: 'pending',
    total: 129.99,
    items: [
      {
        id: 'item5',
        productId: 'prod5',
        productName: 'Mechanical Keyboard',
        quantity: 1,
        price: 129.99,
        cost: 58.45
      }
    ],
    shippingAddress: {
      street: '101 Pine St',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-06-22T10:10:00Z',
    updatedAt: '2024-06-22T10:10:00Z'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'supp1',
    name: 'TechGadgets Inc.',
    contactName: 'Robert Johnson',
    email: 'robert@techgadgets.com',
    phone: '555-123-4567',
    address: {
      street: '100 Tech Blvd',
      city: 'San Jose',
      state: 'CA',
      postalCode: '95134',
      country: 'USA'
    },
    products: ['prod1', 'prod2', 'prod5']
  },
  {
    id: 'supp2',
    name: 'AudioMasters Co.',
    contactName: 'Lisa Wong',
    email: 'lisa@audiomasters.com',
    phone: '555-987-6543',
    address: {
      street: '200 Sound Ave',
      city: 'Nashville',
      state: 'TN',
      postalCode: '37203',
      country: 'USA'
    },
    products: ['prod1', 'prod3']
  },
  {
    id: 'supp3',
    name: 'AccessoriesPlus',
    contactName: 'Mark Taylor',
    email: 'mark@accessoriesplus.com',
    phone: '555-456-7890',
    address: {
      street: '300 Retail Row',
      city: 'Minneapolis',
      state: 'MN',
      postalCode: '55403',
      country: 'USA'
    },
    products: ['prod4']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'warning',
    message: 'Smart Watch stock is below threshold (8 remaining)',
    read: false,
    createdAt: '2024-06-22T08:30:00Z',
    relatedId: 'prod2',
    relatedType: 'product'
  },
  {
    id: 'notif2',
    type: 'warning',
    message: 'Mechanical Keyboard stock is below threshold (4 remaining)',
    read: false,
    createdAt: '2024-06-22T08:35:00Z',
    relatedId: 'prod5',
    relatedType: 'product'
  },
  {
    id: 'notif3',
    type: 'info',
    message: 'New order #ord4 received from David Rodriguez',
    read: true,
    createdAt: '2024-06-22T10:15:00Z',
    relatedId: 'ord4',
    relatedType: 'order'
  },
  {
    id: 'notif4',
    type: 'success',
    message: 'Order #ord3 has been shipped',
    read: false,
    createdAt: '2024-06-21T08:20:00Z',
    relatedId: 'ord3',
    relatedType: 'order'
  }
];

export const mockDashboardStats: DashboardStats = {
  revenue: {
    daily: 379.98,
    weekly: 1575.93,
    monthly: 6204.82
  },
  orders: {
    daily: 2,
    weekly: 12,
    monthly: 47
  },
  profit: {
    daily: 169.94,
    weekly: 704.52,
    monthly: 2788.22
  },
  lowStockItems: 2,
  pendingOrders: 1
};