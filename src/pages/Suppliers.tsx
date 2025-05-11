import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockSuppliers, mockProducts } from '../data/mockData';

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter suppliers based on search
  const filteredSuppliers = mockSuppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get product names for each supplier
  const getSupplierProducts = (supplierProductIds: string[]) => {
    return supplierProductIds.map(id => {
      const product = mockProducts.find(p => p.id === id);
      return product ? product.name : '';
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your supplier relationships
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />}>
          Add Supplier
        </Button>
      </div>
      
      {/* Filters and search */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search suppliers by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-x-2 flex justify-start md:justify-end">
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              Filter
            </Button>
            <Button
              variant="outline"
            >
              Export
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Suppliers list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                
                <div className="mt-1 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={16} className="flex-shrink-0 mr-1.5 text-gray-400" />
                    {supplier.contactName}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={16} className="flex-shrink-0 mr-1.5 text-gray-400" />
                    <a href={`mailto:${supplier.email}`} className="hover:text-indigo-600">
                      {supplier.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone size={16} className="flex-shrink-0 mr-1.5 text-gray-400" />
                    <a href={`tel:${supplier.phone}`} className="hover:text-indigo-600">
                      {supplier.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="flex-shrink-0 mr-1.5 text-gray-400" />
                    {supplier.address.city}, {supplier.address.country}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                <div className="text-sm text-gray-900 font-medium">
                  {supplier.products.length} {supplier.products.length === 1 ? 'Product' : 'Products'}
                </div>
                <div className="mt-2">
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900">Supplied Products:</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {getSupplierProducts(supplier.products).map((productName, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {productName}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredSuppliers.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? `No results for "${searchTerm}"` : "Get started by adding your first supplier"}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Button leftIcon={<Plus size={16} />}>
                  Add Supplier
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Suppliers;