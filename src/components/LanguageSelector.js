'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../lib/hooks/useLanguage';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languages);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter languages based on search
  useEffect(() => {
    const filtered = languages.filter(lang =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLanguages(filtered);
  }, [searchTerm, languages]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm('');
    }
  };

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsDropdownOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div id="language-selector" ref={dropdownRef}>
      <button
        id="language-toggle"
        className={isDropdownOpen ? 'active' : ''}
        onClick={toggleDropdown}
        aria-label="Language selection"
        aria-expanded={isDropdownOpen}
      >
        {currentLang && (
          <img
            id="current-flag"
            src={`/flags/${currentLang.flag}.svg`}
            alt={currentLang.name}
            width={24}
            height={16}
          />
        )}
      </button>

      <div
        id="language-dropdown"
        className={`language-dropdown ${isDropdownOpen ? 'show' : ''}`}
      >
        <div className="language-search">
          <input
            ref={searchInputRef}
            id="language-search-input"
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div id="language-list" className="language-list">
          {filteredLanguages.length === 0 ? (
            <div className="no-results">No languages found</div>
          ) : (
            filteredLanguages.map(lang => (
              <div
                key={lang.code}
                className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <img
                  src={`/flags/${lang.flag}.svg`}
                  alt={`${lang.name} flag`}
                  width={24}
                  height={16}
                />
                <div className="language-info">
                  <span className="language-name">{lang.name}</span>
                  <span className="language-native">{lang.native}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}