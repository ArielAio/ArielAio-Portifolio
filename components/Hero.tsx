
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

const MagneticButton = ({ children, onClick, href, className, variant = "outline" }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Stiffer spring for a more premium, responsive feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D Tilt Transforms - Map movement pixels to degrees
  const rotateX = useTransform(springY, [-20, 20], [15, -15]); // Mouse Down -> Tilt Top (Looks at mouse)
  const rotateY = useTransform(springX, [-20, 20], [-15, 15]); // Mouse Right -> Tilt Left

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable magnetic effect on touch devices to save battery
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ 
        x: springX, 
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${className} relative overflow-visible group perspective-500`}
    >
      {/* Content Layer - Pushed forward for parallax depth */}
      <motion.span 
        className="relative z-10 block" 
        style={{ transform: "translateZ(15px)" }}
      >
        {children}
      </motion.span>
      
      {/* Light Sweep Gradient Effect - Runs on Hover */}
      <motion.div 
         initial={{ x: "-100%", opacity: 0 }}
         whileHover={{ x: "150%", opacity: 1 }}
         transition={{ duration: 0.8, ease: "easeInOut" }}
         className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none rounded-[inherit]"
         style={{ transform: "translateZ(1px)" }}
      />
      
      {/* 3D Reflection/Sheen */}
      <motion.div 
         className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
         style={{ transform: "translateZ(-1px)" }}
      />
    </motion.a>
  );
};

const Hero: React.FC = () => {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      
      {/* 3D Hyper-Tesseract (Double Cube) Background - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30 pointer-events-none cube-container scale-100">
        <div className="cube-outer">
            <div className="face-outer face-outer-front"></div>
            <div className="face-outer face-outer-back"></div>
            <div className="face-outer face-outer-right"></div>
            <div className="face-outer face-outer-left"></div>
            <div className="face-outer face-outer-top"></div>
            <div className="face-outer face-outer-bottom"></div>
            
            {/* Inner Cube - Nested for compound rotation */}
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
      
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gpu-accelerated"
        >
          <motion.span 
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)", z: 20 }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm cursor-default transform-style-3d transition-colors"
          >
            {HERO_CONTENT.greeting}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 gpu-accelerated select-none"
        >
          {HERO_CONTENT.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl text-gray-400 font-light mb-8 max-w-3xl mx-auto gpu-accelerated"
        >
          {HERO_CONTENT.role}
        </motion.h2>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed gpu-accelerated"
        >
          {HERO_CONTENT.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-8 gpu-accelerated transform-style-3d"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full transform-style-3d">
            {/* 3D Magnetic Shimmer Button */}
            <MagneticButton
              href="#projects"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, 'projects')}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#6366f1,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer shadow-lg w-full sm:w-auto"
            >
              Ver Projetos
            </MagneticButton>

            {/* Magnetic Button */}
            <MagneticButton
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, 'contact')}
              className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-bold rounded-full cursor-pointer hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              Entrar em Contato
            </MagneticButton>
          </div>

          {/* New Resume Button with 3D Lift */}
          <motion.a
            href="/Curriculo_Ariel_Aio.pdf" 
            download="Curriculo_Ariel_Aio.pdf"
            whileHover={{ scale: 1.05, y: -5, z: 20, rotateX: 10 }}
            whileTap={{ scale: 0.95, z: -10 }}
            className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group backdrop-blur-sm cursor-pointer transform-style-3d shadow-lg"
            style={{ transformStyle: "preserve-3d" }}
          >
             <div className="p-2 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Download size={18} />
             </div>
             <div className="text-left">
                <span className="block text-[10px] text-gray-400 font-mono uppercase tracking-wider leading-none mb-1" style={{ transform: "translateZ(5px)" }}>Currículo</span>
                <span className="block text-sm font-bold text-white group-hover:text-primary transition-colors leading-none" style={{ transform: "translateZ(10px)" }}>Baixar PDF</span>
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
};

export default Hero;
