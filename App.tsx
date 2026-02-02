
import React from 'react';
import Logo from './components/Logo';
import TitleBlock from './components/TitleBlock';
import Footer from './components/Footer';
import CanvasVideos, { CanvasVideoItem } from './components/CanvasVideos';

const initialVideos: CanvasVideoItem[] = [
  {
    id: 'video-1',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769402474/TIKTOK_MEISHA_GYM_E_2_gn9rcb.mp4',
    x: 435,
    y: 100,
    width: 130,
    height: 195,
    scale: 1.3,
    opacity: 1
  },
  {
    id: 'video-2',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1770005519/TIKTOK_AU_GAMERS_1_cb5b7l.mp4',
    x: 169,
    y: 32,
    width: 72,
    height: 108,
    scale: 1.7,
    opacity: 1
  },
  {
    id: 'video-3',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769402473/TIKTOK_REBEL_SHOVE_ROLLERSKATE_A_rtdedr.mp4',
    x: 265,
    y: 39,
    width: 150,
    height: 225,
    scale: 0.5,
    opacity: 0.4
  },
  {
    id: 'video-4',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769402473/TIKTOK_JOSHUA_ICE_CREAM_C2_r5wt7h.mp4',
    x: 137,
    y: 378,
    width: 80,
    height: 120,
    scale: 1,
    opacity: 0.6
  },
  {
    id: 'video-5',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769402473/TIKTOK_BRIAN_AVOCADO_BALLOON_C_ucxcq8.mp4',
    x: 298,
    y: 298,
    width: 60,
    height: 90,
    scale: 1.65,
    opacity: 1
  },
  {
    id: 'video-6',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769402473/TIKTOK_FAMILY_COOKING_J_fdewqd.mp4',
    x: 457,
    y: 557,
    width: 150,
    height: 225,
    scale: 0.8,
    opacity: 0.7
  },
  {
    id: 'video-7',
    src: 'https://res.cloudinary.com/dkjokhb4w/video/upload/v1769401959/TIKTOK_BRAZIL_TOURISTS_2_ze2vye.mp4',
    x: 309,
    y: 451,
    width: 120,
    height: 180,
    scale: 0.5,
    opacity: 0.3
  }
];

const App: React.FC = () => {
  const [videoLayout, setVideoLayout] = React.useState<CanvasVideoItem[]>(initialVideos);


  return (
    <div className="w-full flex flex-col items-center gap-4">
      <style>
        {`@keyframes uiEnter{0%{opacity:0;transform:translateY(18px);}100%{opacity:1;transform:translateY(0);}}.ui-enter{opacity:0;transform:translateY(18px);animation:uiEnter 0.6s ease-out both;}`}
      </style>
      <div className="relative flex flex-col bg-black overflow-hidden shadow-2xl mx-auto w-[100vw] max-w-[420px] h-full h-[100vh]">
        <CanvasVideos items={videoLayout} />
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        <Logo className="ui-enter" style={{ animationDelay: '0.24s' }} />
        <div className="mt-auto w-full h-[100vh] pb-[24px] flex flex-col items-center justify-end relative z-10">
          <TitleBlock className="ui-enter" style={{ animationDelay: '0.12s' }} />
          <Footer className="ui-enter" style={{ animationDelay: '0s' }} />
        </div>
      </div>
    </div>
  );
};

export default App;
