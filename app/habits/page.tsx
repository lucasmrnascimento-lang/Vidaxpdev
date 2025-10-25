'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { Activity, Plus, CheckCircle, XCircle } from 'lucide-react'

export default function HabitsPage() {
  const [habits, setHabits] = useState<any[]>([])

  const habitPresets = [
    {
      name: 'Ler 30 min',
      type: 'bom',
      description: 'Ler por pelo menos 30 minutos',
      target: 30,
      unit: 'min',
    },
    {
      name: 'Treinar',
      type: 'bom',
      description: 'Pratique exercícios físicos',
      target: 1,
      unit: 'vez',
    },
    {
      name: 'Meditar 10 min',
      type: 'bom',
      description: 'Medite por 10 minutos',
      target: 10,
      unit: 'min',
    },
    {
      name: 'Evitar Pornografia',
      type: 'mau',
      description: 'Passe o dia sem consumir conteúdo pornográfico',
      target: 1,
      unit: 'dia',
    },
    {
      name: 'Reduzir Tempo de Tela',
      type: 'mau',
      description: 'Limite seu tempo de tela',
      target: 120,
      unit: 'min',
    },
  ]

  const goodHabits = habits.filter(h => h.type === 'bom')
  const badHabits = habits.filter(h => h.type === 'mau')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hábitos</h1>
          <p className="text-gray-600 mt-1">Monitore seus hábitos diários</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Novo Hábito</span>
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="space-y-6">
          {/* Bons Hábitos */}
          <Card title="Bons Hábitos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habitPresets.filter(h => h.type === 'bom').map((preset, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-green-200 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-gray-900">{preset.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                  <p className="text-xs text-gray-500">
                    Meta: {preset.target} {preset.unit}/dia
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Hábitos a Evitar */}
          <Card title="Hábitos a Evitar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habitPresets.filter(h => h.type === 'mau').map((preset, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-red-200 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium text-gray-900">{preset.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                  <p className="text-xs text-gray-500">
                    Objetivo: {preset.target} {preset.unit}/dia
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center">
            <button className="btn btn-primary">Começar a Rastrear Hábitos</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Bons Hábitos */}
          {goodHabits.length > 0 && (
            <Card title="Bons Hábitos">
              <div className="space-y-3">
                {goodHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{habit.name}</h4>
                      <p className="text-sm text-gray-600">
                        Meta: {habit.target_per_day} {habit.unit_label}/dia
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-success">Cumpri</button>
                      <button className="btn btn-sm btn-secondary">Parcial</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Hábitos a Evitar */}
          {badHabits.length > 0 && (
            <Card title="Hábitos a Evitar">
              <div className="space-y-3">
                {badHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{habit.name}</h4>
                      <p className="text-sm text-gray-600">
                        Mantenha o controle diário
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-success">Sem recaída</button>
                      <button className="btn btn-sm btn-danger">Tive recaída</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
