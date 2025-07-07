'use client';

import { useState, useEffect } from 'react';
import { FaUniversalAccess, FaFont, FaAdjust, FaTimes, FaLink, FaAlignRight, FaMousePointer, FaKeyboard } from 'react-icons/fa';

export default function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(100);
  const [showCursor, setShowCursor] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);

  useEffect(() => {
    // טוען הגדרות שמורות
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize ?? 100);
      setContrast(settings.contrast ?? false);
      setHighlightLinks(settings.highlightLinks ?? false);
      setLineSpacing(settings.lineSpacing ?? 100);
      setShowCursor(settings.showCursor ?? false);
      setKeyboardNav(settings.keyboardNav ?? false);
      applySettings(settings);
    }
  }, []);

  const applySettings = (settings: any) => {
    const root = document.documentElement;
    
    // גודל טקסט
    root.style.fontSize = `${settings.fontSize ?? fontSize}%`;
    
    // ניגודיות
    if (settings.contrast ?? contrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // הדגשת קישורים
    if (settings.highlightLinks ?? highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }

    // ריווח שורות
    root.style.setProperty('--line-spacing', `${settings.lineSpacing ?? lineSpacing}%`);

    // סמן מוגדל
    if (settings.showCursor ?? showCursor) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }

    // ניווט מקלדת
    if (settings.keyboardNav ?? keyboardNav) {
      root.classList.add('keyboard-nav');
    } else {
      root.classList.remove('keyboard-nav');
    }

    // שומר הגדרות
    localStorage.setItem('accessibilitySettings', JSON.stringify({
      fontSize: settings.fontSize ?? fontSize,
      contrast: settings.contrast ?? contrast,
      highlightLinks: settings.highlightLinks ?? highlightLinks,
      lineSpacing: settings.lineSpacing ?? lineSpacing,
      showCursor: settings.showCursor ?? showCursor,
      keyboardNav: settings.keyboardNav ?? keyboardNav
    }));
  };

  const handleFontSizeChange = (increase: boolean) => {
    const newSize = increase ? Math.min(fontSize + 10, 200) : Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    applySettings({ fontSize: newSize });
  };

  const handleLineSpacingChange = (increase: boolean) => {
    const newSpacing = increase ? Math.min(lineSpacing + 10, 200) : Math.max(lineSpacing - 10, 100);
    setLineSpacing(newSpacing);
    applySettings({ lineSpacing: newSpacing });
  };

  const toggleSetting = (setting: string, value: boolean) => {
    switch (setting) {
      case 'contrast':
        setContrast(value);
        applySettings({ contrast: value });
        break;
      case 'highlightLinks':
        setHighlightLinks(value);
        applySettings({ highlightLinks: value });
        break;
      case 'showCursor':
        setShowCursor(value);
        applySettings({ showCursor: value });
        break;
      case 'keyboardNav':
        setKeyboardNav(value);
        applySettings({ keyboardNav: value });
        break;
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100,
      contrast: false,
      highlightLinks: false,
      lineSpacing: 100,
      showCursor: false,
      keyboardNav: false
    };
    
    setFontSize(100);
    setContrast(false);
    setHighlightLinks(false);
    setLineSpacing(100);
    setShowCursor(false);
    setKeyboardNav(false);
    
    applySettings(defaultSettings);
  };

  return (
    <>
      {/* כפתור נגישות */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[9999] bg-blue-600 hover:bg-blue-700 text-white rounded-l-full pr-4 pl-6 py-4 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="פתח תפריט נגישות"
      >
        <FaUniversalAccess className="w-6 h-6" />
      </button>

      {/* תפריט נגישות */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
          {/* רקע כהה */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* תפריט */}
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 id="accessibility-title" className="text-xl font-semibold">הגדרות נגישות</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="סגור תפריט נגישות"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* גודל טקסט */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaFont /> גודל טקסט
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleFontSizeChange(false)}
                    className="btn-secondary px-4 py-2"
                    disabled={fontSize <= 80}
                    aria-label="הקטן גודל טקסט"
                  >
                    א-
                  </button>
                  <span className="text-lg font-medium">{fontSize}%</span>
                  <button
                    onClick={() => handleFontSizeChange(true)}
                    className="btn-secondary px-4 py-2"
                    disabled={fontSize >= 200}
                    aria-label="הגדל גודל טקסט"
                  >
                    א+
                  </button>
                </div>
              </div>

              {/* ריווח שורות */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaAlignRight /> ריווח שורות
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleLineSpacingChange(false)}
                    className="btn-secondary px-4 py-2"
                    disabled={lineSpacing <= 100}
                    aria-label="הקטן ריווח שורות"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{lineSpacing}%</span>
                  <button
                    onClick={() => handleLineSpacingChange(true)}
                    className="btn-secondary px-4 py-2"
                    disabled={lineSpacing >= 200}
                    aria-label="הגדל ריווח שורות"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ניגודיות */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaAdjust /> ניגודיות
                </h3>
                <button
                  onClick={() => toggleSetting('contrast', !contrast)}
                  className={`w-full btn-secondary py-2 ${contrast ? 'bg-gray-800 text-white' : ''}`}
                  aria-pressed={contrast}
                >
                  {contrast ? 'בטל ניגודיות גבוהה' : 'הפעל ניגודיות גבוהה'}
                </button>
              </div>

              {/* הדגשת קישורים */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaLink /> הדגשת קישורים
                </h3>
                <button
                  onClick={() => toggleSetting('highlightLinks', !highlightLinks)}
                  className={`w-full btn-secondary py-2 ${highlightLinks ? 'bg-gray-800 text-white' : ''}`}
                  aria-pressed={highlightLinks}
                >
                  {highlightLinks ? 'בטל הדגשת קישורים' : 'הפעל הדגשת קישורים'}
                </button>
              </div>

              {/* סמן מוגדל */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaMousePointer /> סמן מוגדל
                </h3>
                <button
                  onClick={() => toggleSetting('showCursor', !showCursor)}
                  className={`w-full btn-secondary py-2 ${showCursor ? 'bg-gray-800 text-white' : ''}`}
                  aria-pressed={showCursor}
                >
                  {showCursor ? 'בטל סמן מוגדל' : 'הפעל סמן מוגדל'}
                </button>
              </div>

              {/* הדגשת מקש Tab */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FaKeyboard /> הדגשת מקש Tab
                </h3>
                <button
                  onClick={() => toggleSetting('keyboardNav', !keyboardNav)}
                  className={`w-full btn-secondary py-2 ${keyboardNav ? 'bg-gray-800 text-white' : ''}`}
                  aria-pressed={keyboardNav}
                >
                  {keyboardNav ? 'בטל הדגשת מקש Tab' : 'הפעל הדגשת מקש Tab'}
                </button>
              </div>

              {/* איפוס הגדרות */}
              <div className="pt-4 border-t">
                <button
                  onClick={resetSettings}
                  className="w-full btn-secondary py-2 text-red-600 hover:text-red-700"
                  aria-label="אפס את כל הגדרות הנגישות"
                >
                  אפס הגדרות
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 