import { useTheme } from '../ThemeContext';
import { getThemeClasses, ThemeClasses } from '../utils/themeClasses';

/**
 * Custom hook to get theme-aware CSS classes
 * 
 * @example
 * const classes = useThemeClasses();
 * <div className={`${classes.bg.card} ${classes.text.primary}`}>
 */
export const useThemeClasses = (): ThemeClasses => {
  const { theme } = useTheme();
  return getThemeClasses(theme);
};
