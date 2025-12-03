import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PerformanceTier = 'low' | 'medium' | 'high';

interface PerformanceContextType {
  tier: PerformanceTier;
  reduceMotion: boolean;
  isLowPower: boolean;
  isLoading: boolean;
  completeLoading: () => void;
  enableAnimations: boolean;
  enableParticles: boolean;
  enable3D: boolean;
  gpuTier: 'low' | 'medium' | 'high';
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // SAFE-FIRST STRATEGY: Start with 'low' tier to ensure weak devices render the initial frame successfully.
  const [tier, setTier] = useState<PerformanceTier>('low'); 
  const [isLoading, setIsLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [gpuTier, setGpuTier] = useState<'low' | 'medium' | 'high'>('low');
  const [enableAnimations, setEnableAnimations] = useState(false);
  const [enableParticles, setEnableParticles] = useState(false);
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Check User Preference for Motion
    let motionQuery: MediaQueryList | null = null;
    
    try {
        if (typeof window !== 'undefined' && window.matchMedia) {
            motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (isMounted) setReduceMotion(motionQuery.matches);
            
            const handleMotionChange = (e: MediaQueryListEvent) => {
                if (isMounted) setReduceMotion(e.matches);
            };
            motionQuery.addEventListener('change', handleMotionChange);
        }
    } catch (e) {
        console.warn("MatchMedia not supported", e);
    }

    // 2. BENCHMARKING (The real test)
    let frameCount = 0;
    let startTime = performance.now();
    let rafId: number;

    const finalizeTier = (fps: number) => {
      if (!isMounted) return;

      try {
        // If user explicitly requested reduced motion, honor it -> Low Tier
        if (motionQuery && motionQuery.matches) {
            setTier('low');
            setEnableAnimations(false);
            setEnableParticles(false);
            setEnable3D(false);
            return;
        }

        let isMobile = false;
        let cores = 4;
        let memory = 4;

        // Defensive navigator access to prevent Script Errors in strict environments
        try {
            if (typeof navigator !== 'undefined') {
                isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                cores = navigator.hardwareConcurrency || 4;
                memory = (navigator as any).deviceMemory || 4;
            }
        } catch (e) {
            console.warn("Navigator access blocked", e);
        }
        
        // Detect GPU
        let detectedGpuTier: 'low' | 'medium' | 'high' = 'medium';
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl') as WebGLRenderingContext || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
          
          if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
              const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
              
              // High-end GPUs
              if (renderer.includes('nvidia') || renderer.includes('geforce') || 
                  renderer.includes('rtx') || renderer.includes('gtx') ||
                  renderer.includes('amd') || renderer.includes('radeon rx')) {
                detectedGpuTier = 'high';
              }
              // Integrated/Mobile GPUs
              else if (renderer.includes('intel') || renderer.includes('iris') ||
                       renderer.includes('mali') || renderer.includes('adreno') ||
                       renderer.includes('apple') || renderer.includes('m1') || renderer.includes('m2') || renderer.includes('m3')) {
                detectedGpuTier = isMobile ? 'low' : 'medium';
              }
              // Very low-end
              else if (renderer.includes('swiftshader') || renderer.includes('llvmpipe')) {
                detectedGpuTier = 'low';
              }
            }
          }
        } catch (e) {
          console.warn("GPU detection failed", e);
        }
        
        setGpuTier(detectedGpuTier);
        
        console.log(`[System Check] FPS: ${Math.round(fps)} | Mobile: ${isMobile} | Cores: ${cores} | RAM: ${memory}GB | GPU: ${detectedGpuTier}`);

        // Calculate performance score
        let score = 0;
        score += Math.min(cores * 8, 40); // CPU: max 40 points
        score += Math.min(memory * 5, 25); // RAM: max 25 points
        score += (fps / 60) * 20; // FPS: max 20 points
        
        // GPU score: max 15 points
        if (detectedGpuTier === 'high') score += 15;
        else if (detectedGpuTier === 'medium') score += 9;
        else score += 3;
        
        // Mobile penalty
        if (isMobile) score *= 0.7;
        
        console.log(`[Performance Score] ${Math.round(score)}/100`);

        // Decision Logic based on score
        let finalTier: PerformanceTier;
        let animations = false;
        let particles = false;
        let threeD = false;
        
        if (score >= 65) {
          finalTier = 'high';
          animations = true;
          particles = true;
          threeD = true;
        } else if (score >= 40) {
          finalTier = 'medium';
          animations = true;
          particles = false;
          threeD = false;
        } else {
          finalTier = 'low';
          animations = false;
          particles = false;
          threeD = false;
        }
        
        console.log(`[Final Settings] Tier: ${finalTier} | Animations: ${animations} | Particles: ${particles} | 3D: ${threeD}`);
        
        setTier(finalTier);
        setEnableAnimations(animations);
        setEnableParticles(particles);
        setEnable3D(threeD);
        
      } catch (err) {
        console.warn("Error finalizing tier, defaulting to low", err);
        setTier('low');
        setEnableAnimations(false);
        setEnableParticles(false);
        setEnable3D(false);
      }
    };

    const benchmark = () => {
      try {
        if (!isMounted) return;

        frameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;

        // Run benchmark for approx 800ms
        if (elapsed < 800) {
          rafId = requestAnimationFrame(benchmark);
        } else {
          const fps = (frameCount / elapsed) * 1000;
          // OPTIMIZATION: Cancel RAF immediately after calculation
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0 as unknown as number;
          }
          finalizeTier(fps);
        }
      } catch (error) {
        console.error("Benchmark error:", error);
        if (rafId) cancelAnimationFrame(rafId);
        finalizeTier(60); 
      }
    };

    // Start benchmark
    try {
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
            rafId = requestAnimationFrame(benchmark);
        } else {
            finalizeTier(60);
        }
    } catch (e) {
        finalizeTier(60);
    }

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
  };

  const value = {
    tier,
    reduceMotion,
    isLowPower: tier === 'low',
    isLoading,
    completeLoading,
    enableAnimations,
    enableParticles,
    enable3D,
    gpuTier
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};