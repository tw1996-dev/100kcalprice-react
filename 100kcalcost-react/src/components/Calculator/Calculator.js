

'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '../../lib/hooks/useProducts';
import { useCurrency } from '../../lib/hooks/useCurrency';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

export default function Calculator() {
  const [currentMode, setCurrentMode] = useState(0); // 0 = kg, 1 = piece
  const { products, addProduct, deleteProduct, sortProducts, sortColumn, sortDirection } = useProducts();
  const { currentCurrency, formatPrice, currencySymbol } = useCurrency();

  // Calculate cost per 100 kcal
  const calculateCostPer100Kcal = (caloriesPer100g, pricePerKg) => {
    const caloriesPerKg = caloriesPer100g * 10;
    const costPer100Kcal = (pricePerKg / caloriesPerKg) * 100;
    return costPer100Kcal;
  };

  const calculateCostPer100KcalFromPiece = (pieceWeight, caloriesPer100g, pricePerPiece) => {
    const caloriesPerPiece = (caloriesPer100g * pieceWeight) / 100;
    const costPerKcal = pricePerPiece / caloriesPerPiece;
    const costPer100Kcal = costPerKcal * 100;
    return costPer100Kcal;
  };

  // Switch mode
  const switchMode = (mode) => {
    setCurrentMode(mode);
  };

  // Add product (kg mode)
  const handleAddProductKg = (formData) => {
    const { productName, calories, pricePerKg } = formData;
    
    if (!calories || calories <= 0) {
      alert('❌ Enter a valid calorie value (greater than 0)!');
      return false;
    }
    
    if (!pricePerKg || pricePerKg <= 0) {
      alert('❌ Enter a valid price per kg (greater than 0)!');
      return false;
    }

    const costPer100Kcal = calculateCostPer100Kcal(calories, pricePerKg);
    
    const product = {
      name: productName,
      calories: calories,
      price: pricePerKg,
      priceUnit: 'kg',
      costPer100Kcal: costPer100Kcal
    };

    return addProduct(product);
  };

  // Add product (piece mode)
  const handleAddProductPiece = (formData) => {
    const { productName, pieceWeight, calories, pricePerPiece, pricePerKg } = formData;
    
    if (!calories || calories <= 0) {
      alert('❌ Enter a valid calorie value (greater than 0)!');
      return false;
    }
    
    if (!pieceWeight || pieceWeight <= 0) {
      alert('❌ Enter a valid piece weight (greater than 0)!');
      return false;
    }
    
    if ((!pricePerPiece || pricePerPiece <= 0) && (!pricePerKg || pricePerKg <= 0)) {
      alert('❌ Enter a price per piece OR per kilogram!');
      return false;
    }

    let costPer100Kcal;
    let finalPricePerKg;

    if (pricePerPiece && pricePerPiece > 0) {
      costPer100Kcal = calculateCostPer100KcalFromPiece(pieceWeight, calories, pricePerPiece);
      finalPricePerKg = (pricePerPiece / pieceWeight) * 1000;
    } else {
      costPer100Kcal = calculateCostPer100Kcal(calories, pricePerKg);
      finalPricePerKg = pricePerKg;
    }

    const product = {
      name: productName,
      calories: calories,
      price: finalPricePerKg,
      priceUnit: 'kg',
      costPer100Kcal: costPer100Kcal
    };

    return addProduct(product);
  };

  return (
    <div className="calculator-container">
      <div className="mode-switcher">
        <div className={`mode-slider ${currentMode === 1 ? 'right' : ''}`}></div>
        <button 
          className={`mode-btn ${currentMode === 0 ? 'active' : ''}`}
          data-mode="0"
          onClick={() => switchMode(0)}
        >
          Per Kilogram
        </button>
        <button 
          className={`mode-btn ${currentMode === 1 ? 'active' : ''}`}
          data-mode="1"
          onClick={() => switchMode(1)}
        >
          Per Piece
        </button>
      </div>

      <ProductForm
        mode={currentMode}
        onAddProductKg={handleAddProductKg}
        onAddProductPiece={handleAddProductPiece}
        currencySymbol={currencySymbol}
      />

      <ProductTable
        products={products}
        onDeleteProduct={deleteProduct}
        onSort={sortProducts}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        formatPrice={formatPrice}
      />
    </div>
  );
}