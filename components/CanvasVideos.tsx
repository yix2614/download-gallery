import React from 'react';

export type CanvasVideoItem = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  opacity: number;
};

type CanvasVideosProps = {
  items: CanvasVideoItem[];
};

const CanvasVideos: React.FC<CanvasVideosProps> = ({ items }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <style>
        {`@keyframes canvasEnter{0%{opacity:0;transform:rotate(-25deg) scale(0.95);}100%{opacity:1;transform:rotate(0deg) scale(1);}}@keyframes itemFade{0%{opacity:0;}100%{opacity:var(--opacity);}}`}
      </style>
      <div
        className="relative w-[200%] h-full"
        style={{
          left: 'calc(-50% + 80px)',
          transformOrigin: '100% 100%',
          animation: 'canvasEnter 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both'
        }}
      >
        {items.map((video) => {
          const radius = Math.min(video.width, video.height) * 0.12;
          const xValues = items.map((item) => item.x);
          const maxX = Math.max(...xValues);
          const minX = Math.min(...xValues);
          const rangeX = Math.max(1, maxX - minX);
          const delay = ((maxX - video.x) / rangeX) * 0.6;
          return (
          <div
            key={video.id}
            className="absolute"
            style={{
              left: `${video.x}px`,
              top: `${video.y}px`,
              width: `${video.width}px`,
              height: `${video.height}px`,
                transform: `scale(${video.scale})`,
                transformOrigin: 'center',
                animation: 'itemFade 0.5s ease-out both',
                animationDelay: `${delay}s`,
                ['--opacity' as string]: video.opacity
            }}
          >
            <video
              className="w-full h-full object-cover shadow-2xl"
              style={{ borderRadius: `${radius}px` }}
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default CanvasVideos;
