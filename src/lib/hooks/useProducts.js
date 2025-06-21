
'use client';

import { useState, useEffect } from 'react';

const MAX_PRODUCTS = 500;
const ADD_PRODUCT_COOLDOWN = 1000; // 1 second

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [productIdCounter, setProductIdCounter] = useState(1);
  const [autoProductCounter, setAutoProductCounter] = useState(1);
  const [lastProductAddTime, setLastProductAddTime] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Generate unique product name
  const generateUniqueProductName = (originalName) => {
    if (!originalName || originalName.trim() === '') {
      const name = `Product${autoProductCounter}`;
      setAutoProductCounter(prev => prev + 1);
      return name;
    }

    const baseName = originalName.trim();
    const existingNames = products.map(p => p.name);

    if (!existingNames.includes(baseName)) {
      return baseName;
    }

    let counter = 1;
    let newName;
    do {
      newName = `${baseName}${counter}`;
      counter++;
    } while (existingNames.includes(newName));

    return newName;
  };

  // Check rate limit
  const checkRateLimit = () => {
    const currentTime = Date.now();
    const timeSinceLastAdd = currentTime - lastProductAddTime;
    
    if (timeSinceLastAdd < ADD_PRODUCT_COOLDOWN) {
      const remainingTime = Math.ceil((ADD_PRODUCT_COOLDOWN - timeSinceLastAdd) / 1000);
      alert(`⏱️ Please wait ${remainingTime} seconds before adding another product!`);
      return false;
    }
    
    return true;
  };

  // Check product limit
  const checkProductLimit = () => {
    if (products.length >= MAX_PRODUCTS) {
      alert(`⚠️ Maximum number of products (${MAX_PRODUCTS}) reached. Delete some products to add new ones.`);
      return false;
    }
    return true;
  };

  // Add product
  const addProduct = (productData) => {
    if (!checkProductLimit() || !checkRateLimit()) {
      return false;
    }

    const product = {
      id: productIdCounter,
      ...productData,
      name: generateUniqueProductName(productData.name)
    };

    setProducts(prev => [...prev, product]);
    setProductIdCounter(prev => prev + 1);
    setLastProductAddTime(Date.now());
    
    return true;
  };

  // Delete product
  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Sort products
  const sortProducts = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Apply sorting
  const getSortedProducts = () => {
    if (!sortColumn) return products;

    return [...products].sort((a, b) => {
      let valueA, valueB;
      
      switch (sortColumn) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'calories':
          valueA = a.calories;
          valueB = b.calories;
          break;
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'cost':
          valueA = a.costPer100Kcal;
          valueB = b.costPer100Kcal;
          break;
        default:
          return 0;
      }

      if (typeof valueA === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
    });
  };

  return {
    products: getSortedProducts(),
    addProduct,
    deleteProduct,
    sortProducts,
    sortColumn,
    sortDirection
  };
}