import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_CONTENT, SOCIALS } from '../constants';
import { Send, CheckCircle, Copy, Check, Mail, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { usePerformance } from '../PerformanceContext';
import { useTheme } from '../ThemeContext';
import { useThemeClasses } from '../hooks/useThemeClasses';
import emailjs from '@emailjs/browser';

const Contact: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { isLowPower } = usePerformance();
  const { theme } = useTheme();
  const classes = useThemeClasses();
  const content = CONTACT_CONTENT[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arielaio@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Verificar se as variáveis de ambiente estão configuradas
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('❌ EmailJS não configurado! Leia o arquivo EMAILJS_SETUP.md');
      // Fallback para mailto: se não configurado
      const subject = encodeURIComponent("Contato via Portfólio");
      const body = encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`);
      window.open(`mailto:arielaio@hotmail.com?subject=${subject}&body=${body}`, '_blank');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      // Enviar email via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('✅ Email enviado com sucesso!');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      setStatus('error');
      setErrorMessage('Erro ao enviar mensagem. Tente novamente.');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
        {/* Decorative background circle - Optimized blur based on power tier */}
      <div className={`absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full pointer-events-none opacity-50 animate-pulse ${isLowPower ? 'blur-[40px]' : 'blur-[60px] md:blur-[100px]'}`}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl mx-auto rounded-3xl p-8 md:p-12 border relative overflow-hidden ${
          theme === 'dark'
            ? `${classes.effects.glass} ${classes.border.default} ${classes.shadow.xl}`
            : 'bg-white border-gray-200 shadow-2xl'
        }`}>
          
          <div className={`absolute top-0 left-0 w-full h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-900/20 to-transparent'}`}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl font-bold mb-6 ${classes.text.primary}`}
              >
                {content.title} <span className="text-secondary">{content.titleHighlight}</span>
              </motion.h2>
              <p className={`${classes.text.secondary} mb-8`}>
                {content.description}
              </p>

              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer mb-8 group relative overflow-hidden"
                onClick={handleCopyEmail}
                initial={{ 
                    backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 1)", 
                    borderColor: theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(156, 163, 175, 1)" 
                }}
                whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(249, 250, 251, 1)" 
                }}
                whileTap={{ scale: 0.97 }}
                animate={{
                    borderColor: copied ? "rgba(34, 197, 94, 0.5)" : (theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(156, 163, 175, 1)"),
                    backgroundColor: copied ? "rgba(34, 197, 94, 0.1)" : (theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 1)")
                }}
              >
                {/* Shine effect on copy - Disable on low power */}
                {copied && !isLowPower && (
                    <motion.div 
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "200%", opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-12"
                    />
                )}

                <div className={`p-2 rounded-lg transition-colors relative z-10 ${
                    copied 
                        ? "bg-green-500/20 text-green-400" 
                        : theme === 'dark'
                            ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                            : "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white"
                }`}>
                    <Mail size={20} />
                </div>
                <div className="flex-1 relative z-10">
                    <p className={`text-xs font-mono transition-colors ${
                        copied 
                            ? "text-green-400 font-bold" 
                            : theme === 'dark' ? "text-gray-500" : "text-gray-600"
                    }`}>
                        {copied ? content.copied : content.copyEmail}
                    </p>
                    <p className={`text-sm md:text-base font-mono ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>arielaio@hotmail.com</p>
                </div>
                <div className={`p-2 transition-colors relative z-10 ${
                    copied 
                        ? "text-green-400" 
                        : theme === 'dark'
                            ? "text-gray-400 group-hover:text-white"
                            : "text-gray-600 group-hover:text-gray-900"
                }`}>
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Check size={20} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <Copy size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 5,
                      boxShadow: theme === 'dark' 
                        ? "0 0 25px rgba(99, 102, 241, 0.5)" 
                        : "0 0 20px rgba(99, 102, 241, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 group relative overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/30 text-white hover:bg-primary hover:border-primary hover:text-white shadow-lg'
                        : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white hover:bg-primary hover:border-primary shadow-xl'
                    }`}
                  >
                    {/* Shine effect on hover */}
                    {!isLowPower && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />
                    )}
                    <social.icon size={22} className="relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="group">
                <label className={`block text-sm font-bold mb-2 transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 group-focus-within:text-primary' 
                    : 'text-gray-700 group-focus-within:text-primary'
                }`}>
                  {content.formName}
                </label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-xl p-4 font-medium focus:outline-none transition-[border-color,background-color,box-shadow] duration-200 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-primary focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      : 'bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-gray-50 focus:border-primary focus:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  } shadow-lg`}
                  placeholder={content.formNamePlaceholder} 
                />
              </div>
              
              <div className="group">
                <label className={`block text-sm font-bold mb-2 transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 group-focus-within:text-primary' 
                    : 'text-gray-700 group-focus-within:text-primary'
                }`}>
                  {content.formEmail}
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl p-4 font-medium focus:outline-none transition-[border-color,background-color,box-shadow] duration-200 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-primary focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      : 'bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-gray-50 focus:border-primary focus:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  } shadow-lg`}
                  placeholder={content.formEmailPlaceholder} 
                />
              </div>
              
              <div className="group">
                <label className={`block text-sm font-bold mb-2 transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 group-focus-within:text-primary' 
                    : 'text-gray-700 group-focus-within:text-primary'
                }`}>
                  {content.formMessage}
                </label>
                <textarea 
                  name="message"
                  required
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl p-4 font-medium focus:outline-none transition-[border-color,background-color,box-shadow] duration-200 resize-none ${
                    theme === 'dark'
                      ? 'bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-primary focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      : 'bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-gray-50 focus:border-primary focus:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  } shadow-lg`}
                  placeholder={content.formMessagePlaceholder}
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ 
                  scale: status === 'sending' ? 1 : 1.03,
                  boxShadow: status === 'sending' ? undefined : (theme === 'dark' 
                    ? '0 0 40px rgba(99, 102, 241, 0.6), 0 10px 30px rgba(99, 102, 241, 0.3)'
                    : '0 0 30px rgba(99, 102, 241, 0.4), 0 10px 25px rgba(99, 102, 241, 0.2)')
                }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                className={`w-full font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 overflow-hidden relative group text-lg ${
                  status === 'success' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]' 
                    : status === 'error'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                    : status === 'sending'
                    ? 'bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer text-white opacity-80 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'bg-gradient-to-r from-primary via-indigo-500 to-secondary text-white shadow-[0_10px_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] border-2 border-primary/30'
                    : 'bg-gradient-to-r from-indigo-600 via-primary to-purple-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] border-2 border-indigo-400'
                }`}
              >
                 {/* Animated background shimmer */}
                 {!isLowPower && status === 'idle' && (
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-0"
                    />
                 )}
                 
                 {/* Glow effect on hover */}
                 {!isLowPower && status === 'idle' && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-white/10 to-secondary/20 blur-xl z-0"></div>
                 )}
                 
                 <span className="relative z-10 flex items-center gap-2">
                    {status === 'idle' && (
                    <>{content.sendButton} <Send size={18} /></>
                    )}
                    {status === 'sending' && (
                    <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> {content.sending}</>
                    )}
                    {status === 'success' && (
                    <>{content.sent} <CheckCircle size={18} /></>
                    )}
                    {status === 'error' && (
                    <><AlertCircle size={18} /> {errorMessage}</>
                    )}
                 </span>
              </motion.button>
            </form>

          </div>
        </div>
        
        <div className={`text-center mt-12 ${classes.text.muted} text-sm`}>
            <p>&copy; {new Date().getFullYear()} Ariel Aio. {content.footerRights}</p>
        </div>
      </div>
    </section>
  );
});

export default Contact;