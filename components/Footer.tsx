
import React from 'react';

type FooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Footer: React.FC<FooterProps> = ({ className, style }) => {
  return (
    <footer className={`w-full z-50 px-4 flex justify-center ${className ?? ''}`} style={style}>
      <button className="w-[334px] h-[48px] px-[14px] py-2 bg-[#ff2d55] rounded-full flex items-center justify-center gap-1 text-white font-semibold text-2xl border-none shadow-lg">
        <span className="text-[16px]">Download TikTok App</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clipPath="url(#clip0_1931_19057)">
            <path d="M10 0.833008C15.0626 0.833008 19.167 4.93739 19.167 10C19.167 15.0626 15.0626 19.167 10 19.167C4.93741 19.167 0.833033 15.0626 0.833008 10C0.833008 4.93739 4.93739 0.833008 10 0.833008ZM10.8838 5.53906C10.7211 5.37634 10.4576 5.37634 10.2949 5.53906L9.70508 6.12793C9.54262 6.29055 9.54275 6.5541 9.70508 6.7168L12.1553 9.16699H5.41699C5.18697 9.16699 5.00015 9.35302 5 9.58301V10.417C5.0002 10.6469 5.187 10.833 5.41699 10.833H12.1553L9.70508 13.2832C9.54277 13.4459 9.5426 13.7095 9.70508 13.8721L10.2949 14.4609C10.4576 14.6237 10.7211 14.6237 10.8838 14.4609L14.7559 10.5889C15.0811 10.2635 15.0811 9.73654 14.7559 9.41113L10.8838 5.53906Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1931_19057">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
