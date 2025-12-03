import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS_CONTENT } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';

const ProjectCard: React.FC<{ project: Project; textDemo: string; textCode: string }> = ({ project, textDemo, textCode }) => {
  const { isLowPower } = usePerformance();
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
      className="group relative rounded-2xl bg-dark/50 border border-white/5 perspective-1000 h-[450px] w-full isolate" 
    >
      <div 
        style={!isLowPower ? { transform: "translateZ(20px)", transformStyle: "preserve-3d" } : {}}
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-dark"
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

        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Light Sweep - Conditional */}
        {!isLowPower && (
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden pointer-events-none mix-blend-overlay">
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
            </div>
        )}

        {/* Content Container - z-30 to stay above glare effect */}
        <div 
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none z-30"
        >
            <div className="pointer-events-auto transform transition-transform duration-300 md:translate-y-8 md:group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg" style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
                    {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] md:text-xs font-mono px-2 py-1 bg-white/10 rounded-md text-gray-300 backdrop-blur-sm border border-white/5 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="pointer-events-auto overflow-hidden transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:max-h-0 md:group-hover:max-h-[200px]">
                <p className="text-gray-300 text-sm mb-6 line-clamp-3 md:line-clamp-none drop-shadow-md">
                    {project.description}
                </p>
                
                <div className="flex gap-4 pb-2 relative z-10">
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
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg transition-colors cursor-pointer"
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
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                borderColor: "rgba(255, 255, 255, 0.5)",
                                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-lg text-sm font-bold backdrop-blur-md border border-white/10 shadow-lg transition-colors cursor-pointer"
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{content.title}</h2>
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