
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TikTokTrend } from '../types';

interface CircularCarouselProps {
  items: TikTokTrend[];
}

const CircularCarousel: React.FC<CircularCarouselProps> = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const currentRotationRef = useRef(0);
  
  const radius = 320; // Radius of the circle
  const itemCount = items.length;
  const angleStep = 360 / itemCount;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    startXRef.current = x;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (startXRef.current === null) return;
    
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const deltaX = x - startXRef.current;
    
    // Sensitivity: 0.2 degrees per pixel
    const newRotation = currentRotationRef.current + (deltaX * 0.2);
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    if (startXRef.current === null) return;
    
    // Snap to the nearest item
    const snappedRotation = Math.round(rotation / angleStep) * angleStep;
    setRotation(snappedRotation);
    currentRotationRef.current = snappedRotation;
    
    // Calculate which index is in front
    // Each increment of snappedRotation/angleStep shifts the index
    const indexOffset = Math.round(-snappedRotation / angleStep);
    const newActiveIndex = ((indexOffset % itemCount) + itemCount) % itemCount;
    setActiveIndex(newActiveIndex);
    
    startXRef.current = null;
  };

  useEffect(() => {
    // Sync active index if the rotation changes externally or initially
    const indexOffset = Math.round(-rotation / angleStep);
    const newActiveIndex = ((indexOffset % itemCount) + itemCount) % itemCount;
    setActiveIndex(newActiveIndex);
  }, [rotation, angleStep, itemCount]);

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center perspective-1000 preserve-3d transition-transform duration-500 ease-out select-none cursor-grab active:cursor-grabbing"
      style={{ transform: `rotateY(${rotation}deg)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={(e) => startXRef.current !== null && handleTouchMove(e)}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {items.map((item, index) => {
        const itemAngle = index * angleStep;
        const isActive = activeIndex === index;
        
        return (
          <div
            key={item.id}
            className="absolute w-[240px] h-[360px] preserve-3d transition-all duration-300"
            style={{
              transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
              opacity: Math.abs(((index - activeIndex + itemCount + itemCount / 2) % itemCount) - itemCount / 2) > 2 ? 0.3 : 1,
              scale: isActive ? '1.1' : '0.9',
            }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-white/10 relative group">
              <img 
                src={item.imageUrl} 
                alt={item.caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                    {item.user[1].toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold">{item.user}</span>
                </div>
                <p className="text-sm line-clamp-2 leading-snug mb-2 font-medium">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff2d55]/80 backdrop-blur-sm uppercase tracking-wider font-bold">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 opacity-80">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-[10px] font-bold">{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Static Visual Indicator for "Center" */}
      <div className="absolute bottom-[-40px] flex gap-1 z-30">
        {items.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#ff2d55]' : 'w-1 bg-white/20'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default CircularCarousel;
