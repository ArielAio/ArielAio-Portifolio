/**
 * Theme Classes Mapping
 * 
 * Centralized theme-aware class names for consistent theming across the app.
 * Usage: const classes = useThemeClasses(); → classes.bg.base
 */

export type Theme = 'dark' | 'light';

export interface ThemeClasses {
  bg: {
    base: string;
    secondary: string;
    tertiary: string;
    card: string;
    cardHover: string;
    overlay: string;
    input: string;
    inputFocus: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  border: {
    subtle: string;
    default: string;
    strong: string;
    focus: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  effects: {
    glass: string;
    glassHover: string;
    glow: string;
  };
}

export const themeClasses: Record<Theme, ThemeClasses> = {
  dark: {
    bg: {
      base: 'bg-[#020617]',
      secondary: 'bg-slate-900',
      tertiary: 'bg-slate-800',
      card: 'bg-white/[0.03]',
      cardHover: 'bg-white/[0.05]',
      overlay: 'bg-[#020617]/80',
      input: 'bg-[#020617]/50',
      inputFocus: 'bg-[#020617]/80',
    },
    text: {
      primary: 'text-white',
      secondary: 'text-gray-400',
      muted: 'text-gray-500',
      inverse: 'text-slate-900',
    },
    border: {
      subtle: 'border-white/10',
      default: 'border-white/20',
      strong: 'border-white/30',
      focus: 'border-primary',
    },
    shadow: {
      sm: 'shadow-sm shadow-black/20',
      md: 'shadow-md shadow-black/30',
      lg: 'shadow-lg shadow-black/40',
      xl: 'shadow-2xl shadow-black/50',
    },
    effects: {
      glass: 'backdrop-blur-md bg-white/[0.03]',
      glassHover: 'backdrop-blur-lg bg-white/[0.05]',
      glow: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    },
  },
  light: {
    bg: {
      base: 'bg-gray-50',
      secondary: 'bg-gray-100',
      tertiary: 'bg-gray-200',
      card: 'bg-white/95',
      cardHover: 'bg-white',
      overlay: 'bg-gray-900/5',
      input: 'bg-white',
      inputFocus: 'bg-white',
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-600',
      inverse: 'text-white',
    },
    border: {
      subtle: 'border-gray-300',
      default: 'border-gray-400',
      strong: 'border-gray-500',
      focus: 'border-primary',
    },
    shadow: {
      sm: 'shadow-sm shadow-gray-900/10',
      md: 'shadow-md shadow-gray-900/15',
      lg: 'shadow-lg shadow-gray-900/20',
      xl: 'shadow-2xl shadow-gray-900/25',
    },
    effects: {
      glass: 'backdrop-blur-md bg-white/90 border border-gray-200',
      glassHover: 'backdrop-blur-lg bg-white border border-gray-300',
      glow: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    },
  },
};

/**
 * Get theme-aware class names
 * @param theme - Current theme
 * @returns ThemeClasses object
 */
export const getThemeClasses = (theme: Theme): ThemeClasses => {
  return themeClasses[theme];
};
