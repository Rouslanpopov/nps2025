'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface VideoBackgroundProps {
  src: string;
  audioSrc?: string;
  fallbackImage?: string;
  className?: string;
  overlay?: boolean;
  volume?: number;
  onAudioToggle?: (enabled: boolean) => void;
}

export interface VideoBackgroundRef {
  toggleAudio: () => void;
  isAudioEnabled: () => boolean;
}

const VideoBackground = forwardRef<VideoBackgroundRef, VideoBackgroundProps>(({ 
  src, 
  audioSrc,
  className = '',
  overlay = true,
  volume = 0.5,
  onAudioToggle
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    setIsLoaded(true);

    const handleLoadedData = () => {
      video.play().catch((error) => {
      });
    };

    const handleError = (error: any) => {
      setHasError(true);
    };

    if (audio && audioSrc) {
      audio.volume = volume;
      audio.loop = true;
      
      const syncAudioWithVideo = () => {
        if (audioEnabled && video.paused) {
          audio.pause();
        } else if (audioEnabled && !video.paused) {
          audio.play().catch(console.log);
        }
      };

      video.addEventListener('play', syncAudioWithVideo);
      video.addEventListener('pause', syncAudioWithVideo);
      
      return () => {
        video.removeEventListener('play', syncAudioWithVideo);
        video.removeEventListener('pause', syncAudioWithVideo);
      };
    }

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [src, audioSrc, volume, audioEnabled]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    const video = videoRef.current;

    const newState = !audioEnabled;
    setAudioEnabled(newState);
    
    if (newState && audio && video) {
      audio.currentTime = video.currentTime;
      audio.play().catch(console.log);
    } else if (audio) {
      audio.pause();
    }
    
    onAudioToggle?.(newState);
  };

  const handleAudioToggle = () => {
    toggleAudio();
  };

  useImperativeHandle(ref, () => ({
    toggleAudio: handleAudioToggle,
    isAudioEnabled: () => audioEnabled
  }));

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      {!hasError ? (
        <>
          <video
            ref={videoRef}
            className={`video-background transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={src}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          
          {audioSrc && (
            <audio
              ref={audioRef}
              preload="auto"
              src={audioSrc}
              loop
            />
          )}
        </>
      ) : (
        <div
          className="video-background bg-cover bg-center bg-no-repeat"
        />
      )}



      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40 pointer-events-none z-10" />
      )}
      
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{ 
            backgroundColor: 'orange'
          }}
        />
      )}
    </div>
  );
});

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground; 