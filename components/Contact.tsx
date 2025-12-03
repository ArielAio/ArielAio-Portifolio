
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIALS } from '../constants';
import { Send, CheckCircle, Copy, Check, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arielaio@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate network delay for effect
    setTimeout(() => {
      const subject = encodeURIComponent("Contato via Portfólio");
      const body = encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`);
      window.open(`mailto:arielaio@hotmail.com?subject=${subject}&body=${body}`, '_blank');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
        {/* Decorative background circle */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card max-w-4xl mx-auto rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gradient light inside card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Vamos trabalhar <span className="text-secondary">juntos?</span>
              </motion.h2>
              <p className="text-gray-400 mb-8">
                Tem um projeto em mente ou quer apenas dar um oi? Sinta-se à vontade para me mandar uma mensagem.
              </p>

              {/* Copy Email Component */}
              <motion.div 
                className="flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer mb-8 group relative overflow-hidden"
                onClick={handleCopyEmail}
                initial={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.05)" }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.97 }}
                animate={{
                    borderColor: copied ? "rgba(34, 197, 94, 0.5)" : "rgba(255, 255, 255, 0.05)",
                    backgroundColor: copied ? "rgba(34, 197, 94, 0.1)" : "rgba(255, 255, 255, 0.05)"
                }}
              >
                {/* Shine effect on copy */}
                {copied && (
                    <motion.div 
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "200%", opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-12"
                    />
                )}

                <div className={`p-2 rounded-lg transition-colors relative z-10 ${copied ? "bg-green-500/20 text-green-400" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
                    <Mail size={20} />
                </div>
                <div className="flex-1 relative z-10">
                    <p className={`text-xs font-mono transition-colors ${copied ? "text-green-400 font-bold" : "text-gray-500"}`}>
                        {copied ? "Copiado!" : "Email"}
                    </p>
                    <p className="text-sm md:text-base text-gray-200 font-mono">arielaio@hotmail.com</p>
                </div>
                <div className={`p-2 transition-colors relative z-10 ${copied ? "text-green-400" : "text-gray-400 group-hover:text-white"}`}>
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
                    whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center transition-colors text-gray-300 hover:text-white border border-white/5 cursor-pointer"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-1 group-focus-within:text-primary transition-colors">Nome</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-all peer relative z-10 focus:bg-dark/80" 
                    placeholder="Seu nome" 
                  />
                  <div className="absolute inset-0 rounded-lg border border-transparent peer-focus:border-primary peer-focus:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-1 group-focus-within:text-primary transition-colors">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-all peer relative z-10 focus:bg-dark/80" 
                    placeholder="seu@email.com" 
                  />
                   <div className="absolute inset-0 rounded-lg border border-transparent peer-focus:border-primary peer-focus:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all pointer-events-none"></div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-1 group-focus-within:text-primary transition-colors">Mensagem</label>
                <div className="relative">
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none transition-all peer relative z-10 focus:bg-dark/80" 
                    placeholder="Fale sobre seu projeto..."
                  ></textarea>
                   <div className="absolute inset-0 rounded-lg border border-transparent peer-focus:border-primary peer-focus:shadow-[0_0_10px_rgba(99,102,241,0.2)] transition-all pointer-events-none"></div>
                </div>
              </div>
              
              <motion.button 
                type="submit"
                disabled={status !== 'idle'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg overflow-hidden relative ${
                  status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 hover:shadow-primary/20'
                }`}
              >
                 {/* Shine effect on button */}
                 <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                 
                 <span className="relative z-10 flex items-center gap-2">
                    {status === 'idle' && (
                    <>Enviar Mensagem <Send size={18} /></>
                    )}
                    {status === 'sending' && (
                    <>Enviando...</>
                    )}
                    {status === 'success' && (
                    <>Mensagem Enviada! <CheckCircle size={18} /></>
                    )}
                 </span>
              </motion.button>
            </form>

          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Ariel Aio. Todos os direitos reservados.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
