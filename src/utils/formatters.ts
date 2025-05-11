/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number, locale = 'fr-DZ', currency = 'DZD'): string => {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  
  // Replace the currency symbol with دج
  return formatted.replace('DZD', 'دج');
};

/**
 * Calculate profit margin percentage
 */
export const calculateProfitMargin = (price: number, cost: number): number => {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
};

/**
 * Format a date string
 */
export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('fr-FR', { ...defaultOptions, ...options }).format(date);
};

/**
 * Format a date string as relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'à l\'instant';
  } else if (diffMins < 60) {
    return `il y a ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `il y a ${diffHours} heure${diffHours !== 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
    return `il y a ${diffDays} jour${diffDays !== 1 ? 's' : ''}`;
  } else {
    return formatDate(dateString);
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};