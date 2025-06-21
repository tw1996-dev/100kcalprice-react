let products = [];
let productIdCounter = 1;
let autoProductCounter = 1;
let currentMode = 0; // 0 = kg, 1 = piece
let sortColumn = null;
let sortDirection = 'asc';

// Currency support variables
let currentCurrency = { code: 'USD', name: 'US Dollar', symbol: '$' }; // Default currency



// Update input labels with current currency symbol
function updateCurrencyLabelsAndPlaceholders() {
    const currencySymbol = currentCurrency.symbol;
    
    // Update labels for price inputs
    const priceLabels = [
        { id: 'pricePerKg', text: `Price per kg (${currencySymbol})` },
        { id: 'pricePerPiece', text: `Price per piece (${currencySymbol})` },
        { id: 'pricePerKg2', text: `Price per kg (${currencySymbol})` }
    ];
    
    priceLabels.forEach(labelInfo => {
        const label = document.querySelector(`label[for="${labelInfo.id}"]`);
        if (label) {
            label.textContent = labelInfo.text;
        }
    });
}

// Load selected currency from localStorage
function loadSelectedCurrency() {
    try {
        const saved = localStorage.getItem('selectedCurrency');
        if (saved) {
            currentCurrency = JSON.parse(saved);
        }
        // Always update display regardless of whether currency was loaded from storage
        updateCurrencyDisplay();
    } catch (error) {
        console.log('Error loading currency:', error);
        // Keep default currency and update display
        updateCurrencyDisplay();
    }
}

// Update currency symbol throughout the interface
function updateCurrencyDisplay() {
    // Update all currency symbols in the table headers and content
    const currencyElements = document.querySelectorAll('.currency-symbol');
    currencyElements.forEach(element => {
        element.textContent = currentCurrency.symbol;
    });
    
    // Update input labels and placeholders with currency symbol
    updateCurrencyLabelsAndPlaceholders();
    
    // Update any existing product displays
    renderTable();
}

// Get current currency symbol for use in formatting
function getCurrencySymbol() {
    return currentCurrency.symbol;
}

// Format numbers with commas instead of dots and max 2 decimal places
function formatNumber(number, maxDecimals = 2) {
    // Round to maximum maxDecimals decimal places
    const rounded = Math.round(number * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals);
    // Replace dot with comma
    return rounded.toString().replace('.', ',');
}

// Format price with current currency symbol
function formatPrice(price, maxDecimals = 2) {
    const formattedNumber = formatNumber(price, maxDecimals);
    return `${formattedNumber} ${getCurrencySymbol()}`;
}

function calculateCostPer100Kcal(caloriesPer100g, pricePerKg) {
    const caloriesPerKg = caloriesPer100g * 10;
    const costPer100Kcal = (pricePerKg / caloriesPerKg) * 100;
    return costPer100Kcal;
}

function calculateCostPer100KcalFromPiece(pieceWeight, caloriesPer100g, pricePerPiece) {
    // Calories per piece
    const caloriesPerPiece = (caloriesPer100g * pieceWeight) / 100;
    // Cost per kcal
    const costPerKcal = pricePerPiece / caloriesPerPiece;
    // Cost per 100 kcal
    const costPer100Kcal = costPerKcal * 100;
    return costPer100Kcal;
}

function generateUniqueProductName(originalName) {
    // If no name is provided, use an automatic one
    if (!originalName || originalName.trim() === '') {
        return `Product${autoProductCounter++}`;
    }

    const baseName = originalName.trim();

    // Check if the name already exists
    const existingNames = products.map(p => p.name);

    if (!existingNames.includes(baseName)) {
        return baseName;
    }

    // Find the first available version with a number
    let counter = 1;
    let newName;

    do {
        newName = `${baseName}${counter}`;
        counter++;
    } while (existingNames.includes(newName));

    return newName;
}

function updateFloatingLabels() {
    // Update all input fields to handle floating labels
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        if (input.value && input.value !== '') {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
}

// Security limits
const MAX_PRODUCTS = 500;
let lastProductAddTime = 0;
const ADD_PRODUCT_COOLDOWN = 1000; // 1 second in milliseconds

function checkRateLimit() {
    const currentTime = Date.now();
    const timeSinceLastAdd = currentTime - lastProductAddTime;
    
    if (timeSinceLastAdd < ADD_PRODUCT_COOLDOWN) {
        const remainingTime = Math.ceil((ADD_PRODUCT_COOLDOWN - timeSinceLastAdd) / 1000);
        alert(`⏱️ Please wait ${remainingTime} seconds before adding another product!`);
        return false;
    }
    
    return true;
}

function checkProductLimit() {
    if (products.length >= MAX_PRODUCTS) {
        alert(`⚠️ Maximum number of products (${MAX_PRODUCTS}) reached. Delete some products to add new ones.`);
        return false;
    }
    return true;
}

function switchMode(mode) {
    currentMode = mode;
    const slider = document.querySelector('.mode-slider');
    const buttons = document.querySelectorAll('.mode-btn');
    const sections = document.querySelectorAll('.input-section');

    // Update slider position
    if (mode === 1) {
        slider.classList.add('right');
    } else {
        slider.classList.remove('right');
    }

    // Update active button
    buttons.forEach((btn, index) => {
        btn.classList.toggle('active', index === mode);
    });

    // Update active section
    sections.forEach((section, index) => {
        section.classList.toggle('active', index === mode);
    });

    // Update floating labels after mode switch
    setTimeout(() => {
        updateFloatingLabels();
    }, 300);
}

function addProductKg() {
    // Check security limits
    if (!checkProductLimit() || !checkRateLimit()) {
        return;
    }

    const originalProductName = document.getElementById('productName1').value;
    const calories = parseFloat(document.getElementById('calories1').value);
    const pricePerKg = parseFloat(document.getElementById('pricePerKg').value);

    if (!validateInputs(null, calories, pricePerKg, null, null)) return;

    const productName = generateUniqueProductName(originalProductName);
    const costPer100Kcal = calculateCostPer100Kcal(calories, pricePerKg);

    const product = {
        id: productIdCounter++,
        name: productName,
        calories: calories,
        price: pricePerKg,
        priceUnit: 'kg',
        costPer100Kcal: costPer100Kcal
    };

    addProductToList(product);
    clearInputsKg();
    
    // Update rate limit timestamp
    lastProductAddTime = Date.now();
}

function addProductPiece() {
    // Check security limits
    if (!checkProductLimit() || !checkRateLimit()) {
        return;
    }

    const originalProductName = document.getElementById('productName2').value;
    const pieceWeight = parseFloat(document.getElementById('pieceWeight').value);
    const calories = parseFloat(document.getElementById('calories2').value);
    const pricePerPiece = parseFloat(document.getElementById('pricePerPiece').value);
    const pricePerKg2 = parseFloat(document.getElementById('pricePerKg2').value);

    if (!validateInputs(null, calories, null, pieceWeight, pricePerPiece, pricePerKg2)) return;

    const productName = generateUniqueProductName(originalProductName);
    let costPer100Kcal;
    let pricePerKg;

    if (pricePerPiece && pricePerPiece > 0) {
        // Calculate from piece price
        costPer100Kcal = calculateCostPer100KcalFromPiece(pieceWeight, calories, pricePerPiece);
        pricePerKg = (pricePerPiece / pieceWeight) * 1000;
    } else if (pricePerKg2 && pricePerKg2 > 0) {
        // Calculate from kg price
        costPer100Kcal = calculateCostPer100Kcal(calories, pricePerKg2);
        pricePerKg = pricePerKg2;
    } else {
        alert('❌ Enter a price per piece OR per kilogram!');
        return;
    }

    const product = {
        id: productIdCounter++,
        name: productName,
        calories: calories,
        price: pricePerKg,
        priceUnit: 'kg',
        costPer100Kcal: costPer100Kcal
    };

    addProductToList(product);
    clearInputsPiece();
    
    // Update rate limit timestamp
    lastProductAddTime = Date.now();
}

function validateInputs(productName, calories, pricePerKg, pieceWeight, pricePerPiece, pricePerKg2) {
    // Product name is not required

    if (!calories || calories <= 0) {
        alert('❌ Enter a valid calorie value (greater than 0)!');
        return false;
    }

    if (currentMode === 0) {
        if (!pricePerKg || pricePerKg <= 0) {
            alert('❌ Enter a valid price per kg (greater than 0)!');
            return false;
        }
    } else {
        if (!pieceWeight || pieceWeight <= 0) {
            alert('❌ Enter a valid piece weight (greater than 0)!');
            return false;
        }
        if ((!pricePerPiece || pricePerPiece <= 0) && (!pricePerKg2 || pricePerKg2 <= 0)) {
            alert('❌ Enter a price per piece OR per kilogram!');
            return false;
        }
    }

    return true;
}

function addProductToList(product) {
    products.push(product);
    renderTable();
}

function sortTable(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    products.sort((a, b) => {
        let valueA, valueB;
        
        switch (column) {
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
            if (sortDirection === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        } else {
            if (sortDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        }
    });

    renderTable();
}

function deleteProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        renderTable();
    }
}

// Render products table
function renderTable() {
    const tbody = document.getElementById('productTableBody');

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr class="no-products">
                <td colspan="5">Add your first product to see cost comparison! 🚀</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map((product, index) => `
        <tr>
            <td><strong>${product.name}</strong></td>
            <td>${formatNumber(product.calories)} kcal</td>
            <td>${formatPrice(product.price)}</td>
            <td class="cost-cell">${formatPrice(product.costPer100Kcal)}</td>
            <td>
                <button class="delete-btn" data-product-id="${product.id}">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

function clearInputsKg() {
    document.getElementById('productName1').value = '';
    document.getElementById('calories1').value = '';
    document.getElementById('pricePerKg').value = '';
    updateFloatingLabels();
    // Remove automatic focus after clearing inputs
    document.activeElement.blur();
}

function clearInputsPiece() {
    document.getElementById('productName2').value = '';
    document.getElementById('pieceWeight').value = '';
    document.getElementById('calories2').value = '';
    document.getElementById('pricePerPiece').value = '';
    document.getElementById('pricePerKg2').value = '';
    
    // Re-enable both price fields
    document.getElementById('pricePerPiece').disabled = false;
    document.getElementById('pricePerKg2').disabled = false;
    
    updateFloatingLabels();
    // Remove automatic focus after clearing inputs
    document.activeElement.blur();
}

// Event listeners
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (currentMode === 0) {
            addProductKg();
        } else {
            addProductPiece();
        }
    }
});

// Add input event listeners for floating labels and mutual exclusion
document.addEventListener('input', function (e) {
    updateFloatingLabels();

    // Handle mutual exclusion for price inputs - only block when the other field has a value
    if (e.target.id === 'pricePerPiece') {
        const pricePerKg2 = document.getElementById('pricePerKg2');
        if (e.target.value && e.target.value !== '' && parseFloat(e.target.value) > 0) {
            pricePerKg2.disabled = true;
            pricePerKg2.value = '';
        } else {
            pricePerKg2.disabled = false;
        }
        updateFloatingLabels();
    }

    if (e.target.id === 'pricePerKg2') {
        const pricePerPiece = document.getElementById('pricePerPiece');
        if (e.target.value && e.target.value !== '' && parseFloat(e.target.value) > 0) {
            pricePerPiece.disabled = true;
            pricePerPiece.value = '';
        } else {
            pricePerPiece.disabled = false;
        }
        updateFloatingLabels();
    }
});

// Additional event listeners for paste support and floating labels
document.addEventListener('paste', function(e) {
    // Allow natural paste behavior, then update floating labels
    setTimeout(() => {
        updateFloatingLabels();
    }, 10);
});

// Focus and blur event listeners
document.addEventListener('focus', updateFloatingLabels, true);
document.addEventListener('blur', updateFloatingLabels, true);

// Initialize on load
window.onload = function () {
    // Load selected currency from localStorage
    loadSelectedCurrency();
    
    updateFloatingLabels();
    
    // Add click listeners for table sorting
    const headers = document.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            sortTable(column);
        });
    });

    // Event listeners for mode switching
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = parseInt(this.getAttribute('data-mode'));
            switchMode(mode);
        });
    });

    // Event listeners for add product buttons
    const addKgBtn = document.getElementById('addProductKgBtn');
    if (addKgBtn) {
        addKgBtn.addEventListener('click', addProductKg);
    }

    const addPieceBtn = document.getElementById('addProductPieceBtn');
    if (addPieceBtn) {
        addPieceBtn.addEventListener('click', addProductPiece);
    }

    // Make deleteProduct globally accessible for dynamic buttons
    window.deleteProduct = deleteProduct;
};

// Add event delegation for delete buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const productId = parseInt(e.target.getAttribute('data-product-id'));
        deleteProduct(productId);
    }
});