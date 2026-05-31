'use client';

import { GameStats } from '@/lib/types';
import { formatTime } from '@/hooks/useTimer';
import { Button } from '@/components/ui/button';
import { ACHIEVEMENTS } from '@/lib/constants';
import { Trash2 } from 'lucide-react';

interface StatsDashboardProps {
  stats: GameStats;
  onClearStats: () => void;
}

export function StatsDashboard({ stats, onClearStats }: StatsDashboardProps) {
  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-1">Statistics</h2>
        <p className="text-slate-400">Your game performance and achievements</p>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-2">Games Played</p>
          <p className="text-3xl font-bold text-white">{stats.gamesPlayed}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-2">Games Won</p>
          <p className="text-3xl font-bold text-blue-400">{stats.gamesWon}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-2">Win Rate</p>
          <p className="text-3xl font-bold text-purple-400">{winPercentage}%</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs text-slate-400 mb-2">Current Streak</p>
          <p className="text-3xl font-bold text-green-400">{stats.currentStreak}</p>
        </div>
        <div className="bg-slate-700/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 col-span-2">
          <p className="text-xs text-slate-400 mb-2">Fastest Time</p>
          <p className="text-3xl font-bold text-white">
            {stats.fastestTime ? formatTime(stats.fastestTime) : '—'}
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Achievements ({stats.achievements.length}/{ACHIEVEMENTS.length})
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = stats.achievements.some(
              (a) => a.id === achievement.id
            );
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30'
                    : 'bg-slate-700/20 border-white/10 opacity-50'
                }`}
              >
                <p className="text-2xl mb-2">{achievement.icon}</p>
                <h4 className="font-semibold text-white text-sm mb-1">
                  {achievement.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clear Stats Button */}
      <div className="pt-4 border-t border-white/10">
        <Button
          onClick={onClearStats}
          variant="destructive"
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All Statistics
        </Button>
      </div>
    </div>
  );
}
