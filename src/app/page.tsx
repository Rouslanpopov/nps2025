'use client';

import { useRef, useState } from 'react';
import VideoBackground, { VideoBackgroundRef } from '@/components/VideoBackground';
import NPSScoreCardWithLiquidGlass from '@/components/NPSScoreCardWithLiquidGlass';

export default function Home() {
  const videoRef = useRef<VideoBackgroundRef>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const audioSrc = process.env.NODE_ENV === 'production' ? '/nps2025/audio/background.mp3' : '/audio/background.mp3';

  const handleAudioToggle = () => {
    videoRef.current?.toggleAudio();
  };

  return (
    <main className="relative min-h-screen">
      <VideoBackground
        ref={videoRef}
        src={process.env.NODE_ENV === 'production' ? '/nps2025/videos/background.mp4' : '/videos/background.mp4'}
        audioSrc={audioSrc}
        volume={0.5}
        overlay={true}
        onAudioToggle={setAudioEnabled}
      />

      {audioSrc && (
        <button
        onClick={handleAudioToggle}
        className="fixed top-4 right-4 z-10 p-2 md:p-3 bg-black/30 hover:bg-black/40 rounded-full text-white transition-all duration-200 cursor-pointer shadow-lg w-8 h-8 md:w-12 md:h-12"
        aria-label={audioEnabled ? 'Désactiver l\'audio' : 'Activer l\'audio'}
      >
        {audioEnabled ? (
          <div className="w-4 h-4 md:w-6 md:h-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </div>
        ) : (
          <div className="w-4 h-4 md:w-6 md:h-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </div>
        )}
      </button>
      )}

      <NPSScoreCardWithLiquidGlass 
        score={63}
        distortionStrength={120}
        noiseFrequency={0.008}
        numOctaves={2}
        turbulenceType="fractalNoise"
        width={700}
        height={300}
        borderRadius={24}
      />
    </main>
  );
} 