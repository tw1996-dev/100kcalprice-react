

'use client';

import { useState, useEffect } from 'react';

const DEFAULT_CURRENCY = { code: 'USD', name: 'US Dollar', symbol: '$' };

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);

  // Load currency from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedCurrency');
      if (saved) {
        setCurrentCurrency(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading currency:', error);
    }
  }, []);

  // Format number with commas and max decimals
  const formatNumber = (number, maxDecimals = 2) => {
    const rounded = Math.round(number * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
    return rounded.toString().replace('.', ',');
  };

  // Format price with currency symbol
  const formatPrice = (price, maxDecimals = 2) => {
    const formattedNumber = formatNumber(price, maxDecimals);
    return `${formattedNumber} ${currentCurrency.symbol}`;
  };

  return {
    currentCurrency,
    formatNumber,
    formatPrice,
    currencySymbol: currentCurrency.symbol
  };
}