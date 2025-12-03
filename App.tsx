import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import FeaturedProject from './components/FeaturedProject'; // NEW: Memoryiit showcase
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import LanguageTransition from './components/LanguageTransition'; // Circular reveal transition
import { Particles } from './components/Particles';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './LanguageContext';
import { PerformanceProvider, usePerformance } from './PerformanceContext';

const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { tier, isLowPower, isLoading, completeLoading, enableParticles, enable3D } = usePerformance();

  // PERFORMANCE OPTIMIZATION: 
  // Use MotionValues for high-frequency updates (mouse move).
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the follower (Outer Ring)
  // Disable spring physics on low power devices to save CPU
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [clickWaves, setClickWaves] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    // Only run complex mouse logic on Desktop AND if not Low Power tier
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const shouldEnableCursor = mediaQuery.matches && !isLowPower;
    
    setIsDesktop(shouldEnableCursor);

    const handleMouseMove = (e: MouseEvent) => {
      // Update MotionValues directly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Context Aware Logic - Skip on low power to reduce DOM checks per frame
      if (isLowPower) return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorVariant('button');
      } 
      else if (
        target.tagName === 'P' || 
        target.tagName === 'SPAN' || 
        target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'H3' || 
        target.tagName === 'H4' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'LI'
      ) {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };

    const handleClick = (e: MouseEvent) => {
        // Disable wave effect on low power
        if (isLowPower) return; 

        const newWave = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClickWaves(prev => [...prev, newWave]);
        setTimeout(() => {
            setClickWaves(prev => prev.filter(w => w.id !== newWave.id));
        }, 800);
    };

    if (shouldEnableCursor) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleClick);
    }

    const handleChange = (e: MediaQueryListEvent) => {
        const newIsDesktop = e.matches && !isLowPower;
        setIsDesktop(newIsDesktop);
        if (newIsDesktop) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mousedown", handleClick);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleClick);
        }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mouseX, mouseY, isLowPower]);

  const cursorVariants = {
    default: {
        height: 32,
        width: 32,
        backgroundColor: "rgba(0, 0, 0, 0)", // Use rgba instead of transparent
        border: "1px solid rgba(255,255,255,0.3)",
        x: "-50%",
        y: "-50%",
        scale: 1,
        opacity: 1,
        mixBlendMode: "normal" as "normal"
    },
    button: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0)", // Use rgba instead of transparent
        border: "2px solid #6366f1",
        x: "-50%",
        y: "-50%",
        scale: 1.1,
        opacity: 1,
        mixBlendMode: "normal" as "normal",
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
    },
    text: {
        height: 32,
        width: 4,
        backgroundColor: "#a855f7",
        border: "none",
        x: "-50%",
        y: "-50%",
        scale: 1,
        opacity: 0.8,
        borderRadius: "2px", // Add px unit
        mixBlendMode: "normal" as "normal"
    }
  };

  // Determine Particle Count based on enableParticles flag
  const particleCount = enableParticles ? (tier === 'high' ? 60 : 30) : 0;

  return (
    <div className={`bg-dark min-h-screen text-white selection:bg-primary selection:text-white ${isDesktop ? 'cursor-none' : ''}`}>
      
      {/* LOADING SCREEN OVERLAY */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={completeLoading} />}
      </AnimatePresence>

      {/* LANGUAGE TRANSITION OVERLAY */}
      <LanguageTransition />

      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Cinematic Noise Overlay - Only on medium/high tier */}
        {!isLowPower && <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>}
        
        {/* Ambient Moving Orbs (Living Background) */}
        {/* CRITICAL FIX FOR WEAK MACHINES: Do NOT render huge blurred blobs on low tier. Use static gradient instead. */}
        {isLowPower ? (
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
        ) : (
            <>
                <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[64px] md:blur-[128px] animate-blob gpu-accelerated`}></div>
                
                {tier !== 'low' && (
                    <>
                        <div className="hidden md:block absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-secondary/10 rounded-full blur-[64px] md:blur-[128px] animate-blob animation-delay-4000 gpu-accelerated"></div>
                        <div className="hidden md:block absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[64px] md:blur-[128px] animate-blob animation-delay-2000 gpu-accelerated"></div>
                    </>
                )}
            </>
        )}

        {/* Particles - Only render after loading is complete to save initial frames */}
        {!isLoading && particleCount > 0 && <Particles quantity={particleCount} />}

        {/* Global Spotlight (Mouse Tracking Fog) - Only on High Tier Desktop */}
        {!isLoading && isDesktop && tier === 'high' && (
            <motion.div 
                className="absolute w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none will-change-transform mix-blend-soft-light"
                style={{
                    left: cursorX,
                    top: cursorY,
                    x: "-50%",
                    y: "-50%"
                }}
            />
        )}
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX }}
      />

      {isDesktop && !isLoading && (
        <>
            <AnimatePresence>
                {clickWaves.map(wave => (
                    <motion.div
                        key={wave.id}
                        initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 4 }}
                        animate={{ width: 250, height: 250, opacity: 0, borderWidth: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ 
                            left: wave.x, 
                            top: wave.y, 
                            x: "-50%", 
                            y: "-50%",
                            borderColor: "#6366f1",
                            boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
                        }}
                        className="fixed rounded-full border-primary z-[99] pointer-events-none"
                    />
                ))}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] transition-colors duration-200"
                variants={cursorVariants}
                animate={cursorVariant}
                style={{
                    left: cursorX, 
                    top: cursorY,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }} 
            />
            
            <motion.div
                className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[100]"
                animate={{
                    scale: cursorVariant === 'button' ? 0.5 : 1,
                    backgroundColor: cursorVariant === 'button' ? '#6366f1' : '#ffffff'
                }}
                style={{
                    width: 8,
                    height: 8,
                    left: mouseX, 
                    top: mouseY,
                    x: "-50%",    
                    y: "-50%"
                }}
            />
        </>
      )}

      {/* Main Content - Opacity fade in after loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main className="relative z-10">
            <Hero />
            <About />
            <Experience />
            <FeaturedProject />
            <Projects />
            <Skills />
            <Contact />
        </main>
      </motion.div>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PerformanceProvider>
        <AppContent />
      </PerformanceProvider>
    </LanguageProvider>
  );
};

export default App;