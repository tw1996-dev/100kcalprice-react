

'use client';

import { useState, useEffect, useRef } from 'react';

export default function ProductForm({ mode, onAddProductKg, onAddProductPiece, currencySymbol }) {
  // Form states for kg mode
  const [productName1, setProductName1] = useState('');
  const [calories1, setCalories1] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');

  // Form states for piece mode
  const [productName2, setProductName2] = useState('');
  const [pieceWeight, setPieceWeight] = useState('');
  const [calories2, setCalories2] = useState('');
  const [pricePerPiece, setPricePerPiece] = useState('');
  const [pricePerKg2, setPricePerKg2] = useState('');
  const [isPricePerPieceDisabled, setIsPricePerPieceDisabled] = useState(false);
  const [isPricePerKg2Disabled, setIsPricePerKg2Disabled] = useState(false);

  // Update floating labels
  const updateFloatingLabels = () => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
      if (input.value && input.value !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  };

  // Update labels on mount and value changes
  useEffect(() => {
    updateFloatingLabels();
  }, [productName1, calories1, pricePerKg, productName2, pieceWeight, calories2, pricePerPiece, pricePerKg2]);

  // Handle price field mutual exclusion
  useEffect(() => {
    if (pricePerPiece && parseFloat(pricePerPiece) > 0) {
      setIsPricePerKg2Disabled(true);
      setPricePerKg2('');
    } else {
      setIsPricePerKg2Disabled(false);
    }
  }, [pricePerPiece]);

  useEffect(() => {
    if (pricePerKg2 && parseFloat(pricePerKg2) > 0) {
      setIsPricePerPieceDisabled(true);
      setPricePerPiece('');
    } else {
      setIsPricePerPieceDisabled(false);
    }
  }, [pricePerKg2]);

  // Clear forms
  const clearInputsKg = () => {
    setProductName1('');
    setCalories1('');
    setPricePerKg('');
    document.activeElement.blur();
  };

  const clearInputsPiece = () => {
    setProductName2('');
    setPieceWeight('');
    setCalories2('');
    setPricePerPiece('');
    setPricePerKg2('');
    setIsPricePerPieceDisabled(false);
    setIsPricePerKg2Disabled(false);
    document.activeElement.blur();
  };

  // Handle form submissions
  const handleAddKg = () => {
    const success = onAddProductKg({
      productName: productName1,
      calories: parseFloat(calories1),
      pricePerKg: parseFloat(pricePerKg)
    });
    
    if (success) {
      clearInputsKg();
    }
  };

  const handleAddPiece = () => {
    const success = onAddProductPiece({
      productName: productName2,
      pieceWeight: parseFloat(pieceWeight),
      calories: parseFloat(calories2),
      pricePerPiece: parseFloat(pricePerPiece) || 0,
      pricePerKg: parseFloat(pricePerKg2) || 0
    });
    
    if (success) {
      clearInputsPiece();
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (mode === 0) {
        handleAddKg();
      } else {
        handleAddPiece();
      }
    }
  };

  return (
    <div className="controls" onKeyPress={handleKeyPress}>
      {/* Kg Mode */}
      <div className={`input-section ${mode === 0 ? 'active' : ''}`} id="mode-kg">
        <div className="form-group">
          <input 
            type="text" 
            id="productName1" 
            maxLength="30" 
            placeholder=" "
            value={productName1}
            onChange={(e) => setProductName1(e.target.value)}
          />
          <label htmlFor="productName1">Product Name (optional)</label>
        </div>

        <div className="forms-wrapper">
          <div className="form-group">
            <input 
              type="number" 
              id="calories1" 
              placeholder=" " 
              step="0.01" 
              min="1" 
              inputMode="numeric"
              value={calories1}
              onChange={(e) => setCalories1(e.target.value)}
            />
            <label htmlFor="calories1">Kcal/100g</label>
          </div>

          <div className="form-group">
            <input 
              type="number" 
              id="pricePerKg" 
              placeholder=" " 
              step="0.01" 
              min="0.1" 
              inputMode="decimal"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
            />
            <label htmlFor="pricePerKg">Price per kg ({currencySymbol})</label>
          </div>
        </div>
        <button className="btn" id="addProductKgBtn" onClick={handleAddKg}>
          ➕ Add Product
        </button>
      </div>

      {/* Piece Mode */}
      <div className={`input-section ${mode === 1 ? 'active' : ''}`} id="mode-piece">
        <div className="form-group">
          <input 
            type="text" 
            id="productName2" 
            maxLength="30" 
            placeholder=" "
            value={productName2}
            onChange={(e) => setProductName2(e.target.value)}
          />
          <label htmlFor="productName2">Product Name (optional)</label>
        </div>

        <div className="forms-wrapper">
          <div className="form-group">
            <input 
              type="number" 
              id="pieceWeight" 
              placeholder=" " 
              min="1" 
              inputMode="numeric"
              value={pieceWeight}
              onChange={(e) => setPieceWeight(e.target.value)}
            />
            <label htmlFor="pieceWeight">Weight per piece (g)</label>
          </div>

          <div className="form-group">
            <input 
              type="number" 
              id="calories2" 
              placeholder=" " 
              min="1" 
              inputMode="numeric"
              value={calories2}
              onChange={(e) => setCalories2(e.target.value)}
            />
            <label htmlFor="calories2">Kcal/100g</label>
          </div>
        </div>

        <div className="forms-wrapper">
          <div className="price-input-group">
            <input 
              type="number" 
              id="pricePerPiece" 
              placeholder=" " 
              step="0.01" 
              min="0" 
              inputMode="numeric"
              value={pricePerPiece}
              onChange={(e) => setPricePerPiece(e.target.value)}
              disabled={isPricePerPieceDisabled}
            />
            <label htmlFor="pricePerPiece">Price per piece ({currencySymbol})</label>
          </div>
          <div className="price-input-group">
            <input 
              type="number" 
              id="pricePerKg2" 
              placeholder=" " 
              step="0.01" 
              min="0" 
              inputMode="numeric"
              value={pricePerKg2}
              onChange={(e) => setPricePerKg2(e.target.value)}
              disabled={isPricePerKg2Disabled}
            />
            <label htmlFor="pricePerKg2">Price per kg ({currencySymbol})</label>
          </div>
        </div>
        <button className="btn" id="addProductPieceBtn" onClick={handleAddPiece}>
          ➕ Add Product
        </button>
      </div>
    </div>
  );
}