import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
  targetTheme: Theme | null;
  startTransition: (callback: () => void) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to 'dark'
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      return saved || 'dark';
    }
    return 'dark';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<Theme | null>(null);

  // Sync theme with document and localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Set target theme FIRST (for display in transition)
    setTargetTheme(nextTheme);
    setIsTransitioning(true);
    
    // Wait for expand animation (600ms)
    setTimeout(() => {
      setTheme(nextTheme); // Change theme
      
      // Wait a bit then start reveal (200ms pause at full cover)
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetTheme(null); // Clear target after transition
      }, 200);
    }, 600);
  };

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    
    // Wait for expand animation (600ms)
    setTimeout(() => {
      callback(); // Change theme
      
      // Wait a bit then start reveal (200ms pause at full cover)
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetTheme(null);
      }, 200);
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      isTransitioning, 
      targetTheme, 
      startTransition 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
