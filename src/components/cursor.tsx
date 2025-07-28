import React from 'react';

interface CursorProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Cursor({ 
  width = 48, 
  height = 55, 
  className = ''
}: CursorProps) {
  return (
    <div 
      className={`cursor-container ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div 
        className="cursor-stem"
        style={{
          position: 'absolute',
          left: '21px',
          top: '0px',
          width: '6px',
          height: '40px',
          borderRadius: '3px',
          backgroundColor: '#F2723E',
        }}
      />
      
      <div 
        className="cursor-circle"
        style={{
          position: 'absolute',
          left: '16px',
          top: '12px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'white',
          outline: '4px solid rgba(0, 0, 0, 0.16)',
        }}
      />
    </div>
  );
}
