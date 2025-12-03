
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position relative to card center (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Spring physics configuration - Softer stiffness for a more elegant, less jerky feel
  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
  
  // Create sprung values for rotation - Reduced range to +/- 10 degrees for a subtle effect
  // Logic: Mouse Left (0) -> RotateY Negative (Left side pops up/forward) -> Actually Left side goes back (Push effect)
  // Logic: Mouse Top (0) -> RotateX Positive (Top side pops up/forward) -> Actually Top side goes back (Push effect)
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);

  // Glare effect movement
  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position (0 to 1)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-dark/50 border border-white/5 perspective-1000 h-[450px] w-full isolate" 
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-dark"
      >
        {/* Image Layer - Pushed back slightly relative to content */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0px)" }}>
           <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 md:will-change-transform"
          />
        </div>

        {/* Overlay - Mobile: Always Visible (opacity-90) | Desktop: Hidden -> Hover (opacity-90) */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Light Sweep / Shimmer Effect - Runs on Hover */}
        <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden pointer-events-none mix-blend-overlay">
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            />
        </div>

        {/* Content Container - True 3D Floating Effect (Z-Index increased) */}
        <div 
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none transform-style-3d z-20"
            style={{ transform: "translateZ(60px)" }} 
        >
            {/* Title & Tags - Shift up on hover for desktop */}
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

            {/* Description & Buttons - Mobile: Visible | Desktop: Hidden -> Fade In + Slide Up */}
            <div className="pointer-events-auto overflow-hidden transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:max-h-0 md:group-hover:max-h-[200px]">
                <p className="text-gray-300 text-sm mb-6 line-clamp-3 md:line-clamp-none drop-shadow-md">
                    {project.description}
                </p>
                
                <div className="flex gap-4 pb-2">
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/80 transition-all shadow-lg hover:shadow-primary/30 active:scale-95"
                    >
                        <ExternalLink size={16} /> Demo
                    </a>
                    {project.githubRepo && (
                        <motion.a 
                            href={project.githubRepo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-lg text-sm font-bold backdrop-blur-md border border-white/10 shadow-lg"
                        >
                            <Github size={16} /> Code
                        </motion.a>
                    )}
                </div>
            </div>
        </div>

        {/* Glare Effect - Follows mouse opposite direction */}
        <motion.div 
            className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ 
                x: useTransform(glareX, val => `-${val}%`), 
                y: useTransform(glareY, val => `-${val}%`),
                mixBlendMode: "overlay"
            }}
        />
      </div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
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
           <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Portfólio</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Projetos Recentes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
