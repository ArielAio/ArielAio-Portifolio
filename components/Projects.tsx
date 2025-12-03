import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS_CONTENT } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

const ProjectCard: React.FC<{ project: Project; textDemo: string; textCode: string }> = ({ project, textDemo, textCode }) => {
  const { isLowPower } = usePerformance();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
  
  // Reduced rotation for more subtle effect (was -10 to 10, now -4 to 4)
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), springConfig);
  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), springConfig);

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  // Always call these hooks - they're cheap and prevent conditional rendering issues
  const glareXTransform = useTransform(glareX, val => `-${val}%`);
  const glareYTransform = useTransform(glareY, val => `-${val}%`);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Disable tilt on touch devices OR low power
    if ((typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) || isLowPower) return;

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // If low power, remove the 3D transforms
  const style = isLowPower ? {} : {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as any,
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl ${theme === 'dark' ? 'bg-dark/50' : 'bg-white/95'} perspective-1000 h-[450px] w-full isolate ${
        project.type === 'leadership' 
          ? 'border-2 border-green-500/30 hover:border-green-400/60 shadow-green-500/20' 
          : `border ${classes.border.default} hover:border-primary/30`
      }`} 
    >
      <div 
        style={!isLowPower ? { transform: "translateZ(20px)", transformStyle: "preserve-3d" } : {}}
        className={`absolute inset-0 rounded-2xl overflow-hidden ${classes.shadow.xl} ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}
      >
        {/* Image Layer */}
        <div className="absolute inset-0" style={!isLowPower ? { transform: "translateZ(0px)" } : {}}>
           <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 md:will-change-transform"
          />
        </div>

        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-dark via-dark/90 to-transparent' : 'bg-gradient-to-t from-gray-900/95 via-gray-900/85 to-gray-900/20'} opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}></div>

        {/* Light Sweep - Conditional */}
        {!isLowPower && (
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden pointer-events-none mix-blend-overlay">
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className={`w-1/2 h-full bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-white/20' : 'via-gray-900/30'} to-transparent -skew-x-12`}
                />
            </div>
        )}

        {/* Content Container - z-30 to stay above glare effect */}
        <div 
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none z-30"
        >
            <div className="pointer-events-auto transform transition-transform duration-300 md:translate-y-8 md:group-hover:translate-y-0">
                {/* Badge for special projects (e.g., "🚀 Em Produção") */}
                {project.badge && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-bold mb-3 backdrop-blur-sm shadow-lg">
                        {project.badge}
                    </span>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 drop-shadow-lg ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                }`} style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
                    {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className={`text-[10px] md:text-xs font-mono px-2 py-1 rounded-md backdrop-blur-sm border ${
                            theme === 'dark'
                                ? `${classes.bg.overlay} ${classes.text.secondary} ${classes.border.subtle}`
                                : 'bg-white/90 text-gray-900 border-gray-300'
                        } ${classes.shadow.sm}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="pointer-events-auto transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:max-h-0 md:group-hover:max-h-[200px]">
                <p className={`text-sm mb-6 line-clamp-3 md:line-clamp-none drop-shadow-md ${
                    theme === 'dark' ? classes.text.secondary : 'text-gray-100'
                }`}>
                    {project.description}
                </p>
                
                <div className="flex gap-4 pb-2 relative z-10 overflow-visible">
                    <motion.a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "#4f46e5", 
                            boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary ${classes.text.inverse} rounded-lg text-sm font-bold ${classes.shadow.lg} transition-colors cursor-pointer`}
                    >
                        <ExternalLink size={16} /> {textDemo}
                    </motion.a>
                    {project.githubRepo && (
                        <motion.a 
                            href={project.githubRepo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: theme === 'dark' ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.15)",
                                borderColor: theme === 'dark' ? "rgba(168, 85, 247, 0.6)" : "rgba(168, 85, 247, 0.5)",
                                boxShadow: theme === 'dark' ? "0 0 20px rgba(168, 85, 247, 0.4)" : "0 0 20px rgba(168, 85, 247, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold backdrop-blur-md transition-all duration-300 cursor-pointer border-2 ${
                                theme === 'dark'
                                    ? 'bg-white/10 text-white border-white/30 shadow-lg hover:text-white'
                                    : 'bg-gray-800/90 text-white border-gray-700 shadow-lg hover:text-white'
                            }`}
                        >
                            <Github size={16} /> {textCode}
                        </motion.a>
                    )}
                </div>
            </div>
        </div>

        {/* Glare effect - z-20 to stay below content */}
        {!isLowPower && (
            <motion.div 
                className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                    x: glareXTransform, 
                    y: glareYTransform,
                    mixBlendMode: "overlay"
                }}
            />
        )}
      </div>
    </motion.div>
  )
}

const Projects: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = PROJECTS_CONTENT[language];

  return (
    <section id="projects" className="py-24 bg-transparent relative z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-left"
        >
           <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">{content.portfolioLabel}</span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${classes.text.primary}`}>{content.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
          {content.projects.map((project) => (
            <ProjectCard key={project.id} project={project} textDemo={content.demo} textCode={content.code} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;