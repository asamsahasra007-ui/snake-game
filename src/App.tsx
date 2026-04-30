/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Trophy, Activity, Terminal } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-magenta/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Header */}
      <header className="mb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/50 border border-white/5 rounded-full mb-4"
        >
          <Activity className="w-3 h-3 text-neon-lime" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">System Status: Optimal</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter neon-glow-cyan mb-2 italic">
          NEON <span className="text-neon-magenta">PULSE</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap border-r-2 border-neon-cyan animate-pulse">
          Digital Predator Simulation v2.04
        </p>
      </header>

      {/* Main Game Interface */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_400px_1fr] gap-8 items-start max-w-7xl w-full relative z-10">
        
        {/* Left Side: Stats and Info */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5 text-neon-yellow" />
              <h2 className="font-display font-medium text-lg italic">Leaderboard</h2>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center text-neon-cyan pb-2 border-b border-white/5">
                <span>01. PLAYER_X</span>
                <span>{highScore.toString().padStart(5, '0')}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>02. BOT_SYNTH</span>
                <span>02450</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>03. NEON_DRIFT</span>
                <span>01820</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-neon-cyan" />
              <h2 className="font-display font-medium text-lg italic">Controls</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-mono uppercase text-zinc-500">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-300">ARROWS</span>
                <span>MOVEMENT</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-300">R KEY</span>
                <span>RESTART</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-300">SPACE</span>
                <span>PLAY/PAUSE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Game Canvas */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-between w-full p-4 bg-zinc-950/80 border-x border-t border-white/10 rounded-t-2xl">
             <div className="flex flex-col">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Current Score</span>
               <span className="text-2xl font-display font-bold text-neon-cyan italic">{score.toString().padStart(4, '0')}</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">High Score</span>
               <span className="text-2xl font-display font-bold text-neon-magenta italic">{highScore.toString().padStart(4, '0')}</span>
             </div>
          </div>
          
          <div className="w-full aspect-square">
            <SnakeGame onScoreUpdate={handleScoreUpdate} isPaused={isPaused} />
          </div>
          
          <div className="w-full p-4 bg-zinc-950/80 border-x border-b border-white/10 rounded-b-2xl font-mono text-[10px] flex justify-between uppercase text-zinc-500">
            <span>GRID_SIZE: 20x20</span>
            <span className="animate-pulse">SENSORS_ACTIVE</span>
          </div>
        </div>

        {/* Right Side: Music Player */}
        <div className="flex flex-col gap-6">
          <MusicPlayer />
          
          {/* Mobile/Small Screen Stats (shown only when hidden on LG) */}
          <div className="lg:hidden bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <h2 className="font-display font-medium text-lg italic mb-4">Controls</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-mono uppercase text-zinc-500">
              <span className="text-zinc-300">ARROWS: MOVE</span>
              <span className="text-zinc-300">R: RESTART</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer / Meta Data */}
      <footer className="mt-12 text-zinc-700 font-mono text-[9px] uppercase tracking-widest flex gap-8">
        <span>© 2026 AI-GEN DIGITAL SYSTEMS</span>
        <span>LATENCY: 0.02ms</span>
        <span>ENCRYPTED_SIGNAL_V4</span>
      </footer>
    </div>
  );
}
