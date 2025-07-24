import React from 'react';

interface ProgressBarProps {
  score?: number;
  height?: number;
  className?: string;
}

export default function ProgressBar({ 
  height = 16,
  className = '' 
}: ProgressBarProps) {

  return (
    <div className={`relative w-full ${className}`} style={{ height: `${height}px` }}>
      <div 
        className="w-full h-full relative"
        style={{
          borderRadius: '9px',
          border: '3px solid rgba(0, 0, 0, 0.16)',
          background: 'transparent'
        }}
      >
        <div 
          className="absolute w-auto h-auto"
          style={{
            inset: '0px',
            borderRadius: '6px',
            background: 'linear-gradient(to right, #F2723E 0%, #EE4E4D 40.43%, #934CD6 59.57%, #0DAE33 82.21%, #00711B 100%)'
          }}
        />
      </div>
    </div>
  );
}