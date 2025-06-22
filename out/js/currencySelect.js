// Currency data with ISO codes, names and symbols
const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' },
    { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا' },
    { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل' },
    { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
    { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
    { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
    { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
    { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸' },
    { code: 'UZS', name: 'Uzbekistani Som', symbol: "so'm" },
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾' },
    { code: 'AMD', name: 'Armenian Dram', symbol: '֏' },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
    { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨' },
    { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨' },
    { code: 'AFN', name: 'Afghan Afghani', symbol: '؋' },
    { code: 'IRR', name: 'Iranian Rial', symbol: '﷼' },
    { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼' },
    { code: 'OMR', name: 'Omani Rial', symbol: '﷼' },
    { code: 'YER', name: 'Yemeni Rial', symbol: '﷼' },
    { code: 'SYP', name: 'Syrian Pound', symbol: '£' },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
    { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U' },
    { code: 'PYG', name: 'Paraguayan Guarani', symbol: 'Gs' },
    { code: 'BOB', name: 'Bolivian Boliviano', symbol: '$b' },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.' },
    { code: 'COP', name: 'Colombian Peso', symbol: '$' },
    { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs' },
    { code: 'GYD', name: 'Guyanese Dollar', symbol: '$' },
    { code: 'SRD', name: 'Surinamese Dollar', symbol: '$' },
    { code: 'TTD', name: 'Trinidad Dollar', symbol: 'TT$' },
    { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$' },
    { code: 'BBD', name: 'Barbadian Dollar', symbol: '$' },
    { code: 'BSD', name: 'Bahamian Dollar', symbol: '$' },
    { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$' },
    { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q' },
    { code: 'HNL', name: 'Honduran Lempira', symbol: 'L' },
    { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$' },
    { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡' },
    { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.' },
    { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$' },
    { code: 'HTG', name: 'Haitian Gourde', symbol: 'G' },
    { code: 'CUP', name: 'Cuban Peso', symbol: '₱' },
    { code: 'XCD', name: 'East Caribbean Dollar', symbol: '$' },
    { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ' },
    { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ' },
    { code: 'SVC', name: 'Salvadoran Colón', symbol: '$' },
    { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr' },
    { code: 'ALL', name: 'Albanian Lek', symbol: 'L' },
    { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден' },
    { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
    { code: 'MDL', name: 'Moldovan Leu', symbol: 'L' },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
    { code: 'SOS', name: 'Somali Shilling', symbol: 'S' },
    { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' },
    { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk' },
    { code: 'RWF', name: 'Rwandan Franc', symbol: 'R₣' },
    { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' },
    { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
    { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA' },
    { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA' },
    { code: 'KMF', name: 'Comorian Franc', symbol: 'CF' },
    { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨' },
    { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨' },
    { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'UM' },
    { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$' },
    { code: 'STP', name: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
    { code: 'GNF', name: 'Guinean Franc', symbol: 'FG' },
    { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le' },
    { code: 'LRD', name: 'Liberian Dollar', symbol: '$' },
    { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' },
    { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' },
    { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' },
    { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK' },
    { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT' },
    { code: 'BWP', name: 'Botswanan Pula', symbol: 'P' },
    { code: 'NAD', name: 'Namibian Dollar', symbol: '$' },
    { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L' },
    { code: 'LSL', name: 'Lesotho Loti', symbol: 'M' },
    { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar' },
    { code: 'FJD', name: 'Fijian Dollar', symbol: '$' },
    { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K' },
    { code: 'SBD', name: 'Solomon Islands Dollar', symbol: '$' },
    { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT' },
    { code: 'WST', name: 'Samoan Tala', symbol: 'WS$' },
    { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$' },
    { code: 'TVD', name: 'Tuvaluan Dollar', symbol: '$' },
    { code: 'KI', name: 'Kiribati Dollar', symbol: '$' },
    { code: 'NRU', name: 'Nauruan Dollar', symbol: '$' },
    { code: 'PW', name: 'Palauan Dollar', symbol: '$' },
    { code: 'MH', name: 'Marshallese Dollar', symbol: '$' },
    { code: 'FM', name: 'Micronesian Dollar', symbol: '$' }
];

// Currency selector functionality
let selectedCurrency = null;

// Load saved currency from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedCurrency();
    initializeCurrencySelector();
});

// ========== CURRENCY STORAGE FUNCTIONS  ==========
function loadSavedCurrency() {
    try {
        const saved = localStorage.getItem('selectedCurrency');
        if (saved) {
            selectedCurrency = JSON.parse(saved);
            updateSelectedCurrencyDisplay();
        }
    } catch (error) {
        console.log('Error loading saved currency:', error);
    }
}

function saveCurrency(currency) {
    try {
        localStorage.setItem('selectedCurrency', JSON.stringify(currency));
        selectedCurrency = currency;
        updateSelectedCurrencyDisplay();
    } catch (error) {
        console.log('Error saving currency:', error);
    }
}

function updateSelectedCurrencyDisplay() {
    const selectedDisplay = document.getElementById('selected-currency');
    const selectedText = document.getElementById('selected-currency-display');
    
    if (selectedCurrency && selectedDisplay && selectedText) {
        selectedText.innerHTML = `<strong>${selectedCurrency.code}</strong> - ${selectedCurrency.name} (${selectedCurrency.symbol})`;
        selectedDisplay.classList.add('show');
    }
}


function initializeCurrencySelector() {
    const searchInput = document.getElementById('currency-search');
    const resultsContainer = document.getElementById('currency-results');

    if (!searchInput || !resultsContainer) return;

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            resultsContainer.classList.remove('show');
            return;
        }

        // Filter currencies based on search term
        const filteredCurrencies = currencies.filter(currency => 
            currency.code.toLowerCase().includes(searchTerm) ||
            currency.name.toLowerCase().includes(searchTerm)
        );

        displayCurrencyResults(filteredCurrencies, resultsContainer);
    });

    // Hide results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#currency-selector')) {
            resultsContainer.classList.remove('show');
        }
    });

    // Show all currencies when focusing on empty input
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length === 0) {
            displayCurrencyResults(currencies.slice(0, 20), resultsContainer); // Show first 20
        }
    });
}

function displayCurrencyResults(currenciesToShow, container) {
    if (currenciesToShow.length === 0) {
        container.innerHTML = '<div class="currency-option currency-option-empty">No currencies found</div>';
        container.classList.add('show');
        return;
    }

    container.innerHTML = currenciesToShow.map(currency => `
        <div class="currency-option" data-code="${currency.code}" data-name="${currency.name}" data-symbol="${currency.symbol}">
            <span class="currency-code">${currency.code}</span>
            <span class="currency-name">${currency.name}</span>
            <span class="currency-symbol">${currency.symbol}</span>
        </div>
    `).join('');
    
    container.classList.add('show');
}

// Event delegation for currency options
document.addEventListener('click', function(e) {
    const option = e.target.closest('.currency-option');
    if (option && !option.classList.contains('currency-option-empty')) {
        const code = option.getAttribute('data-code');
        const name = option.getAttribute('data-name');
        const symbol = option.getAttribute('data-symbol');
        if (code && name && symbol) {
            selectCurrency(code, name, symbol);
        }
    }
});

function selectCurrency(code, name, symbol) {
    const currency = { code, name, symbol };
    saveCurrency(currency);
    
    // Clear search input and hide results
    const searchInput = document.getElementById('currency-search');
    const resultsContainer = document.getElementById('currency-results');
    
    if (searchInput) searchInput.value = '';
    if (resultsContainer) resultsContainer.classList.remove('show');
    
    // Show success message
    const tempMessage = document.createElement('div');
    tempMessage.className = 'currency-success-message';
    tempMessage.textContent = `✅ Currency set to ${code} (${symbol})`;
    
    document.body.appendChild(tempMessage);
    
    setTimeout(() => {
        tempMessage.remove();
    }, 3000);
}


// ========== FUNCTION TO GET SELECTED CURRENCY FOR CALCULATOR  ==========
// This function can be called from the calculator page to get the selected currency
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

// Export function to global scope for use in other files
window.getSelectedCurrency = getSelectedCurrency;