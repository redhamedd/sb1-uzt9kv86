import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Calculator,
  ShoppingCart, 
  Warehouse, 
  Users, 
  Settings, 
  Bell, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  subItems?: NavSubItem[];
}

interface NavSubItem {
  name: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const navItems: NavItem[] = [
    {
      name: 'Tableau de bord',
      path: '/',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Produits',
      path: '/products',
      icon: <Package size={20} />,
      subItems: [
        { name: 'Tous les produits', path: '/products' },
        { name: 'Coût des produits', path: '/product-cost' },
        { name: 'Catégories', path: '/products/categories' },
      ],
    },
    {
      name: 'Inventaire',
      path: '/inventory',
      icon: <Warehouse size={20} />,
    },
    {
      name: 'Commandes',
      path: '/orders',
      icon: <ShoppingCart size={20} />,
      subItems: [
        { name: 'Toutes les commandes', path: '/orders' },
        { name: 'En attente', path: '/orders/pending' },
        { name: 'En traitement', path: '/orders/processing' },
        { name: 'En livraison', path: '/orders/shipping' },
        { name: 'Livrées', path: '/orders/delivered' },
        { name: 'Retours', path: '/orders/returned' },
      ],
    },
    {
      name: 'Fournisseurs',
      path: '/suppliers',
      icon: <Users size={20} />,
    },
    {
      name: 'Paramètres',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ];
  
  const toggleSubItems = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };
  
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };
  
  const isActiveGroup = (item: NavItem) => {
    if (isActiveLink(item.path)) return true;
    if (item.subItems && location.pathname.startsWith(item.path)) return true;
    return false;
  };
  
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="bg-indigo-600 text-white p-1 rounded">
            <Warehouse size={24} />
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Manacom</span>
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.name} className="mb-1">
            {item.subItems ? (
              <div>
                <button
                  className={`
                    w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActiveGroup(item) 
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}
                  `}
                  onClick={() => toggleSubItems(item.name)}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActiveGroup(item) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${
                      expandedItems.includes(item.name) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedItems.includes(item.name) && (
                  <div className="mt-1 ml-8 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`
                          group flex items-center pl-3 pr-2 py-2 text-sm font-medium rounded-md transition-colors
                          ${isActiveLink(subItem.path)
                            ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}
                        `}
                        onClick={isMobile ? onClose : undefined}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActiveLink(item.path)
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}
                `}
                onClick={isMobile ? onClose : undefined}
              >
                <span className={`mr-3 ${isActiveLink(item.path) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div>Manacom v1.0</div>
          <div className="mt-1">© 2025 Manacom Inc.</div>
        </div>
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75"
            onClick={onClose}
          ></div>
        )}
        
        <div 
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ease-in-out duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {sidebarContent}
        </div>
      </>
    );
  }
  
  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 flex-shrink-0">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;