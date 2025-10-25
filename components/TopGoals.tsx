import { Goal } from '@/lib/types'
import Card from './Card'
import ProgressBar from './ProgressBar'
import { getProgressPercentage } from '@/lib/utils'
import { Target } from 'lucide-react'

interface TopGoalsProps {
  goals: Goal[]
}

export default function TopGoals({ goals }: TopGoalsProps) {
  const activeGoals = goals
    .filter(g => g.status === 'em_andamento')
    .sort((a, b) => getProgressPercentage(b.current_value, b.target_value) - getProgressPercentage(a.current_value, a.target_value))
    .slice(0, 3)

  return (
    <Card title="Top Metas">
      {activeGoals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Nenhuma meta ativa</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGoals.map((goal) => (
            <div key={goal.id}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{goal.title}</span>
                <span className="text-sm text-gray-600">
                  {goal.current_value} {goal.metric_label}
                </span>
              </div>
              <ProgressBar
                current={goal.current_value}
                target={goal.target_value}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
