import React from 'react';

type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = 'primary', 
  size = 'md',
  className = ''
}) => {
  const colorClasses = {
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-teal-100 text-teal-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  };

  return (
    <span 
      className={`inline-block rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;