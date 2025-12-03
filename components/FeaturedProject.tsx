import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, CheckCircle } from 'lucide-react';
import { FEATURED_PROJECT } from '../constants';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

/**
 * FeaturedProject Component
 * 
 * Showcases the main leadership/management project (Memoryiit)
 * Separated from technical projects to highlight business/operations role
 * 
 * Design: Horizontal layout with image on left, content on right
 * Special styling: Green accent colors for "In Production" badge
 */

const FeaturedProject: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { isLowPower } = usePerformance();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = FEATURED_PROJECT[language];

  return (
    <section id="featured-project" className="py-24 bg-transparent relative z-20">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase mb-2 block">
            {content.sectionTitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              Memoryiit
            </span>
          </h2>
        </motion.div>

        {/* Featured Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 rounded-3xl border-2 border-green-500/30 hover:border-green-400/60 transition-all duration-500 relative overflow-hidden ${
            theme === 'dark'
              ? classes.effects.glass
              : 'bg-white shadow-xl'
          }`}>
            
            {/* Background Gradient Effect */}
            {!isLowPower && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}

            {/* Left: Image */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={content.image} 
                alt={content.title}
                loading="lazy"
                className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-dark/80 via-dark/20 to-transparent' : 'bg-gradient-to-t from-gray-900/75 via-gray-900/10 to-transparent'}`} />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500/90 backdrop-blur-md rounded-full ${classes.text.inverse} text-sm font-bold ${classes.shadow.lg}`}>
                  {content.badge}
                </span>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center relative z-10">
              
              {/* Subtitle */}
              <div className="flex items-center gap-2 text-green-400 mb-3">
                <Briefcase size={18} />
                <span className="font-mono text-sm tracking-wide">
                  {content.subtitle}
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-3xl md:text-4xl font-bold ${classes.text.primary} mb-4`}>
                {content.title}
              </h3>

              {/* Description */}
              <p className={`${classes.text.secondary} text-base md:text-lg leading-relaxed mb-6`}>
                {content.description}
              </p>

              {/* Responsibilities List */}
              <div className="mb-8">
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-secondary' : 'text-primary font-bold'}`}>
                  {language === 'pt' ? 'Responsabilidades:' : 'Responsibilities:'}
                </h4>
                <ul className="space-y-3">
                  {content.responsibilities.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-start gap-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
                    >
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="text-sm md:text-base">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {content.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono backdrop-blur-sm border ${
                      theme === 'dark'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-green-100 border-green-400 text-green-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 w-full sm:w-auto"
              >
                <ExternalLink size={20} />
                {content.cta}
              </motion.a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
});

export default FeaturedProject;
