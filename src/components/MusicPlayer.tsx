import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: 'Cyberpulse Echoes',
    artist: 'AI Synth Engine',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '6:12',
    color: '#00f3ff'
  },
  {
    id: 2,
    title: 'Neon Rain Drift',
    artist: 'Digital Rain AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '7:05',
    color: '#ff00ff'
  },
  {
    id: 3,
    title: 'Synthwave Horizon',
    artist: 'RetroFuture Bot',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:48',
    color: '#00ff00'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrackIndex]);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 neon-border-cyan shadow-xl">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/5 relative overflow-hidden"
          style={{ borderColor: currentTrack.color }}
        >
          <Music2 className="w-8 h-8 opacity-50" style={{ color: currentTrack.color }} />
          {isPlaying && (
            <motion.div 
              className="absolute inset-x-0 bottom-0 flex justify-center gap-0.5 h-full items-end pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  className="w-1 bg-white"
                  animate={{ height: [10, 30, 15, 40, 20] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  style={{ backgroundColor: currentTrack.color }}
                />
              ))}
            </motion.div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-display font-medium truncate tracking-tight">{currentTrack.title}</h3>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: currentTrack.color, width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button onClick={handlePrev} className="p-2 text-zinc-400 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="fill-current w-6 h-6" /> : <Play className="fill-current translate-x-0.5 w-6 h-6" />}
          </button>

          <button onClick={handleNext} className="p-2 text-zinc-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            <span>AUTO-SYNCED</span>
          </div>
          <span>BPM: 128 | MOD: AI-GEN</span>
        </div>
      </div>
    </div>
  );
}
