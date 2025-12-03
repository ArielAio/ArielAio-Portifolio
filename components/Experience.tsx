import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_CONTENT } from '../constants';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';

const Experience: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = EXPERIENCE_CONTENT[language];

  return (
    <section id="experience" className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${classes.text.primary}`}>{content.title}</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Professional Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-primary">
              <Briefcase className="w-6 h-6" /> {content.professionalTitle}
            </h3>
            <div className={`space-y-8 relative border-l-2 ${classes.border.default} ml-3 pl-8 pb-4`}>
              {content.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`absolute -left-[41px] top-0 w-5 h-5 ${classes.bg.base} border-4 border-primary rounded-full z-10`}
                  />
                  
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`p-6 rounded-xl transition-all duration-300 border ${
                      theme === 'dark' 
                        ? `${classes.effects.glass} ${classes.border.subtle} hover:border-primary/30 hover:bg-white/[0.05]` 
                        : 'bg-white shadow-md hover:shadow-lg border-gray-200 hover:border-primary/30'
                    }`}
                  >
                    <span className="text-sm font-mono text-primary mb-1 block">
                      {exp.period}
                    </span>
                    <h4 className={`text-xl font-bold ${classes.text.primary} mb-1`}>
                      {exp.role}
                    </h4>
                    <h5 className={`${classes.text.secondary} mb-2 font-medium`}>
                       {exp.company}
                    </h5>
                    
                    {/* Project Link (if exists) */}
                    {exp.projectLink && (
                      <a 
                        href={exp.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-green-400 hover:text-green-300 mb-3 transition-colors"
                      >
                        <span>🔗 Ver Projeto</span>
                      </a>
                    )}
                    
                    <p className={`${classes.text.secondary} text-sm mb-4`}>
                      {exp.description}
                    </p>
                    {exp.details && (
                      <ul className={`list-disc list-outside ml-4 space-y-1 ${classes.text.muted} text-xs md:text-sm marker:text-primary`}>
                        {exp.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-secondary">
              <GraduationCap className="w-6 h-6" /> {content.educationTitle}
            </h3>
             <div className={`space-y-8 relative border-l-2 ${classes.border.default} ml-3 pl-8 pb-4`}>
              {content.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <motion.div 
                     initial={{ scale: 1 }}
                     whileInView={{ scale: [1, 1.2, 1] }}
                     transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                     className={`absolute -left-[41px] top-0 w-5 h-5 ${classes.bg.base} border-4 border-secondary rounded-full z-10`}
                  />
                  
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`p-6 rounded-xl transition-all duration-300 border ${
                      theme === 'dark' 
                        ? `${classes.effects.glass} ${classes.border.subtle} hover:border-secondary/30 hover:bg-white/[0.05]` 
                        : 'bg-white shadow-md hover:shadow-lg border-gray-200 hover:border-secondary/30'
                    }`}
                  >
                    <span className="text-sm font-mono text-secondary mb-1 block">
                      {edu.period}
                    </span>
                    <h4 className={`text-xl font-bold ${classes.text.primary} mb-1`}>
                      {edu.degree}
                    </h4>
                    <h5 className={`${classes.text.secondary} mb-2 font-medium`}>
                       {edu.institution}
                    </h5>
                     <p className={`${classes.text.muted} text-sm`}>
                      {edu.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Experience;