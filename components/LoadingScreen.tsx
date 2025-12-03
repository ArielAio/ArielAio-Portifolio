import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Cpu, Zap, Layers } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing System...");
  const [glitchActive, setGlitchActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Sequence of "system checks" with glitch effects
    const timeline = [
      { p: 15, txt: "Initializing Neural Network...", time: 400 },
      { p: 30, txt: "Analyzing Hardware Architecture...", time: 800 },
      { p: 45, txt: "Calibrating GPU Cores...", time: 1200 },
      { p: 60, txt: "Loading 3D Engine...", time: 1600 },
      { p: 75, txt: "Optimizing Performance...", time: 2000 },
      { p: 90, txt: "Finalizing Assets...", time: 2400 },
      { p: 100, txt: "System Online.", time: 2800 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(({ p, txt, time }) => {
      const t = setTimeout(() => {
        setProgress(p);
        setStatus(txt);
        
        // Random glitch effect
        if (Math.random() > 0.6) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 150);
        }

        if (p === 100) {
          setTimeout(onComplete, 600);
        }
      }, time);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#020617] via-[#0a0f2e] to-[#020617] flex flex-col items-center justify-center font-mono overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridPulse 4s ease-in-out infinite'
        }} />
      </div>

      {/* Floating Particles with Mouse Interaction */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            x: useTransform(mouseX, [0, window.innerWidth], [-20, 20]),
            y: useTransform(mouseY, [0, window.innerHeight], [-20, 20]),
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central 3D Cube Animation */}
      <div className="relative mb-12 perspective-1000">
        <motion.div
          className="relative w-32 h-32"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Cube Faces */}
          {[
            { rotate: 'rotateY(0deg)', color: 'from-primary/40 to-primary/10' },
            { rotate: 'rotateY(90deg)', color: 'from-secondary/40 to-secondary/10' },
            { rotate: 'rotateY(180deg)', color: 'from-primary/40 to-primary/10' },
            { rotate: 'rotateY(-90deg)', color: 'from-secondary/40 to-secondary/10' },
            { rotate: 'rotateX(90deg)', color: 'from-primary/40 to-primary/10' },
            { rotate: 'rotateX(-90deg)', color: 'from-secondary/40 to-secondary/10' },
          ].map((face, i) => (
            <div
              key={i}
              className={`absolute w-32 h-32 bg-gradient-to-br ${face.color} border border-primary/30 backdrop-blur-sm flex items-center justify-center`}
              style={{
                transform: `${face.rotate} translateZ(64px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {i === 0 && <Cpu size={40} className="text-primary opacity-60" />}
              {i === 1 && <Zap size={40} className="text-secondary opacity-60" />}
              {i === 2 && <Layers size={40} className="text-primary opacity-60" />}
            </div>
          ))}
        </motion.div>

        {/* Orbiting Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-primary/20 rounded-full"
            style={{
              width: 160 + i * 40,
              height: 160 + i * 40,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      {/* Status and Progress */}
      <div className="w-full max-w-md px-6 relative z-10">
        
        {/* Status Text with Glitch Effect */}
        <div className="flex justify-between items-end mb-3">
          <motion.span 
            className={`text-xs uppercase tracking-widest ${glitchActive ? 'text-red-400' : 'text-gray-400'}`}
            animate={glitchActive ? {
              x: [0, -2, 2, -2, 0],
              textShadow: [
                "0 0 0px rgba(255,0,0,0)",
                "2px 0 0px rgba(255,0,0,0.8), -2px 0 0px rgba(0,255,255,0.8)",
                "0 0 0px rgba(255,0,0,0)"
              ]
            } : {}}
            transition={{ duration: 0.15 }}
          >
            {status}
          </motion.span>
          <motion.span 
            className="text-2xl font-bold text-primary"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            {progress}%
          </motion.span>
        </div>

        {/* Holographic Progress Bar */}
        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-primary/20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: 0.3 }}
          />
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Binary Rain Effect */}
        <div className="mt-6 flex justify-center gap-1 font-mono text-[10px] text-primary/40">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.span>
          ))}
        </div>

        {/* Pulse Indicator */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <motion.div 
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Neural Processing
          </span>
          <motion.div 
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;