import { Habit } from '@/lib/types'
import Card from './Card'
import { Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HabitCardsProps {
  habits: Habit[]
}

export default function HabitCards({ habits }: HabitCardsProps) {
  const goodHabits = habits.filter(h => h.type === 'bom')
  const badHabits = habits.filter(h => h.type === 'mau')

  return (
    <Card title="Hábitos do Dia">
      {habits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Nenhum hábito cadastrado</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goodHabits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Bons Hábitos</h4>
              <div className="space-y-2">
                {goodHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-900">{habit.name}</span>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-success">Cumpri</button>
                      <button className="btn btn-sm btn-secondary">Parcial</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {badHabits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Hábitos a Evitar</h4>
              <div className="space-y-2">
                {badHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-900">{habit.name}</span>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-success">Sem recaída</button>
                      <button className="btn btn-sm btn-danger">Tive recaída</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
