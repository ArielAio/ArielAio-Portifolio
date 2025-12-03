import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS_CONTENT } from '../constants';
import { Cpu, Server, Layout } from 'lucide-react';
import { Skill } from '../types';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const { isLowPower } = usePerformance();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

  const rotateX = useSpring(useTransform(yPct, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(xPct, [0, 1], [-5, 5]), springConfig);

  const iconX = useSpring(useTransform(xPct, [0, 1], [-6, 6]), springConfig);
  const iconY = useSpring(useTransform(yPct, [0, 1], [-6, 6]), springConfig);

  // Always call these hooks - prevents conditional rendering issues
  const borderGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${x}px ${y}px,
      rgba(99, 102, 241, 0.5),
      transparent 40%
    )
  `;

  const innerSpotlight = useMotionTemplate`
    radial-gradient(
      400px circle at ${x}px ${y}px,
      rgba(168, 85, 247, 0.1),
      transparent 80%
    )
  `;

  const lightSweepX = useTransform(xPct, [0, 1], ["-150%", "150%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable interactions on touch devices OR low power
    if ((typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) || isLowPower) return;

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX);
    y.set(mouseY);
    
    xPct.set(mouseX / rect.width);
    yPct.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    xPct.set(0.5);
    yPct.set(0.5);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Layout size={28} />;
      case 'backend': return <Server size={28} />;
      default: return <Cpu size={28} />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={!isLowPower ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as any
      } : {}}
      className={`group relative h-full rounded-2xl ${classes.bg.card} p-[1px] transition-all perspective-1000 overflow-hidden`}
    >
      {/* 1. DYNAMIC BORDER GLOW LAYER - Conditional */}
      {!isLowPower && (
        <motion.div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: borderGlow
            }}
        />
      )}
      
      <div className={`relative h-full w-full rounded-2xl ${theme === 'dark' ? 'bg-dark/90' : 'bg-white'} p-6 backdrop-blur-md transform-style-3d overflow-hidden`}>
        
        {/* 2. INNER SPOTLIGHT - Conditional */}
        {!isLowPower && (
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{
                    background: innerSpotlight
                }}
            />
        )}

        {!isLowPower && (
            <motion.div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-700 rounded-2xl z-0 mix-blend-soft-light"
                style={{
                    background: "linear-gradient(115deg, transparent, rgba(255,255,255,0.4), transparent)",
                    x: lightSweepX,
                }}
            />
        )}

        <div className="relative z-10 flex flex-col h-full transform-style-3d">
            <div className="flex justify-between items-start mb-6 transform-style-3d">
            <motion.div 
                className={`p-3 ${classes.bg.card} rounded-xl text-primary ${classes.border.subtle} group-hover:border-primary/50 group-hover:bg-primary/20 transition-colors duration-300 ${classes.shadow.lg}`}
                style={!isLowPower ? { x: iconX, y: iconY, z: 40 } : {}}
            >
                {getIcon(skill.category)}
            </motion.div>
            
            <span 
                className={`px-3 py-1 ${classes.bg.card} rounded-full text-xs font-mono text-secondary border border-secondary/20 group-hover:bg-secondary/10 transition-colors`}
                style={!isLowPower ? { transform: "translateZ(30px)" } : {}}
            >
                {skill.time}
            </span>
            </div>

            <h3 
                className={`text-xl font-bold mb-3 ${classes.text.primary} group-hover:text-primary transition-colors`}
                style={!isLowPower ? { transform: "translateZ(35px)" } : {}}
            >
            {skill.name}
            </h3>
            
            <p 
                className={`${classes.text.secondary} text-sm leading-relaxed ${theme === 'dark' ? 'group-hover:text-gray-300' : 'group-hover:text-gray-900'} transition-colors`}
                style={!isLowPower ? { transform: "translateZ(20px)" } : {}}
            >
            {skill.description}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = SKILLS_CONTENT[language];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${classes.text.primary}`}
          >
            {content.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{content.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${classes.text.secondary} max-w-2xl mx-auto`}
          >
            {content.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {content.skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;