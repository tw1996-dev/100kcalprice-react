

'use client';

import { useCurrency } from '../../lib/hooks/useCurrency';

export default function ProductTable({ 
  products, 
  onDeleteProduct, 
  onSort, 
  sortColumn, 
  sortDirection 
}) {
  const { formatNumber, formatPrice } = useCurrency();

  const handleSort = (column) => {
    onSort(column);
  };

  if (products.length === 0) {
    return (
      <div className="table-container">
        <table id="productTable">
          <thead>
            <tr>
              <th data-sort="name" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                🍎 Product
              </th>
              <th data-sort="calories" onClick={() => handleSort('calories')} style={{ cursor: 'pointer' }}>
                🔥 Kcal/100g
              </th>
              <th data-sort="price" onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                💵 Price per kg
              </th>
              <th data-sort="cost" onClick={() => handleSort('cost')} style={{ cursor: 'pointer' }}>
                💰 Cost of 100 kcal
              </th>
              <th>🗑️</th>
            </tr>
          </thead>
          <tbody id="productTableBody">
            <tr className="no-products">
              <td colSpan="5">Add your first product to see cost comparison! 🚀</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table id="productTable">
        <thead>
          <tr>
            <th data-sort="name" onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              🍎 Product
              {sortColumn === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th data-sort="calories" onClick={() => handleSort('calories')} style={{ cursor: 'pointer' }}>
              🔥 Kcal/100g
              {sortColumn === 'calories' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th data-sort="price" onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              💵 Price per kg
              {sortColumn === 'price' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th data-sort="cost" onClick={() => handleSort('cost')} style={{ cursor: 'pointer' }}>
              💰 Cost of 100 kcal
              {sortColumn === 'cost' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </th>
            <th>🗑️</th>
          </tr>
        </thead>
        <tbody id="productTableBody">
          {products.map((product) => (
            <tr key={product.id}>
              <td><strong>{product.name}</strong></td>
              <td>{formatNumber(product.calories)} kcal</td>
              <td>{formatPrice(product.price)}</td>
              <td className="cost-cell">{formatPrice(product.costPer100Kcal)}</td>
              <td>
                <button 
                  className="delete-btn" 
                  data-product-id={product.id}
                  onClick={() => onDeleteProduct(product.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}