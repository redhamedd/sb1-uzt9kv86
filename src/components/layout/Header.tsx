import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Settings, LogOut, User, ChevronDown, Sun, Moon } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';
import Badge from '../ui/Badge';

interface HeaderProps {
  toggleSidebar: () => void;
  unreadNotifications: number;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, unreadNotifications }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu size={24} />
          </button>
          
          <div className="hidden sm:block ml-2">
            <div className="relative ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rechercher..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
              )}
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    {unreadNotifications > 0 && (
                      <Badge color="error" size="sm">{unreadNotifications} new</Badge>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                      <div>
                        <p className="font-medium">Stock faible</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Smart Watch est sous le seuil (8 restants)</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">À l'instant</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 px-4 border-t border-gray-200 dark:border-gray-700">
                  <a href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                    Voir toutes les notifications
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative ml-3" ref={userMenuRef}>
            <div>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentUser.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</div>
                </div>
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Profile dropdown */}
            {showUserMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    Votre Profil
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <Settings size={16} className="mr-2" />
                    Paramètres
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Se déconnecter
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;