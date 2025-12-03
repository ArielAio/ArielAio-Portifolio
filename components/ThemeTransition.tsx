import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

/**
 * ThemeTransition Component
 * 
 * Creates an elegant circular reveal animation when theme changes.
 * 
 * Animation Flow:
 * 1. Circular overlay expands from center (scale 0 → 50)
 * 2. Theme changes during full coverage
 * 3. Overlay contracts back revealing new content (scale 50 → 0)
 * 
 * Performance: GPU-accelerated using transform properties
 */

const ThemeTransition = () => {
  const { isTransitioning, targetTheme } = useTheme();

  // Determine what theme we're transitioning TO
  const isGoingToDark = targetTheme === 'dark';

  // Translation text based on TARGET theme (where we're going)
  const transitionText = {
    dark: 'MODO ESCURO',
    light: 'MODO CLARO'
  };

  const displayText = targetTheme ? transitionText[targetTheme] : 'MUDANDO TEMA';

  // Colors based on target theme
  const gradientColors = isGoingToDark 
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' // Dark blue gradient
    : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'; // Amber/yellow gradient

  const glowColor = isGoingToDark 
    ? 'rgba(30, 41, 59, 0.5)' 
    : 'rgba(251, 191, 36, 0.5)';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Circular Reveal Effect */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: gradientColors,
              boxShadow: `0 0 100px ${glowColor}`,
            }}
            initial={{ 
              scale: 0,
              width: '100px',
              height: '100px',
            }}
            animate={{ 
              scale: [0, 50, 50, 0],
              rotate: isGoingToDark ? [0, -180, -180, -360] : [0, 180, 180, 360],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.375, 0.625, 1], // 600ms expand, 400ms hold, 600ms contract
              ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier for smooth motion
            }}
          />

          {/* Theme Change Indicator */}
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            {/* Icon Container */}
            <div className="relative">
              {/* Rotating Icon */}
              <motion.div
                className="w-16 h-16 flex items-center justify-center"
                animate={{ 
                  rotate: isGoingToDark ? [0, -360] : [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                }}
              >
                {isGoingToDark ? (
                  <Moon size={48} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                ) : (
                  <Sun size={48} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                )}
              </motion.div>

              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                animate={{ 
                  scale: [1, 1.8, 1.8, 1],
                  opacity: [0.5, 0, 0, 0.5],
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.4, 0.6, 1],
                }}
              />

              {/* Orbiting Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.cos((i * Math.PI * 2) / 6) * 50, Math.cos((i * Math.PI * 2) / 6) * 50, 0],
                    y: [0, Math.sin((i * Math.PI * 2) / 6) * 50, Math.sin((i * Math.PI * 2) / 6) * 50, 0],
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Text Label */}
            <motion.p
              className="text-white text-base font-bold tracking-wider drop-shadow-lg"
              animate={{ 
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.6,
                times: [0, 0.25, 0.75, 1],
              }}
            >
              {displayText}
            </motion.p>
          </motion.div>

          {/* Radial Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`radial-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: isGoingToDark ? '3px' : '4px',
                height: isGoingToDark ? '3px' : '4px',
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 12) * 250],
                y: [0, Math.sin((i * Math.PI * 2) / 12) * 250],
                opacity: [0, 1, 0],
                scale: [0, isGoingToDark ? 1 : 1.5, 0],
              }}
              transition={{
                duration: 1.6,
                times: [0, 0.4, 1],
                ease: "easeOut",
                delay: i * 0.03, // Stagger effect
              }}
            />
          ))}

          {/* Expanding Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border-2 border-white/30"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                width: [0, 600],
                height: [0, 600],
                x: [0, -300],
                y: [0, -300],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1.6,
                times: [0, 1],
                ease: "easeOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
