import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className = '',
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  change.isPositive ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
                }`}
              >
                <svg
                  className={`-ml-0.5 mr-1 h-3 w-3 ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <path
                    fillRule="evenodd"
                    d={change.isPositive ? 'M0 4l4-4 4 4H0z' : 'M0 0h8v2H0z M0 3h6v2H0z M0 6h4v2H0z'}
                    clipRule="evenodd"
                  />
                </svg>
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;