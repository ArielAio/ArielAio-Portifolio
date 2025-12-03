
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Particles } from './components/Particles';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // PERFORMANCE OPTIMIZATION: 
  // Use MotionValues for high-frequency updates (mouse move).
  // Initialize off-screen to prevent flash at (0,0)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the follower (Outer Ring) - Creates the "lazy" trail effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [clickWaves, setClickWaves] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      // Update MotionValues directly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Context Aware Logic
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
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
      // Check if hovering over text
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
        const newWave = { id: Date.now(), x: e.clientX, y: e.clientY };
        setClickWaves(prev => [...prev, newWave]);
        
        // Remove wave after animation
        setTimeout(() => {
            setClickWaves(prev => prev.filter(w => w.id !== newWave.id));
        }, 800);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleClick);
    }

    const handleChange = (e: MediaQueryListEvent) => {
        setIsDesktop(e.matches);
        if (e.matches) {
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
  }, [mouseX, mouseY]);

  // Framer Motion Variants for Cursor
  // NOTE: x: "-50%", y: "-50%" is CRITICAL for centering.
  // We use `left` and `top` styles for positioning, and these transforms for centering.
  const cursorVariants = {
    default: {
        height: 32,
        width: 32,
        backgroundColor: "transparent",
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
        backgroundColor: "transparent",
        border: "2px solid #6366f1", // Primary color ring
        x: "-50%",
        y: "-50%",
        scale: 1.1,
        opacity: 1,
        mixBlendMode: "normal" as "normal",
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" // Glow effect
    },
    text: {
        height: 32,
        width: 4, // Thicker I-beam
        backgroundColor: "#a855f7", // Secondary color
        border: "none",
        x: "-50%",
        y: "-50%",
        scale: 1,
        opacity: 0.8,
        borderRadius: 2,
        mixBlendMode: "normal" as "normal"
    }
  };

  return (
    <div className={`bg-dark min-h-screen text-white selection:bg-primary selection:text-white ${isDesktop ? 'cursor-none' : ''}`}>
      
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Cinematic Noise Overlay - Adds Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        
        {/* Ambient Moving Orbs (Living Background) - Optimized with GPU transform */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[128px] animate-blob gpu-accelerated"></div>
        {/* Second blob hidden on mobile to reduce overdraw and improve performance */}
        <div className="hidden md:block absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-secondary/10 rounded-full blur-[128px] animate-blob animation-delay-4000 gpu-accelerated"></div>
        <div className="hidden md:block absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[128px] animate-blob animation-delay-2000 gpu-accelerated"></div>

        {/* Particles / Fireflies Effect - Reduced on mobile */}
        <Particles quantity={isDesktop ? 50 : 20} />

        {/* Global Spotlight (Mouse Tracking Fog) - Optimized with blend mode for depth */}
        {isDesktop && (
            <motion.div 
                className="absolute w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none will-change-transform mix-blend-soft-light"
                style={{
                    left: cursorX, // Use spring physics for smooth spotlight
                    top: cursorY,
                    x: "-50%", // Center via transform
                    y: "-50%"
                }}
            />
        )}
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Custom Cursor - Optimized with MotionValues and separated physics */}
      {isDesktop && (
        <>
            {/* Click Shockwaves (Pulse) */}
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

            {/* Main Cursor Ring - Follows with Spring Physics */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] transition-colors duration-200"
                variants={cursorVariants}
                animate={cursorVariant}
                style={{
                    left: cursorX, // Positioning via Spring
                    top: cursorY,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }} 
            />
            
            {/* Inner Dot - Instant Follow (Precision) - Turns into crosshair center on button hover */}
            <motion.div
                className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[100]"
                animate={{
                    scale: cursorVariant === 'button' ? 0.5 : 1,
                    backgroundColor: cursorVariant === 'button' ? '#6366f1' : '#ffffff'
                }}
                style={{
                    width: 8,
                    height: 8,
                    left: mouseX, // Positioning via Raw MotionValue (Instant)
                    top: mouseY,
                    x: "-50%",    // Centering via Transform
                    y: "-50%"
                }}
            />
        </>
      )}

      <Navbar />
      
      {/* Main Content - z-index ensures it sits above the background */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

    </div>
  );
};

export default App;
