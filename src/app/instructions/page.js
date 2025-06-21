export default function Instructions() {
  return (
    <>
      <section id="currency-selector">
        <p id="selectorFirstP">💰 Choose Your Currency</p>
        <p>Select your preferred currency for price calculations. This setting will be remembered and used in the calculator.</p>

        <div className="currency-dropdown-container">
          <input type="text" id="currency-search" placeholder="Type to search currencies " autoComplete="off" />
          <div id="currency-results"></div>
        </div>

        <div className="selected-currency" id="selected-currency">
          <div className="selected-currency-text">
            Selected: <span id="selected-currency-display"></span>
          </div>
        </div>
      </section>

      <main id="instructions">
        <h1>📱 100 kcal Cost Calculator User Guide</h1>

        <section>
          <h2>🚀 First Launch</h2>
          <p><strong>For phone users</strong>:</p>
          <ol>
            <li>Go to the &quot;Calculator&quot; tab in the application.</li>
            <li>
              Add a shortcut to your phone&apos;s home:
              <ul>
                <li><strong className="strong">On Android:</strong> Tap menu (⋮) → &quot;Add to Home screen&quot;.</li>
                <li><strong className="strong">On iPhone:</strong> Tap the share button (□↗) → &quot;Add to Home Screen&quot;.</li>
              </ul>
            </li>
            <li>This way, you can launch the calculator with one tap from your home screen!</li>
          </ol>
        </section>

        <section>
          <h2>🎯 How to Use the Calculator</h2>

          <article>
            <h3>Default Mode: &quot;Per Kilogram&quot;</h3>
            <div className="highlight">
              <p>For most products in stores</p>
            </div>
            <ol>
              <li><strong className="strong">Product Name</strong> – optional (you can skip it for quick comparison)</li>
              <li><strong className="strong">Kcal/100g</strong> – you&apos;ll find this on the product label</li>
              <li><strong className="strong">Price per kg</strong> – convert the price to per kilogram (e.g., 500g for $5 = $10/kg)</li>
              <li><strong className="strong">Click</strong> <strong>&quot;➕ Add Product&quot;</strong></li>
            </ol>
          </article>

          <article>
            <h3>Alternative Mode: &quot;Per Piece&quot;</h3>
            <div className="highlight">
              <p><strong>Use for products sold individually</strong> (e.g., yogurts, rolls)</p>
            </div>
            <ol>
              <li><strong className="strong">Product Name</strong> – optional</li>
              <li><strong className="strong">Weight per piece (g)</strong> – how much one item weighs</li>
              <li><strong className="strong">Kcal/100g</strong> – from the label</li>
              <li>
                <strong className="strong">Price</strong>: Choose ONE method:
                <ul>
                  <li><strong>Price per piece</strong> – how much one item costs</li>
                  <li><strong>OR Price per kg</strong> – the converted price per kilogram</li>
                </ul>
              </li>
              <li><strong className="strong">Click </strong><strong>&quot;➕ Add Product&quot;</strong></li>
            </ol>
          </article>
        </section>

        <section>
          <h2>📊 Managing Results</h2>

          <article>
            <h3>Sorting the Table</h3>
            <ul>
              <li>
                <strong>Click a column header</strong> to sort by:
                <ul>
                  <li>🍎 Product (alphabetically)</li>
                  <li>🔥 Calories (ascending/descending)</li>
                  <li>💵 Price per kg (ascending/descending)</li>
                  <li>💰 <strong>Cost of 100 kcal</strong> (ascending/descending)</li>
                </ul>
              </li>
            </ul>
          </article>

          <article>
            <h3>Deleting Products</h3>
            <ul>
              <li><strong>Single product</strong>: Click 🗑️ next to the product</li>
              <li><strong>All products</strong>: Refresh the page (pull down or F5)</li>
            </ul>
          </article>
        </section>

        <section>
          <h2>💡 Practical Tips</h2>

          <article>
            <h3>Quick comparison of two products</h3>
            <ol>
              <li>Don&apos;t enter product names – go straight to calories and price.</li>
              <li>Add the first product.</li>
              <li>Add the second product.</li>
              <li>Compare the <strong>&quot;Cost of 100 kcal&quot;</strong> column – a lower value means a better price-to-nutritional-value ratio.</li>
            </ol>
          </article>

          <article>
            <h3>Usage Examples</h3>
            <div className="examples">
              <ul>
                <li><strong className="strong">Breakfast Cereal</strong>: &quot;Per Kilogram&quot; mode (350 kcal/100g, $8/kg)</li>
                <li><strong className="strong">Yogurt</strong>: &quot;Per Piece&quot; mode (150g, 80 kcal/100g, $2.50/piece)</li>
                <li><strong className="strong">Peanuts</strong>: &quot;Per Kilogram&quot; mode (580 kcal/100g, $25/kg)</li>
              </ul>
            </div>
          </article>
        </section>

        <section>
          <h2>ℹ️ Technical Information</h2>
          <ul>
            <li>The calculator <strong>rounds results to 2 decimal places</strong> for better readability.</li>
            <li>There&apos;s a cool-down period of 1 second between adding products to prevent spamming.</li>
            <li>You can add a maximum of 500 products.</li>
          </ul>
        </section>

        <section>
          <h2>Goal of the Calculator</h2>
          <div className="important">
            <p>The calculator shows you <strong>how much 100 kcal costs</strong> from a given product. The lower the value, the better the price-to-energy-value ratio of the product.</p>
          </div>

          <div className="highlight">
            <p>Remember: Calories and price aren&apos;t everything – also consider nutritional values, vitamins, and minerals when choosing products! 🥗</p>
          </div>
        </section>

        <section id="fun-fact-section">
          <h3>Fun Fact: Unlock Your Food Cost Insights!</h3>
          <p>Ever wondered about the real cost of your daily diet?</p>

          <ul>
            <li>
              <strong>Calculate your total food cost</strong> based on a specific daily calorie intake and the <strong>cost per 100 kcal</strong>.
            </li>
            <li>
              <strong>Compare two different scenarios</strong> to see the <strong>financial difference</strong> between two diets or ingredient choices over various periods (daily, weekly, monthly, yearly). This is super useful for understanding potential savings or increased spending!
            </li>
          </ul>
          <p id="lastParagraph">
            Whether you&apos;re tracking a standard daily calorie intake or managing different calorie targets for training and non-training days, this tool provides a <em>clear breakdown of your costs</em>. It&apos;s a <em>fantastic way to visualize the financial impact of your nutrition</em>!
          </p>
        </section>
      </main>
    </>
  );
}
