import React from 'react';
import { BarChart3, DollarSign, ShoppingBag, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { mockDashboardStats, mockProducts, mockOrders } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import StatusBadge from '../components/ui/StatusBadge';

const Dashboard: React.FC = () => {
  // Get low stock products
  const lowStockProducts = mockProducts.filter(product => 
    product.stock <= product.stockThreshold
  );
  
  // Get recent orders
  const recentOrders = [...mockOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vue de votre buisness
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(mockDashboardStats.revenue.monthly)}
          icon={<DollarSign size={24} />}
          change={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value={mockDashboardStats.orders.monthly}
          icon={<ShoppingBag size={24} />}
          change={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Total Profit"
          value={formatCurrency(mockDashboardStats.profit.monthly)}
          icon={<TrendingUp size={24} />}
          change={{ value: 10.8, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={mockDashboardStats.lowStockItems}
          icon={<AlertTriangle size={24} />}
          change={{ value: 3, isPositive: false }}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Sales Overview" subtitle="Last 30 days">
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-center text-gray-900">
              <BarChart3 size={24} className="mr-2" />
              <span>Sales chart will appear here</span>
            </div>
          </div>
        </Card>
        
        <Card title="Top Selling Products" subtitle="Last 30 days">
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-center text-gray-400">
              <BarChart3 size={24} className="mr-2" />
              <span>Product chart will appear here</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Low stock products */}
        <Card title="Low Stock Products" subtitle={`${lowStockProducts.length} items below threshold`}>
          <div className="divide-y divide-gray-200">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover" 
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.stock} left</p>
                    <p className="text-xs text-gray-500">Min: {product.stockThreshold}</p>
                  </div>
                  <StatusBadge 
                    status={product.stock === 0 ? 'outOfStock' : 'lowStock'} 
                    className="ml-3" 
                  />
                </div>
              </div>
            ))}
            
            {lowStockProducts.length === 0 && (
              <div className="py-4 text-center text-gray-500 text-sm">
                No products with low stock
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all inventory →
            </a>
          </div>
        </Card>
        
        {/* Recent orders */}
        <Card title="Recent Orders" subtitle="Last 5 orders">
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id.slice(3)}</p>
                    <p className="text-xs text-gray-500">{order.customerName}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all orders →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;