/**
 * Calculate days left until a specified date
 * @param expiryDate ISO date string or null
 * @returns Formatted string with days left or status
 */
export const calculateDaysLeft = (expiryDate: string | null): string => {
  if (!expiryDate) return 'N/A';

  const diff = new Date(expiryDate).getTime() - new Date().getTime();

  if (diff < 0) return 'Closed';

  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + ' days left';
};
