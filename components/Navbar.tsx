import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = NAV_LINKS[language];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 perspective-1000 ${
        scrolled 
          ? theme === 'dark'
            ? 'bg-dark/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-300 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center transform-style-3d">
        {/* Logo Section - Reverted to Clean Text */}
        <motion.a 
          href="#"
          whileHover={{ scale: 1.05, z: 20 }}
          whileTap={{ scale: 0.95, z: -10 }}
          className="flex flex-col cursor-pointer group transform-style-3d"
        >
          <span className={`text-2xl font-bold font-mono tracking-tighter group-hover:text-primary transition-colors leading-none ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Ariel Aio
          </span>
          <span className={`text-[10px] tracking-widest uppercase font-sans transition-colors ${
            theme === 'dark' 
              ? 'text-gray-400 group-hover:text-white' 
              : 'text-gray-600 group-hover:text-gray-900'
          }`}>
            Full Stack Developer
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  z: 10
              }}
              whileTap={{ scale: 0.95, z: -5 }}
              className={`text-sm font-bold tracking-wide relative group py-2 transform-style-3d transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {link.name}
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg ${
              theme === 'dark'
                ? 'border-2 border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-primary/50'
                : 'border-2 border-gray-400 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-500'
            }`}
          >
             <Globe size={16} />
             <span className="font-mono">{language.toUpperCase()}</span>
          </motion.button>
        </div>

        {/* Mobile Toggle & Theme & Language */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle isMobile />
          
          <motion.button
            onClick={toggleLanguage}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border-2 text-xs font-bold shadow-lg ${
              theme === 'dark'
                ? 'border-white/20 bg-white/5 text-gray-300'
                : 'border-gray-400 bg-gray-100 text-gray-700'
            }`}
          >
             <span className="font-mono">{language.toUpperCase()}</span>
          </motion.button>

          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            whileTap={{ scale: 0.9 }}
            className={`focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`md:hidden backdrop-blur-xl border-b ${
            theme === 'dark'
              ? 'bg-dark/95 border-white/10'
              : 'bg-white/95 border-gray-300'
          }`}
        >
          <div className="px-6 py-8 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                whileTap={{ scale: 0.95, x: 10 }}
                className={`text-lg font-bold hover:text-primary transition-colors ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
});

export default Navbar;