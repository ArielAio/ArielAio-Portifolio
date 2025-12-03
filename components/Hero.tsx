import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_CONTENT } from '../constants';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

const MagneticButton = ({ children, onClick, href, className }: any) => {
  const { isLowPower } = usePerformance();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  
  // OPTIMIZATION: Cache rect to avoid getBoundingClientRect on every mousemove
  const rectCacheRef = useRef<DOMRect | null>(null);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, { damping: 10, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if ((typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) || isLowPower) return;

    if (!ref.current || !rectCacheRef.current) return;
    
    // Use cached rect instead of calling getBoundingClientRect every frame
    const rect = rectCacheRef.current;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    
    springX.set(x);
    springY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    
    // OPTIMIZATION: Cache rect on enter to avoid repeated getBoundingClientRect calls
    if (ref.current) {
      rectCacheRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    springX.set(0);
    springY.set(0);
    scale.set(1);
    rectCacheRef.current = null;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    scale.set(0.95);
    setTimeout(() => scale.set(isHovered ? 1.05 : 1), 100);
    onClick?.(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative overflow-hidden`}
      style={isLowPower ? {} : {
        x: springX,
        y: springY,
        scale: springScale,
        transformOrigin: 'center',
        willChange: 'transform'
      }}
    >
      <span className="relative block pointer-events-none select-none">
        {children}
      </span>
      
      {!isLowPower && (
        <>
          <motion.div 
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: isHovered ? "150%" : "-100%", opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none rounded-[inherit]"
          />
          <motion.div 
            className="absolute inset-0 bg-white/5 rounded-[inherit] pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.a>
  );
};

const Hero: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { enable3D, enableAnimations, isLoading } = usePerformance();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = HERO_CONTENT[language];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Only render Tesseract if 3D is enabled and not loading
  const showTesseract = enable3D && !isLoading;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      
      {showTesseract && (
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30 pointer-events-none cube-container scale-100">
            <div className="cube-outer">
                <div className="face-outer face-outer-front"></div>
                <div className="face-outer face-outer-back"></div>
                <div className="face-outer face-outer-right"></div>
                <div className="face-outer face-outer-left"></div>
                <div className="face-outer face-outer-top"></div>
                <div className="face-outer face-outer-bottom"></div>
                
                <div className="cube-inner">
                    <div className="face-inner face-inner-front"></div>
                    <div className="face-inner face-inner-back"></div>
                    <div className="face-inner face-inner-right"></div>
                    <div className="face-inner face-inner-left"></div>
                    <div className="face-inner face-inner-top"></div>
                    <div className="face-inner face-inner-bottom"></div>
                </div>
            </div>
        </div>
      )}
      
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gpu-accelerated"
        >
          <motion.span 
            whileHover={{ scale: 1.05, borderColor: theme === 'dark' ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.3)", z: 20 }}
            className={`inline-block py-1 px-3 rounded-full ${classes.bg.card} ${classes.border.default} text-primary text-sm font-medium mb-6 backdrop-blur-sm cursor-default transform-style-3d transition-colors`}
          >
            {content.greeting}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-b from-white to-white/50' : 'bg-gradient-to-b from-gray-900 to-gray-700'} gpu-accelerated select-none`}
        >
          {content.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-xl md:text-3xl ${classes.text.secondary} font-light mb-8 max-w-3xl mx-auto gpu-accelerated`}
        >
          {content.role}
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className={`${classes.text.secondary} max-w-2xl mx-auto mb-12 text-lg leading-relaxed gpu-accelerated`}
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-8 gpu-accelerated transform-style-3d"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full transform-style-3d">
            <MagneticButton
              href="#featured-project"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, 'featured-project')}
              className={`inline-flex h-14 animate-shimmer items-center justify-center rounded-2xl px-10 font-black text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer w-full sm:w-auto ${
                theme === 'dark' 
                  ? 'bg-[linear-gradient(110deg,#000103,45%,#6366f1,55%,#000103)] bg-[length:200%_100%] border-2 border-primary/30 text-white focus:ring-offset-slate-50'
                  : 'bg-[linear-gradient(110deg,#cbd5e1,45%,#6366f1,55%,#cbd5e1)] bg-[length:200%_100%] border-2 border-indigo-400 text-slate-900 focus:ring-offset-slate-900'
              }`}
            >
              {content.ctaProjects}
            </MagneticButton>

            <MagneticButton
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, 'contact')}
              className={`px-10 py-4 rounded-2xl font-black text-base cursor-pointer transition-all w-full sm:w-auto border-2 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  : 'bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 hover:border-gray-500'
              }`}
            >
              {content.ctaContact}
            </MagneticButton>
          </div>

          <motion.a
            href="/Curriculo_Ariel_Aio.pdf" 
            download="Curriculo_Ariel_Aio.pdf"
            whileHover={{ scale: 1.05, y: -5, z: 20, rotateX: 10 }}
            whileTap={{ scale: 0.95, z: -10 }}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl border hover:border-primary/50 transition-all group backdrop-blur-sm cursor-pointer transform-style-3d ${
              theme === 'dark'
                ? `${classes.bg.card} ${classes.border.default} ${classes.effects.glassHover} ${classes.shadow.lg}`
                : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
             <div className={`p-2 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors`}>
                <Download size={18} />
             </div>
             <div className="text-left">
                <span className={`block text-[10px] ${classes.text.muted} font-mono uppercase tracking-wider leading-none mb-1`} style={{ transform: "translateZ(5px)" }}>{content.resumeLabel}</span>
                <span className={`block text-sm font-bold ${classes.text.primary} group-hover:text-primary transition-colors leading-none`} style={{ transform: "translateZ(10px)" }}>{content.ctaResume}</span>
             </div>
          </motion.a>

        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <ArrowDown className="text-gray-400/70 w-6 h-6" />
      </motion.div>
    </section>
  );
});

export default Hero;