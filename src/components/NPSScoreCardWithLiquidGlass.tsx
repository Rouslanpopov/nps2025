'use client';

import { useEffect, useRef, useState } from 'react';
import LogoMemory from './logoMemory';
import ProgressBar from './progressBar';
import Cursor from './cursor';

interface NPSScoreCardWithLiquidGlassProps {
  score?: number;
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  showControls?: boolean;
  distortionStrength?: number;
  noiseFrequency?: number;
  numOctaves?: number;
  turbulenceType?: 'fractalNoise' | 'turbulence';
}

export default function NPSScoreCardWithLiquidGlass({
  score = 63,
  className = '',
  width = 400,
  height = 320,
  borderRadius = 24,
  showControls = false,
  distortionStrength = 120,
  noiseFrequency = 0.008,
  numOctaves = 2,
  turbulenceType = 'fractalNoise'
}: NPSScoreCardWithLiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const [glassConfig] = useState({
    shadowBlur: 6,
    shadowSpread: -3,
    tintOpacity: 3,
    frostBlur: 2,
    noiseFrequency: noiseFrequency,
    distortionStrength: distortionStrength,
    numOctaves: numOctaves,
    turbulenceType: turbulenceType,
    seed: 92,
    stitchTiles: 'noStitch' as 'stitch' | 'noStitch'
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    container.style.setProperty('--shadow-blur', `${glassConfig.shadowBlur}px`);
    container.style.setProperty('--shadow-spread', `${glassConfig.shadowSpread}px`);
    container.style.setProperty('--shadow-color', 'rgba(255, 255, 255, 0.7)');
    container.style.setProperty('--tint-color', '100, 200, 255');
    container.style.setProperty('--tint-opacity', (glassConfig.tintOpacity / 100).toString());
    container.style.setProperty('--frost-blur', `${glassConfig.frostBlur}px`);
  }, [glassConfig, width, height, borderRadius]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const duration = 4000;
      const startTime = Date.now();
      const startScore = 0;
      const targetScore = score;
      const scoreRange = targetScore - startScore;

      const animateScore = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 2);
        
        const currentScore = Math.round(startScore + (easeOut * scoreRange));
        setAnimatedScore(currentScore);

        if (progress < 1) {
          requestAnimationFrame(animateScore);
        }
      };

      animateScore();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [score]);

      return (
      <div className="fixed inset-0 flex items-center flex-col justify-center">
        <div className="flex flex-col justify-end w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] 3xl:w-[20%]">
          <div className="relative">
          <div 
            className="bg-black/20 backdrop-blur-sm px-6 py-4 flex justify-between items-center"
            style={{ 
              height: '50px',
              borderRadius: `${borderRadius}px ${borderRadius}px 0 0`
            }}
          >
            <div className="text-white/90 font-medium text-lg">NPS Score</div>
            <div className="px-4 py-1 bg-green-500 rounded-md">
              <span className="text-white font-bold text-sm">GREAT!</span>
            </div>
          </div>

          <div 
            className="absolute"
            style={{ 
              bottom: '-24px',
              left: '0px',
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle at 100% 100%, transparent 24px, rgba(0, 0, 0, 0.2) 24px)'
            }}
          />
          <div 
            className="absolute"
            style={{ 
              bottom: '-24px',
              right: '0px',
              width: '24px',
              height: '24px',
              background: 'radial-gradient(circle at 0 100%, transparent 24px, rgba(0, 0, 0, 0.2) 24px)'
            }}
          />
        </div>

        <div 
          ref={containerRef}
          className={`px-6 pb-8 pt-8 mb-20 w-full relative isolation-isolate ${className}`}
          style={{ 
            width: `100%`,
            borderRadius: `${borderRadius}px`,
            marginTop: '0px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              borderRadius: `${borderRadius}px`,
              backdropFilter: `blur(var(--frost-blur, 8px))`,
              WebkitBackdropFilter: `blur(var(--frost-blur, 8px))`,
              filter: 'url(#nps-liquid-glass-filter)',
              zIndex: -1
            }}
          />

          <div className="grid grid-cols-2 justify-between items-center mb-4 space-x-2">
            <div className="bg-black/10 backdrop-blur-md border border-white/20 rounded-full px-6 min-w-24 md:min-w-56 flex justify-center col-span-1 justify-self-start">
              <div className="flex items-center space-x-2 justify-end">
                <span className="text-white text-[52px] md:text-[64px] font-bold">{animatedScore}</span>
                <span className="text-white/60 text-[20px] md:text-[24px]">/100</span>
              </div>
            </div>
              <LogoMemory className="w-28 h-28 md:w-36 md:h-36 col-span-1 justify-self-end" />
          </div>

          <div className="grid grid-cols-8 items-center mb-2 text-xs sm:text-sm"> 
            <span className="col-span-4 text-white font-medium text-start">-100</span>
            <span className="col-span-1 text-white font-medium text-start">0</span>
            <span className="col-span-1 text-white font-medium text-start">30</span>
            <span className="col-span-1 text-white font-medium text-start">70</span>
            <span className="col-span-1 text-white font-medium text-end">100</span>
          </div>

          <div className="w-full pb-4 relative flex justify-center">
            <ProgressBar />
            <div 
              className="absolute top-[-12px] animate-cursor-slide"
            >
              <Cursor />
            </div>
          </div>

          <div className="grid grid-cols-8 items-center"> 
            <span className="col-span-4 border-b border-l border-r border-white/60 h-2 w-[98%]"></span>
            <span className="col-span-1 border-b border-l border-r border-white/60 h-2 w-[90%]"></span>
            <span className="col-span-1 border-b border-l border-r border-white h-2 w-[90%]"></span>
            <span className="col-span-2 border-b border-l border-r border-white/60 h-2 w-[90%]"></span>
          </div>

          <div className="grid grid-cols-8 items-center text-[10px] md:text-sm"> 
             <span className="col-span-4 text-white/60 font-medium text-center">NEEDS IMPROVEMENT</span>
             <span className="col-span-1 text-white/60 font-medium text-center">GOOD</span>
             <span className="col-span-1 text-white font-medium text-center">GREAT</span>
             <span className="col-span-2 text-white/60 font-medium text-center">EXCELLENT</span>
          </div>
        </div>

        <svg 
          className="absolute inset-0 pointer-events-none" 
          width="0" 
          height="0"
          style={{ position: 'absolute', overflow: 'hidden' }}
        >
          <defs>
            <filter id="nps-liquid-glass-filter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type={glassConfig.turbulenceType}
                baseFrequency={`${glassConfig.noiseFrequency * 0.4} ${glassConfig.noiseFrequency}`}
                numOctaves={glassConfig.numOctaves}
                seed={glassConfig.seed}
                stitchTiles={glassConfig.stitchTiles}
                result="noise" 
              />
              <feGaussianBlur 
                in="noise" 
                stdDeviation="4 2" 
                result="blurred" 
              />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale={glassConfig.distortionStrength * 2}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="text-white/90 space-y-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-400">🧡</span>
          <span>Our NPS reflects the impact of our teams.</span>
        </div>
        
        <p className="text-sm text-white/70 text-center">
          Want to help design products that users love too?
        </p>
        
          <div className="flex flex-col md:flex-row items-center gap-3 mt-4 w-full justify-center">
            <button className="w-full md:w-auto px-6 py-2 border border-white/30 rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => {
                window.open('https://careers.smartrecruiters.com/VusionGroupSA/all-job-offers', '_blank');
              }}
            >
              Our Jobs
            </button>
            <button className="w-full md:w-auto px-6 py-2 bg-white rounded-xl text-black text-sm font-medium hover:bg-white/90 transition-colors"
              onClick={() => {
                window.open('https://www.inthememory.com/careers', '_blank');
              }}
            >
              Learn more
            </button>
          </div>
      </div>
    </div>
  );
} 