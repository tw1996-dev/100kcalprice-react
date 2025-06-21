// Language data - only 3 languages as in original
const languages = [
    { code: 'en', name: 'English', native: 'English', flag: 'gb' },
    { code: 'pl', name: 'Polish', native: 'Polski', flag: 'pl' },
    { code: 'no', name: 'Norwegian', native: 'Norsk', flag: 'no' }
];

let currentLanguage = 'en';
let isDropdownOpen = false;

// Initialize language selector on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSelector();
});

// Initialize language selector
function initializeLanguageSelector() {
    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && languages.find(lang => lang.code === savedLang)) {
        currentLanguage = savedLang;
        updateCurrentFlag();
    }
    
    // Set up language toggle click handler - TO BYŁO BRAKUJĄCE!
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguageDropdown);
    }
    
    // Set up search input
    const searchInput = document.getElementById('language-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleLanguageSearch);
        
        // Prevent dropdown from closing when clicking on search input
        searchInput.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Prevent dropdown from closing when clicking inside
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Initialize language list
    renderLanguageList(languages);
}

// Render language list
function renderLanguageList(languagesToShow) {
    const languageList = document.getElementById('language-list');
    if (!languageList) return;
    
    if (languagesToShow.length === 0) {
        languageList.innerHTML = '<div class="no-results">No languages found</div>';
        return;
    }

    languageList.innerHTML = languagesToShow.map(lang => `
        <div class="language-option ${lang.code === currentLanguage ? 'active' : ''}" 
             data-code="${lang.code}">
            <img src="flags/${lang.flag}.svg" 
                 alt="${lang.name} flag">
            <div class="language-info">
                <span class="language-name">${lang.name}</span>
                <span class="language-native">${lang.native}</span>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for language options
    const languageOptions = languageList.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const langCode = this.getAttribute('data-code');
            changeLanguage(langCode);
        });
    });
}

// Handle language search
function handleLanguageSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    const filtered = languages.filter(lang => 
        lang.name.toLowerCase().includes(searchTerm) ||
        lang.native.toLowerCase().includes(searchTerm) ||
        lang.code.toLowerCase().includes(searchTerm)
    );
    
    renderLanguageList(filtered);
}

// Update current flag
function updateCurrentFlag() {
    const currentFlag = document.getElementById('current-flag');
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    
    if (currentFlag && currentLang) {
        currentFlag.src = `flags/${currentLang.flag}.svg`;
        currentFlag.alt = currentLang.name;
    }
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');
    const searchInput = document.getElementById('language-search-input');
    
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
        dropdown.classList.add('show');
        toggle.classList.add('active');
        
        // Reset search and focus
        if (searchInput) {
            searchInput.value = '';
            setTimeout(() => searchInput.focus(), 100); // Small delay for smooth animation
        }
        
        // Reset language list to show all
        renderLanguageList(languages);
    } else {
        dropdown.classList.remove('show');
        toggle.classList.remove('active');
    }
}

// Change language function
function changeLanguage(selectedLang) {
    const langData = languages.find(lang => lang.code === selectedLang);
    if (!langData) return;
    
    currentLanguage = selectedLang;
    
    // Save language preference
    localStorage.setItem('selectedLanguage', selectedLang);
    
    // Update current flag
    updateCurrentFlag();
    
    // Close dropdown
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');
    dropdown.classList.remove('show');
    toggle.classList.remove('active');
    isDropdownOpen = false;
    
    // Show alert (as per original implementation)
    switch(selectedLang) {
        case 'pl':
            alert('Przekierowanie do polskiej wersji strony...');
            // window.location.href = 'index-pl.html';
            break;
        case 'no':
            alert('Omdirigering til norsk versjon av siden...');
            // window.location.href = 'index-no.html';
            break;
        case 'en':
            window.location.href = 'index.html';
            break;
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const selector = document.getElementById('language-selector');
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');
    
    if (!selector || !selector.contains(event.target)) {
        if (isDropdownOpen) {
            dropdown.classList.remove('show');
            toggle.classList.remove('active');
            isDropdownOpen = false;
        }
    }
});

// Close dropdown on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isDropdownOpen) {
        toggleLanguageDropdown();
    }
});