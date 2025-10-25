'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import { Target, Plus, BookOpen, GraduationCap, Star } from 'lucide-react'

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([])

  const goalPresets = [
    {
      type: 'livro',
      title: 'Livro',
      description: 'Leia um livro completo',
      icon: BookOpen,
      metric: 'páginas',
      target: 300,
    },
    {
      type: 'curso',
      title: 'Curso',
      description: 'Complete um curso online',
      icon: GraduationCap,
      metric: 'aulas',
      target: 15,
    },
    {
      type: 'personalizada',
      title: 'Personalizada',
      description: 'Crie sua própria meta',
      icon: Star,
      metric: 'unidades',
      target: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metas</h1>
          <p className="text-gray-600 mt-1">Acompanhe seu progresso em objetivos quantificáveis</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nova Meta</span>
        </button>
      </div>

      {goals.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Target className="w-20 h-20 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma meta cadastrada</h3>
            <p className="text-gray-600 mb-6">
              Comece escolhendo um modelo de meta ou crie uma personalizada
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {goalPresets.map((preset) => {
                const Icon = preset.icon
                return (
                  <div
                    key={preset.type}
                    className="p-6 border border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{preset.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{preset.description}</p>
                    <p className="text-xs text-gray-500">
                      Métrica: {preset.metric} | Alvo: {preset.target}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <button className="btn btn-primary">Criar Primeira Meta</button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.type}</p>
                </div>
                <span className="badge badge-success">{goal.status}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {goal.current_value} / {goal.target_value} {goal.metric_label}
                </p>
                <ProgressBar
                  current={goal.current_value}
                  target={goal.target_value}
                  showPercentage={true}
                />
              </div>

              <div className="flex space-x-2">
                <button className="btn btn-sm btn-primary flex-1">Check-in</button>
                <button className="btn btn-sm btn-secondary">Detalhes</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
