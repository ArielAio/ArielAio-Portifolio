import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Terminal lines simulation
  const lines = [
    { text: "$ npm run dev", delay: 0 },
    { text: "> portfolio@1.0.0 dev", delay: 300 },
    { text: "> vite --port 3001", delay: 600 },
    { text: "", delay: 800 },
    { text: "Loading components...", delay: 1000 },
    { text: "Checking performance...", delay: 1400 },
    { text: "Optimizing assets...", delay: 1800 },
    { text: "Starting server...", delay: 2200 },
    { text: "", delay: 2400 },
    { text: "✓ Ready in 2.5s", delay: 2600, success: true },
  ];

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Lines appearing
    lines.forEach((line, index) => {
      setTimeout(() => {
        setCurrentLine(index + 1);
      }, line.delay);
    });

    // Complete
    setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="w-full max-w-2xl px-6">
        
        {/* Terminal Header */}
        <div className="bg-[#1e1e1e] rounded-t-lg border border-gray-800 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-400 text-sm">ariel-portfolio — loading</span>
          </div>
          <Terminal size={16} className="text-gray-400" />
        </div>

        {/* Terminal Body */}
        <div className="bg-[#1e1e1e] rounded-b-lg border-x border-b border-gray-800 p-6 min-h-[320px]">
          
          {/* Terminal Lines */}
          <div className="space-y-2 mb-6">
            <AnimatePresence>
              {lines.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm ${
                    line.success 
                      ? 'text-green-400' 
                      : line.text.startsWith('$') 
                        ? 'text-blue-400' 
                        : line.text.startsWith('>')
                          ? 'text-gray-500'
                          : 'text-gray-300'
                  }`}
                >
                  {line.text}
                  {index === currentLine - 1 && showCursor && (
                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-400 text-xs">Loading</span>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <span className="text-gray-400 text-xs w-12 text-right">{progress}%</span>
            </div>
          </div>

          {/* Fake Loading Dots */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-500 text-xs">Preparing environment</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-gray-500 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
          <span>Ariel Aio — Portfolio 2025</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>System active</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;