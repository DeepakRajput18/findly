// Format date to a readable string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format date to a simple date string (without time)
export const formatSimpleDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time ago (e.g., "2 hours ago", "3 days ago")
export const timeAgo = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Get item status color
export const getStatusColor = (status) => {
  switch (status) {
    case 'Lost':
      return '#f44336'; // Red
    case 'Found':
    case 'Recovered':
      return '#4caf50'; // Green
    case 'Unclaimed':
      return '#ff9800'; // Orange
    case 'Claimed':
      return '#2196f3'; // Blue
    case 'Pending':
      return '#ff9800'; // Orange
    case 'Confirmed':
      return '#4caf50'; // Green
    case 'Rejected':
      return '#f44336'; // Red
    default:
      return '#757575'; // Grey
  }
};

// Get category icon name
export const getCategoryIcon = (category) => {
  const normalizedCategory = category?.toLowerCase() || '';
  
  if (normalizedCategory.includes('electronics') || normalizedCategory.includes('device')) {
    return 'devices';
  } else if (normalizedCategory.includes('document') || normalizedCategory.includes('id')) {
    return 'description';
  } else if (normalizedCategory.includes('clothing') || normalizedCategory.includes('apparel')) {
    return 'checkroom';
  } else if (normalizedCategory.includes('jewelry') || normalizedCategory.includes('accessory')) {
    return 'watch';
  } else if (normalizedCategory.includes('pet') || normalizedCategory.includes('animal')) {
    return 'pets';
  } else if (normalizedCategory.includes('key')) {
    return 'key';
  } else if (normalizedCategory.includes('bag') || normalizedCategory.includes('luggage')) {
    return 'work';
  } else if (normalizedCategory.includes('toy') || normalizedCategory.includes('game')) {
    return 'toys';
  } else if (normalizedCategory.includes('book')) {
    return 'menu_book';
  } else if (normalizedCategory.includes('wallet') || normalizedCategory.includes('purse')) {
    return 'account_balance_wallet';
  } else {
    return 'help_outline';
  }
};

// Get available categories
export const getCategories = () => [
  'Electronics',
  'Documents',
  'Clothing',
  'Jewelry',
  'Pets',
  'Keys',
  'Bags',
  'Toys',
  'Books',
  'Wallets',
  'Other'
];

// Format currency
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

// Generate a random color
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}; 