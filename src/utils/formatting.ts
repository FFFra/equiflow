/**
 * Format currency amount from cents to standard currency format
 * @param amountInCents Amount in cents (e.g. 10050 for $100.50)
 * @param currency Currency code (e.g. 'USD', 'EUR', 'GBP')
 * @returns Formatted currency string
 */
export const formatCurrency = (amountInCents: number | null, currency: string): string => {
  if (amountInCents === null) return `${currency} 0`;

  const amount = amountInCents / 100;

  return `${currency} ${amount.toLocaleString()}`;
};

/**
 * Format percentage with % symbol
 * @param percentage Percentage value as string or number
 * @returns Formatted percentage string
 */
export const formatPercentage = (percentage: string | number): string => {
  if (typeof percentage === 'string') {
    return `${percentage}%`;
  }

  return `${percentage.toFixed(2)}%`;
};
