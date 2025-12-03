
import React, { useMemo, useEffect, useState } from 'react';

export const Particles = ({ quantity = 75 }: { quantity?: number }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for user's reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const particles = useMemo(() => {
    if (reduceMotion) return []; // Do not generate particles if motion is reduced
    
    return new Array(quantity).fill(true).map(() => ({
      left: Math.floor(Math.random() * 100) + '%',
      top: Math.floor(Math.random() * 100) + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 10 + 10 + 's', // Slow movement between 10-20s via CSS
      size: Math.random() * 3 + 1 + 'px', // Random size 1-4px
      opacity: Math.random() * 0.5 + 0.1, // Random base opacity
    }));
  }, [quantity, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((style, idx) => (
        <span
          key={"particle-" + idx}
          className="absolute rounded-full bg-white animate-float"
          style={{
            left: style.left,
            top: style.top,
            width: style.size,
            height: style.size,
            opacity: style.opacity,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
            boxShadow: `0 0 ${parseInt(style.size) * 2}px rgba(255, 255, 255, 0.6)` // Glow effect
          }}
        >
            {/* Inner twinkle animation via CSS */}
            <span 
                className="block w-full h-full animate-twinkle bg-primary/30 rounded-full"
                style={{
                    animationDelay: style.animationDelay,
                    animationDuration: (parseFloat(style.animationDuration) / 2) + 's' 
                }}
            />
        </span>
      ))}
    </div>
  );
};
