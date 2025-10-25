'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import { Trophy, Medal, Flame, TrendingUp } from 'lucide-react'

export default function GamificationPage() {
  const [stats, setStats] = useState({
    total_xp: 0,
    current_level: 1,
    xp_to_next_level: 250,
    global_streak: 0,
    longest_streak: 0,
  })

  const badges = [
    {
      id: '1',
      name: 'Primeira Semana',
      description: '7 dias de streak global',
      icon: Medal,
      unlocked: stats.global_streak >= 7,
    },
    {
      id: '2',
      name: 'Meta Cumprida',
      description: 'Complete sua primeira meta',
      icon: Trophy,
      unlocked: false,
    },
    {
      id: '3',
      name: 'Controle Ativo',
      description: '7 dias sem recaída',
      icon: Flame,
      unlocked: false,
    },
  ]

  const recentTransactions = [
    // { date: '2024-01-15', reason: 'Evento feito', xp: 10 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gamificação</h1>
          <p className="text-gray-600 mt-1">Acompanhe seu progresso e conquistas</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">XP Total</p>
              <p className="text-3xl font-bold text-primary-600">{stats.total_xp}</p>
            </div>
            <Trophy className="w-12 h-12 text-primary-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nível</p>
              <p className="text-3xl font-bold text-primary-600">{stats.current_level}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-primary-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Streak Atual</p>
              <p className="text-3xl font-bold text-primary-600">{stats.global_streak} dias</p>
            </div>
            <Flame className="w-12 h-12 text-orange-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Melhor Streak</p>
              <p className="text-3xl font-bold text-primary-600">{stats.longest_streak} dias</p>
            </div>
            <Medal className="w-12 h-12 text-yellow-400" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <Card title="Progresso de Nível">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Nível {stats.current_level}</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.total_xp % 250}/250
                </span>
              </div>
              <ProgressBar
                current={stats.total_xp % 250}
                target={250}
                showPercentage={false}
              />
              <p className="text-xs text-gray-600 mt-2">
                {stats.xp_to_next_level} XP para o próximo nível
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Como Ganhar XP</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Evento feito</span>
                  <span className="font-medium text-green-600">+10 XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hábito bom cumprido</span>
                  <span className="font-medium text-green-600">+8 XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Evitou hábito ruim</span>
                  <span className="font-medium text-green-600">+12 XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meta concluída</span>
                  <span className="font-medium text-green-600">+100 XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Streak 7 dias</span>
                  <span className="font-medium text-green-600">+30 XP</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card title="Badges">
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    badge.unlocked
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-300 opacity-50'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      badge.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`}
                  />
                  <p className="text-xs font-medium text-gray-900 mb-1">
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Atividade Recente">
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma transação de XP ainda</p>
            <p className="text-sm mt-2">Comece a completar tarefas para ganhar XP!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{tx.reason}</p>
                  <p className="text-sm text-gray-600">{tx.date}</p>
                </div>
                <span className="font-bold text-green-600">+{tx.xp} XP</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
