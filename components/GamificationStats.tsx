import { UserStats } from '@/lib/types'
import Card from './Card'
import ProgressBar from './ProgressBar'
import { Medal, Flame, Target as TargetIcon } from 'lucide-react'

interface GamificationStatsProps {
  stats: UserStats
}

export default function GamificationStats({ stats }: GamificationStatsProps) {
  const badges = [
    { id: '1', name: 'Primeira Semana', unlocked: stats.global_streak >= 7, icon: Medal },
    { id: '2', name: 'Meta Cumprida', unlocked: false, icon: TargetIcon },
    { id: '3', name: 'Controle Ativo', unlocked: false, icon: Flame },
  ]

  return (
    <Card title="Gamificação">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Progresso de Nível</h4>
          <ProgressBar
            current={stats.total_xp % 250}
            target={250}
            showPercentage={false}
          />
          <p className="text-xs text-gray-600 mt-1">
            {stats.xp_to_next_level} XP para o próximo nível
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Streak Global</h4>
          <div className="flex items-center space-x-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.global_streak}</span>
            <span className="text-sm text-gray-600">dias</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Badges</h4>
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`p-2 rounded-lg border-2 text-center ${
                    badge.unlocked
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-300 opacity-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs text-gray-700">{badge.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
