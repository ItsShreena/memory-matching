'use client';

import { GameState, Theme } from '@/lib/types';
import { CARD_THEMES } from '@/lib/constants';
import { formatTime } from '@/hooks/useTimer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RotateCcw, RotateCw } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
  elapsedSeconds: number;
  onRestart: () => void;
  onNewGame: () => void;
  onThemeChange: (theme: Theme) => void;
}

export function GameStats({
  gameState,
  elapsedSeconds,
  onRestart,
  onNewGame,
  onThemeChange,
}: GameStatsProps) {
  const themeNames = Object.entries(CARD_THEMES).map(([key, value]) => ({
    value: key as Theme,
    label: value.name,
  }));

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Moves</p>
          <p className="text-2xl font-bold text-white">{gameState.moves}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Time</p>
          <p className="text-2xl font-bold text-white">{formatTime(elapsedSeconds)}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-1">Score</p>
          <p className="text-2xl font-bold text-white">
            {Math.max(0, 1000 - gameState.moves * 5 - elapsedSeconds)}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button
          onClick={onRestart}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
        <Button
          onClick={onNewGame}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          New Game
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
              Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {themeNames.map((theme) => (
              <DropdownMenuItem
                key={theme.value}
                onClick={() => onThemeChange(theme.value)}
                className={gameState.theme === theme.value ? 'bg-slate-700' : ''}
              >
                {theme.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
