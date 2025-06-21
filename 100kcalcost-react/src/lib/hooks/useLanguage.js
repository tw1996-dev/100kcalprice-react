'use client';

import { useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../constants/languages';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && LANGUAGES.find(lang => lang.code === savedLang)) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (langCode) => {
    const langData = LANGUAGES.find(lang => lang.code === langCode);
    if (!langData) return;

    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);

    // Handle redirects (same as original)
    switch(langCode) {
      case 'pl':
        alert('Przekierowanie do polskiej wersji strony...');
        // window.location.href = '/pl';
        break;
      case 'no':
        alert('Omdirigering til norsk versjon av siden...');
        // window.location.href = '/no';
        break;
      case 'en':
        window.location.href = '/';
        break;
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES
  };
}