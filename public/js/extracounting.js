// Rate limiting for calculations
let lastCalculationTime = 0;
const CALCULATION_COOLDOWN = 1000; // 1 second in milliseconds

function checkRateLimit() {
    const currentTime = Date.now();
    const timeSinceLastCalculation = currentTime - lastCalculationTime;
    
    if (timeSinceLastCalculation < CALCULATION_COOLDOWN) {
        const remainingTime = Math.ceil((CALCULATION_COOLDOWN - timeSinceLastCalculation) / 1000);
        alert(`⏱️ Please wait ${remainingTime} seconds before calculating again!`);
        return false;
    }
    
    return true;
}

// Mode switching functions for the cost calculator
function switchCostMode(mode) {
    const slider = document.querySelector('.cost-mode-slider');
    const buttons = document.querySelectorAll('.cost-mode-btn');
    const sections = document.querySelectorAll('.cost-input-section');

    // Update buttons
    buttons.forEach((btn, index) => {
        btn.classList.toggle('active', index === mode);
    });

    // Move slider
    slider.style.transform = `translateX(${mode * 100}%)`;

    // Switch sections
    sections.forEach((section, index) => {
        section.classList.toggle('active', index === mode);
    });

    // Hide results
    document.getElementById('costResults').style.display = 'none';
}

// Function to scroll to results
function scrollToResults() {
    const resultsElement = document.getElementById('costResults');
    if (resultsElement) {
        resultsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Function to get the selected currency
function getSelectedCurrency() {
    try {
        const saved = localStorage.getItem('selectedCurrency');
        if (saved) {
            return JSON.parse(saved);
        }
        return { code: 'USD', name: 'US Dollar', symbol: '$' }; // Default currency
    } catch (error) {
        console.log('Error getting currency:', error);
        return { code: 'USD', name: 'US Dollar', symbol: '$' }; // Default currency
    }
}

// Function to update currency labels
function updateCurrencyLabels() {
    const currency = getSelectedCurrency();
    const costLabels = [
        'cost100kcal1',
        'cost100kcal2', 
        'dtCost100kcal1',
        'dtCost100kcal2'
    ];

    costLabels.forEach(id => {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
            const baseText = label.textContent.split(' (')[0]; // Removes previous currency
            label.textContent = `${baseText} (${currency.symbol})`;
        }
    });
}

// Validations for cost fields
function enforceCostLimits(input) {
    input.addEventListener('keypress', function(e) {
        const key = e.key;
        const currentValue = input.value;
        
        if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab') {
            return;
        }
        
        if (!/[0-9.,]/.test(key)) {
            e.preventDefault();
            return;
        }
        
        if (key === '.' || key === ',') {
            const hasDot = currentValue.includes('.');
            const hasComma = currentValue.includes(',');
            
            if (hasDot || hasComma) {
                e.preventDefault();
                return;
            }
        }
        
        if (/[0-9]/.test(key)) {
            const dotIndex = currentValue.indexOf('.');
            const commaIndex = currentValue.indexOf(',');
            const separatorIndex = Math.max(dotIndex, commaIndex);
            const cursorPos = input.selectionStart;
            
            if (separatorIndex !== -1 && cursorPos > separatorIndex) {
                const afterSeparator = currentValue.substring(separatorIndex + 1);
                if (afterSeparator.length >= 2) {
                    e.preventDefault();
                    return;
                }
            }
        }
    });
    
    input.addEventListener('input', (e) => {
        if (e.inputType === 'insertFromPaste') return;
        
        let value = input.value;
        const cursorPos = input.selectionStart;
        
        value = value.replace(',', '.');
        value = value.replace(/[^0-9.]/g, '');
        
        const firstDot = value.indexOf('.');
        if (firstDot !== -1) {
            const beforeDot = value.substring(0, firstDot);
            const afterDot = value.substring(firstDot + 1).replace(/\./g, '');
            value = beforeDot + '.' + afterDot;
        }
        
        const parts = value.split('.');
        if (parts.length > 1 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 5000) {
            value = '5000';
        }
        
        if (input.value !== value) {
            input.value = value;
            input.setSelectionRange(cursorPos, cursorPos);
        }
    });
    
    input.addEventListener('blur', () => {
        let value = input.value;
        
        if (value.endsWith('.')) {
            value = value.slice(0, -1);
        }
        
        const numValue = parseFloat(value);
        if (numValue > 5000) {
            input.value = '5000';
        } else if (value !== '') {
            input.value = value;
        }
    });
}

// Validations for calorie fields (max 20000)
function enforceCaloriesLimits(input) {
    input.addEventListener('keypress', function(e) {
        const key = e.key;
        
        if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab') {
            return;
        }
        
        if (!/[0-9]/.test(key)) {
            e.preventDefault();
            return;
        }
    });
    
    input.addEventListener('input', (e) => {
        let value = input.value;
        const cursorPos = input.selectionStart;
        
        value = value.replace(/[^0-9]/g, '');
        
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 20000) {
            value = '20000';
        }
        
        if (input.value !== value) {
            input.value = value;
            input.setSelectionRange(cursorPos, cursorPos);
        }
    });
    
    input.addEventListener('blur', () => {
        let value = input.value;
        const numValue = parseInt(value);
        
        if (isNaN(numValue) || value === '' || numValue < 1) {
            input.value = '';
        } else if (numValue > 20000) {
            input.value = '20000';
        } else {
            input.value = value;
        }
    });
}

// Validations for days (max 7)
function enforceDaysLimits(input) {
    input.addEventListener('keypress', function(e) {
        const key = e.key;
        
        if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab') {
            return;
        }
        
        if (!/[0-7]/.test(key)) {
            e.preventDefault();
            return;
        }
    });
    
    input.addEventListener('input', (e) => {
        let value = input.value;
        
        value = value.replace(/[^0-7]/g, '');
        
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 7) {
            value = '7';
        }
        
        input.value = value;
    });
}

// Cost calculation functions
function calculateNormalCost() {
    // Check rate limit first
    if (!checkRateLimit()) {
        return;
    }
    
    const dailyCalories = parseFloat(document.getElementById('dailyCalories').value);
    const cost1 = parseFloat(document.getElementById('cost100kcal1').value);
    const cost2 = parseFloat(document.getElementById('cost100kcal2').value);
    const currency = getSelectedCurrency();

    if (!dailyCalories || !cost1) {
        alert('Please fill in the required fields!');
        return;
    }

    const dailyCost1 = (dailyCalories / 100) * cost1;
    const weeklyCost1 = dailyCost1 * 7;
    const monthlyCost1 = dailyCost1 * 30;
    const yearlyCost1 = dailyCost1 * 365;

    let html = `
        <div class="cost-item">
            <h4>First Cost</h4>
            <div class="cost-value">Daily: <span>${dailyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Weekly: <span>${weeklyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Monthly: <span>${monthlyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Yearly: <span>${yearlyCost1.toFixed(2)} ${currency.symbol}</span></div>
        </div>
    `;

    if (cost2) {
        const dailyCost2 = (dailyCalories / 100) * cost2;
        const weeklyCost2 = dailyCost2 * 7;
        const monthlyCost2 = dailyCost2 * 30;
        const yearlyCost2 = dailyCost2 * 365;

        html += `
            <div class="cost-item">
                <h4>Second Cost</h4>
                <div class="cost-value">Daily: <span>${dailyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Weekly: <span>${weeklyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Monthly: <span>${monthlyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Yearly: <span>${yearlyCost2.toFixed(2)} ${currency.symbol}</span></div>
            </div>
        `;

        // Add differences
        const dailyDiff = Math.abs(dailyCost2 - dailyCost1);
        const weeklyDiff = Math.abs(weeklyCost2 - weeklyCost1);
        const monthlyDiff = Math.abs(monthlyCost2 - monthlyCost1);
        const yearlyDiff = Math.abs(yearlyCost2 - yearlyCost1);
        const isFirstCheaper = dailyCost1 < dailyCost2;

        html += `
            <div class="cost-item cost-item-difference">
                <h4>💰 Cost Difference ${isFirstCheaper ? '(first cheaper)' : '(second cheaper)'}</h4>
                <div class="cost-value">Daily: <span>${dailyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Weekly: <span>${weeklyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Monthly: <span>${monthlyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Yearly: <span>${yearlyDiff.toFixed(2)} ${currency.symbol}</span></div>
            </div>
        `;
    }

    document.getElementById('costComparison').innerHTML = html;
    document.getElementById('costResults').style.display = 'block';
    
    // Update last calculation time
    lastCalculationTime = Date.now();
    
    // Scroll to results after showing them
    setTimeout(() => {
        scrollToResults();
    }, 100);
}

function calculateDTDNTCost() {
    // Check rate limit first
    if (!checkRateLimit()) {
        return;
    }
    
    const trainingCalories = parseFloat(document.getElementById('trainingDayCalories').value);
    const nonTrainingCalories = parseFloat(document.getElementById('nonTrainingDayCalories').value);
    const trainingDays = parseInt(document.getElementById('trainingDaysPerWeek').value);
    const nonTrainingDays = parseInt(document.getElementById('nonTrainingDaysPerWeek').value);
    const cost1 = parseFloat(document.getElementById('dtCost100kcal1').value);
    const cost2 = parseFloat(document.getElementById('dtCost100kcal2').value);
    const currency = getSelectedCurrency();

    if (!trainingCalories || !nonTrainingCalories || trainingDays === '' || nonTrainingDays === '' || !cost1) {
        alert('Please fill in the required fields!');
        return;
    }

    if (trainingDays + nonTrainingDays !== 7) {
        alert('The sum of training and non-training days must be 7!');
        return;
    }

    const weeklyCalories = (trainingCalories * trainingDays) + (nonTrainingCalories * nonTrainingDays);
    const dailyAvgCalories = weeklyCalories / 7;

    const dailyCost1 = (dailyAvgCalories / 100) * cost1;
    const weeklyCost1 = dailyCost1 * 7;
    const monthlyCost1 = dailyCost1 * 30;
    const yearlyCost1 = dailyCost1 * 365;

    let html = `
        <div class="cost-item">
            <h4>First Cost (avg ${dailyAvgCalories.toFixed(0)} kcal/day)</h4>
            <div class="cost-value">Daily: <span>${dailyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Weekly: <span>${weeklyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Monthly: <span>${monthlyCost1.toFixed(2)} ${currency.symbol}</span></div>
            <div class="cost-value">Yearly: <span>${yearlyCost1.toFixed(2)} ${currency.symbol}</span></div>
        </div>
    `;

    if (cost2) {
        const dailyCost2 = (dailyAvgCalories / 100) * cost2;
        const weeklyCost2 = dailyCost2 * 7;
        const monthlyCost2 = dailyCost2 * 30;
        const yearlyCost2 = dailyCost2 * 365;

        html += `
            <div class="cost-item">
                <h4>Second Cost (avg ${dailyAvgCalories.toFixed(0)} kcal/day)</h4>
                <div class="cost-value">Daily: <span>${dailyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Weekly: <span>${weeklyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Monthly: <span>${monthlyCost2.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Yearly: <span>${yearlyCost2.toFixed(2)} ${currency.symbol}</span></div>
            </div>
        `;

        // Add differences
        const dailyDiff = Math.abs(dailyCost2 - dailyCost1);
        const weeklyDiff = Math.abs(weeklyCost2 - weeklyCost1);
        const monthlyDiff = Math.abs(monthlyCost2 - monthlyCost1);
        const yearlyDiff = Math.abs(yearlyCost2 - yearlyCost1);
        const isFirstCheaper = dailyCost1 < dailyCost2;

        html += `
            <div class="cost-item cost-item-difference">
                <h4>💰 Cost Difference ${isFirstCheaper ? '(first cheaper)' : '(second cheaper)'}</h4>
                <div class="cost-value">Daily: <span>${dailyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Weekly: <span>${weeklyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Monthly: <span>${monthlyDiff.toFixed(2)} ${currency.symbol}</span></div>
                <div class="cost-value">Yearly: <span>${yearlyDiff.toFixed(2)} ${currency.symbol}</span></div>
            </div>
        `;
    }

    document.getElementById('costComparison').innerHTML = html;
    document.getElementById('costResults').style.display = 'block';
    
    // Update last calculation time
    lastCalculationTime = Date.now();
    
    // Scroll to results after showing them
    setTimeout(() => {
        scrollToResults();
    }, 100);
}

// Applying validations to fields
document.addEventListener('DOMContentLoaded', function() {
    // Update currency labels on page load
    updateCurrencyLabels();

    // Cost fields
    const costInputs = [
        document.getElementById('cost100kcal1'),
        document.getElementById('cost100kcal2'),
        document.getElementById('dtCost100kcal1'),
        document.getElementById('dtCost100kcal2')
    ];
    costInputs.forEach(input => {
        if (input) enforceCostLimits(input);
    });

    // Calorie fields
    const calorieInputs = [
        document.getElementById('dailyCalories'),
        document.getElementById('trainingDayCalories'),
        document.getElementById('nonTrainingDayCalories')
    ];
    calorieInputs.forEach(input => {
        if (input) enforceCaloriesLimits(input);
    });

    // Day fields
    const dayInputs = [
        document.getElementById('trainingDaysPerWeek'),
        document.getElementById('nonTrainingDaysPerWeek')
    ];
    dayInputs.forEach(input => {
        if (input) enforceDaysLimits(input);
    });

    // Auto-fill opposite day value
    const trainingDaysInput = document.getElementById('trainingDaysPerWeek');
    const nonTrainingDaysInput = document.getElementById('nonTrainingDaysPerWeek');

    if (trainingDaysInput && nonTrainingDaysInput) {
        trainingDaysInput.addEventListener('input', function() {
            const trainingDays = parseInt(this.value) || 0;
            if (trainingDays >= 0 && trainingDays <= 7) {
                nonTrainingDaysInput.value = 7 - trainingDays;
            }
        });

        nonTrainingDaysInput.addEventListener('input', function() {
            const nonTrainingDays = parseInt(this.value) || 0;
            if (nonTrainingDays >= 0 && nonTrainingDays <= 7) {
                trainingDaysInput.value = 7 - nonTrainingDays;
            }
        });
    }

    // Listen for currency changes (if changed on another page)
    window.addEventListener('storage', function(e) {
        if (e.key === 'selectedCurrency') {
            updateCurrencyLabels();
        }
    });
});

// Event listeners initialization
document.addEventListener('DOMContentLoaded', function() {
    // Cost mode switching
    document.querySelectorAll('.cost-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = parseInt(this.getAttribute('data-cost-mode'));
            switchCostMode(mode);
        });
    });

    // Calculate buttons
    const calcNormalBtn = document.getElementById('calculateNormalBtn');
    if (calcNormalBtn) {
        calcNormalBtn.addEventListener('click', calculateNormalCost);
    }

    const calcDTDNTBtn = document.getElementById('calculateDTDNTBtn');
    if (calcDTDNTBtn) {
        calcDTDNTBtn.addEventListener('click', calculateDTDNTCost);
    }
});