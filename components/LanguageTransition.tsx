import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

/**
 * LanguageTransition Component
 * 
 * Creates an elegant circular reveal animation when language changes.
 * 
 * Animation Flow:
 * 1. Circular overlay expands from center (scale 0 → 50)
 * 2. Language changes during full coverage
 * 3. Overlay contracts back revealing new content (scale 50 → 0)
 * 
 * Performance: GPU-accelerated using transform properties
 */

const LanguageTransition = () => {
  const { isTransitioning, targetLanguage } = useLanguage();

  // Translation text based on TARGET language (where we're going)
  const transitionText = {
    pt: 'MUDANDO IDIOMA',
    en: 'CHANGING LANGUAGE'
  };

  const displayText = targetLanguage ? transitionText[targetLanguage] : 'CHANGING LANGUAGE';

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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 0 100px rgba(102, 126, 234, 0.5)',
            }}
            initial={{ 
              scale: 0,
              width: '100px',
              height: '100px',
            }}
            animate={{ 
              scale: [0, 50, 50, 0],
              rotate: [0, 180, 180, 360],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.375, 0.625, 1], // 600ms expand, 400ms hold, 600ms contract
              ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier for smooth motion
            }}
          />

          {/* Language Change Indicator */}
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-3"
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
              {/* Rotating Globe Icon */}
              <motion.svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.6,
                  ease: "linear",
                }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </motion.svg>

              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                animate={{ 
                  scale: [1, 1.5, 1.5, 1],
                  opacity: [0.5, 0, 0, 0.5],
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.4, 0.6, 1],
                }}
              />
            </div>

            {/* Text Label */}
            <motion.p
              className="text-white text-sm font-medium tracking-wider"
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

          {/* Particle Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 200],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.6,
                times: [0, 0.4, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageTransition;
