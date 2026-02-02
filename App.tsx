
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
  const [saveStatus, setSaveStatus] = React.useState('');
  const [savedJson, setSavedJson] = React.useState('');
  const storageKey = 'canvasVideoLayout';

  const updateVideo = (id: string, key: keyof CanvasVideoItem, value: number) => {
    setVideoLayout((prev) =>
      prev.map((video) => (video.id === id ? { ...video, [key]: value } : video))
    );
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(videoLayout));
    setSaveStatus('已保存');
    setTimeout(() => setSaveStatus(''), 1500);
  };

  const handleDownload = () => {
    const data = JSON.stringify(videoLayout, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas-video-layout.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSaveStatus('已下载');
    setTimeout(() => setSaveStatus(''), 1500);
  };

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored) as CanvasVideoItem[];
      if (Array.isArray(parsed)) {
        setVideoLayout(parsed);
      }
    } catch {
      return;
    }
  }, []);

  const handleLoad = () => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      setSaveStatus('没有保存记录');
      setTimeout(() => setSaveStatus(''), 1500);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as CanvasVideoItem[];
      if (Array.isArray(parsed)) {
        setVideoLayout(parsed);
        setSaveStatus('已加载');
        setTimeout(() => setSaveStatus(''), 1500);
      }
    } catch {
      setSaveStatus('读取失败');
      setTimeout(() => setSaveStatus(''), 1500);
    }
  };

  const handleShowSaved = () => {
    const stored = localStorage.getItem(storageKey);
    setSavedJson(stored ?? '');
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <style>
        {`@keyframes uiEnter{0%{opacity:0;transform:translateY(18px);}100%{opacity:1;transform:translateY(0);}}.ui-enter{opacity:0;transform:translateY(18px);animation:uiEnter 0.6s ease-out both;}`}
      </style>
      <div className="relative flex flex-col bg-black overflow-hidden shadow-2xl mx-auto w-full max-w-[420px] h-full h-[100vh]">
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
      <div className="fixed top-6 right-6 w-[280px] max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 backdrop-blur p-3 shadow-2xl">
        <div className="text-white text-sm font-semibold mb-3">Canvas Controls</div>
        <div className="flex items-center gap-2 mb-3">
          <button
            className="flex-1 rounded-lg bg-white/10 text-white text-xs py-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="flex-1 rounded-lg bg-white/10 text-white text-xs py-2"
            onClick={handleLoad}
          >
            Load
          </button>
          <button
            className="flex-1 rounded-lg bg-white/10 text-white text-xs py-2"
            onClick={handleShowSaved}
          >
            Show
          </button>
          <button
            className="flex-1 rounded-lg bg-white/10 text-white text-xs py-2"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        {savedJson ? (
          <textarea
            className="w-full mb-3 rounded-lg bg-black/40 border border-white/10 p-2 text-white text-[10px]"
            rows={6}
            readOnly
            value={savedJson}
          />
        ) : null}
        {saveStatus ? (
          <div className="text-white/70 text-[10px] mb-3">{saveStatus}</div>
        ) : null}
        <div className="flex flex-col gap-3">
          {videoLayout.map((video, index) => (
            <div key={video.id} className="rounded-xl border border-white/10 p-3">
              <div className="text-white text-xs font-semibold mb-2">Video {index + 1}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-white/60 text-[10px] mb-1">X</div>
                  <input
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                    type="number"
                    value={video.x}
                    onChange={(e) => updateVideo(video.id, 'x', Number(e.target.value))}
                  />
                  <input
                    className="w-full mt-1"
                    type="range"
                    min="-200"
                    max="900"
                    step="1"
                    value={video.x}
                    onChange={(e) => updateVideo(video.id, 'x', Number(e.target.value))}
                  />
                </div>
                <div>
                  <div className="text-white/60 text-[10px] mb-1">Y</div>
                  <input
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                    type="number"
                    value={video.y}
                    onChange={(e) => updateVideo(video.id, 'y', Number(e.target.value))}
                  />
                  <input
                    className="w-full mt-1"
                    type="range"
                    min="-200"
                    max="900"
                    step="1"
                    value={video.y}
                    onChange={(e) => updateVideo(video.id, 'y', Number(e.target.value))}
                  />
                </div>
                  <div>
                    <div className="text-white/60 text-[10px] mb-1">Scale</div>
                    <input
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                      type="number"
                      step="0.05"
                      value={video.scale}
                      onChange={(e) => updateVideo(video.id, 'scale', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <div className="text-white/60 text-[10px] mb-1">Scale</div>
                    <input
                      className="w-full"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.05"
                      value={video.scale}
                      onChange={(e) => updateVideo(video.id, 'scale', Number(e.target.value))}
                    />
                  </div>
                <div className="col-span-2">
                  <div className="text-white/60 text-[10px] mb-1">Opacity</div>
                  <input
                    className="w-full"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={video.opacity}
                    onChange={(e) => updateVideo(video.id, 'opacity', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
