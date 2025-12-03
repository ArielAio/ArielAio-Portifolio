import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { usePerformance } from '../PerformanceContext';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isMobile = false }) => {
  const { theme, toggleTheme } = useTheme();
  const { isLowPower } = usePerformance();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const isDark = theme === 'dark';

  const handleToggle = () => {
    toggleTheme();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isLowPower) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (isMobile) {
    return (
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center justify-center p-2 rounded-lg border-2 shadow-lg transition-colors ${
          isDark
            ? 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300'
            : 'border-indigo-400 bg-indigo-100 text-indigo-700'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl p-1 transition-all shadow-lg ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-400/20' 
          : 'bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-amber-600/30'
      }`}
      style={{ width: '80px', height: '40px' }}
      whileHover={{ scale: 1.05, borderColor: isDark ? 'rgba(250, 204, 21, 0.4)' : 'rgba(217, 119, 6, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Modo Claro' : 'Modo Escuro'}
    >
      {/* Background Glow Effect */}
      {!isLowPower && (
        <>
          <motion.div 
            className={`absolute inset-0 rounded-2xl blur-md ${
              isDark ? 'bg-yellow-400/20' : 'bg-amber-500/30'
            }`}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Mouse Follower Spotlight */}
      {!isLowPower && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '60px',
            height: '60px',
            left: mousePosition.x - 30,
            top: mousePosition.y - 30,
            background: isDark 
              ? 'radial-gradient(circle, rgba(255, 204, 0, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Sliding Pill */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center"
        style={{
          top: '50%',
          left: '4px',
          y: '-50%',
        }}
        animate={{
          x: isDark ? 36 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isDark ? (
              <Moon size={18} className="text-slate-800" />
            ) : (
              <Sun size={18} className="text-amber-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <motion.div
          animate={{ 
            opacity: isDark ? 0.3 : 0,
            scale: isDark ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={14} className="text-white/50" />
        </motion.div>
        <motion.div
          animate={{ 
            opacity: isDark ? 0 : 0.3,
            scale: isDark ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon size={14} className="text-white/50" />
        </motion.div>
      </div>

      {/* Shimmer Effect */}
      {!isLowPower && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
