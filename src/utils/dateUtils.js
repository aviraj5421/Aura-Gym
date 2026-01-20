/**
 * Formats a timestamp into a human-readable date.
 * @param {number|Date} date - The date to format.
 * @returns {string} e.g., "Oct 24, 2023"
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Checks if a subscription has expired.
 * @param {number} expiryTimestamp - The Unix timestamp of expiry.
 * @returns {boolean}
 */
export const isSubscriptionExpired = (expiryTimestamp) => {
  return Date.now() > expiryTimestamp;
};

/**
 * Calculates remaining days in a subscription.
 * @param {number} expiryTimestamp 
 * @returns {number}
 */
export const getRemainingDays = (expiryTimestamp) => {
  const diff = expiryTimestamp - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};