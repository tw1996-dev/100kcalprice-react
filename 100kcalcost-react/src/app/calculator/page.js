export default function Calculator() {
  return (
    <div className="container">
      <header>
        <h1>💰 100 kcal Cost Calculator</h1>
        <p>Check the cost of energy in different products</p>
      </header>

      <div className="mode-switcher">
        <div className="mode-slider"></div>
        <button className="mode-btn active" data-mode="0">
          Per Kilogram
        </button>
        <button className="mode-btn" data-mode="1">
          Per Piece
        </button>
      </div>

      <div className="controls">
        <div className="input-section active" id="mode-kg">
          <div className="form-group">
            <input type="text" id="productName1" maxLength="30" placeholder=" " />
            <label htmlFor="productName1">Product Name (optional)</label>
          </div>

          <div className="forms-wrapper">
            <div className="form-group">
              <input type="number" id="calories1" placeholder=" " step="0.01" min="1" inputMode="numeric" />
              <label htmlFor="calories1">Kcal/100g</label>
            </div>

            <div className="form-group">
              <input type="number" id="pricePerKg" placeholder=" " step="0.01" min="0.1" inputMode="decimal" />
              <label htmlFor="pricePerKg">Price per kg </label>
            </div>
          </div>
          <button className="btn" id="addProductKgBtn">➕ Add Product</button>
        </div>

        <div className="input-section" id="mode-piece">
          <div className="form-group">
            <input type="text" id="productName2" maxLength="30" placeholder=" " />
            <label htmlFor="productName2">Product Name (optional)</label>
          </div>

          <div className="forms-wrapper">
            <div className="form-group">
              <input type="number" id="pieceWeight" placeholder=" " min="1" inputMode="numeric" />
              <label htmlFor="pieceWeight">Weight per piece (g)</label>
            </div>

            <div className="form-group">
              <input type="number" id="calories2" placeholder=" " min="1" inputMode="numeric" />
              <label htmlFor="calories2">Kcal/100g</label>
            </div>
          </div>

          <div className="forms-wrapper">
            <div className="price-input-group">
              <input type="number" id="pricePerPiece" placeholder=" " step="0.01" min="0" inputMode="numeric" />
              <label htmlFor="pricePerPiece">Price per piece</label>
            </div>
            <div className="price-input-group">
              <input type="number" id="pricePerKg2" placeholder=" " step="0.01" min="0" inputMode="numeric" />
              <label htmlFor="pricePerKg2">Price per kg</label>
            </div>
          </div>
          <button className="btn" id="addProductPieceBtn">➕ Add Product</button>
        </div>
      </div>

      <div className="table-container">
        <table id="productTable">
          <thead>
            <tr>
              <th data-sort="name">🍎 Product</th>
              <th data-sort="calories">🔥 Kcal/100g</th>
              <th data-sort="price">💵 Price per kg</th>
              <th data-sort="cost">💰 Cost of 100 kcal</th>
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

      {/* Food Cost Calculator Section */}
      <div className="food-cost-section">
        <div className="food-cost-section-header">
          <h2>🤔 Fun Fact</h2>
          <p>You can calculate how much you'll spend on food at a specific cost per 100 kcal</p>
        </div>

        <div className="cost-mode-switcher">
          <div className="cost-mode-slider"></div>
          <button className="cost-mode-btn active" data-cost-mode="0">
            Normal
          </button>
          <button className="cost-mode-btn" data-cost-mode="1">
            Training/Rest
          </button>
        </div>

        {/* Normal Mode */}
        <div className="cost-input-section active" id="cost-mode-normal">
          <div className="cost-form-group">
            <input type="number" id="dailyCalories" placeholder=" " inputMode="numeric" />
            <label htmlFor="dailyCalories">How many calories do you eat daily</label>
          </div>

          <div className="cost-forms-wrapper">
            <div className="cost-form-group">
              <input type="number" id="cost100kcal1" placeholder=" " step="0.01" inputMode="decimal" />
              <label htmlFor="cost100kcal1">Average cost per 100 kcal</label>
            </div>
            <div className="cost-form-group">
              <input type="number" id="cost100kcal2" placeholder=" " step="0.01" inputMode="decimal" />
              <label htmlFor="cost100kcal2">Second cost per 100 kcal (optional)</label>
            </div>
          </div>

          <button className="cost-calculate-btn" id="calculateNormalBtn">
            🧮 Calculate Costs
          </button>
        </div>

        {/* Training/Rest Mode */}
        <div className="cost-input-section" id="cost-mode-dtdnt">
          <div className="cost-forms-wrapper">
            <div className="cost-form-group">
              <input type="number" id="trainingDayCalories" placeholder=" " inputMode="numeric" />
              <label htmlFor="trainingDayCalories">Calories on training day</label>
            </div>
            <div className="cost-form-group">
              <input type="number" id="nonTrainingDayCalories" placeholder=" " inputMode="numeric" />
              <label htmlFor="nonTrainingDayCalories">Calories on rest day</label>
            </div>
          </div>

          <div className="cost-forms-wrapper">
            <div className="cost-form-group">
              <input type="number" id="trainingDaysPerWeek" placeholder=" " min="0" max="7" inputMode="numeric" />
              <label htmlFor="trainingDaysPerWeek">Training days per week</label>
            </div>
            <div className="cost-form-group">
              <input type="number" id="nonTrainingDaysPerWeek" placeholder=" " min="0" max="7" inputMode="numeric" />
              <label htmlFor="nonTrainingDaysPerWeek">Rest days per week</label>
            </div>
          </div>

          <div className="cost-forms-wrapper">
            <div className="cost-form-group">
              <input type="number" id="dtCost100kcal1" placeholder=" " step="0.01" inputMode="decimal" />
              <label htmlFor="dtCost100kcal1">Average cost per 100 kcal</label>
            </div>
            <div className="cost-form-group">
              <input type="number" id="dtCost100kcal2" placeholder=" " step="0.01" inputMode="decimal" />
              <label htmlFor="dtCost100kcal2">Second cost per 100 kcal (optional)</label>
            </div>
          </div>

          <button className="cost-calculate-btn" id="calculateDTDNTBtn">
            🧮 Calculate Costs
          </button>
        </div>

        {/* Results */}
        <div className="cost-results" id="costResults">
          <h3>💰 Your Food Expenses</h3>
          <div className="cost-comparison" id="costComparison">
            {/* Results will be inserted here by JavaScript */}
          </div>
        </div>
      </div>
    </div>
  );
}