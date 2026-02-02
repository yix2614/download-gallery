import React from 'react';

type TitleBlockProps = {
  className?: string;
  style?: React.CSSProperties;
};

const TitleBlock: React.FC<TitleBlockProps> = ({ className, style }) => {
  return (
    <div className={`w-full px-4 mb-[34px] ${className ?? ''}`} style={style}>
      <h1 className="text-white font-semibold text-center tracking-tight" style={{ fontSize: '40px', lineHeight: '1.2', fontWeight: 600 }}>
        Download TikTok<br />
        <span className="text-white">make your day</span>
      </h1>
    </div>
  );
};

export default TitleBlock;
