import React from 'react';

type StatusType = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled' | 'returned';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'shipping':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'returned':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusText = () => {
    const statusTexts: Record<StatusType, string> = {
      pending: 'En attente',
      processing: 'En traitement',
      shipping: 'En livraison',
      delivered: 'Livré',
      cancelled: 'Annulé',
      returned: 'Retourné'
    };
    return statusTexts[status] || status;
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()} ${className}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${status === 'cancelled' ? 'bg-red-400' : ''}`}></span>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;