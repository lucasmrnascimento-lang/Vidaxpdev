'use client'

import { useState, useEffect } from 'react'
import { Calendar, Target, Activity, Trophy, TrendingUp } from 'lucide-react'
import { Event, Goal, Habit, UserStats } from '@/lib/types'
import { calculateLevel, xpToNextLevel } from '@/lib/utils'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import TodayEvents from '@/components/TodayEvents'
import TopGoals from '@/components/TopGoals'
import HabitCards from '@/components/HabitCards'
import GamificationStats from '@/components/GamificationStats'

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats>({
    total_xp: 0,
    current_level: 1,
    xp_to_next_level: 250,
    global_streak: 0,
    longest_streak: 0,
  })

  // Mock data - substituir por dados reais do Supabase
  const mockEvents: Event[] = []
  const mockGoals: Goal[] = []
  const mockHabits: Habit[] = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">Adicionar Evento</button>
          <button className="btn btn-secondary">Nova Meta</button>
          <button className="btn btn-secondary">Novo Hábito</button>
        </div>
      </div>

      {/* Stats Cards */}
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
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-3xl font-bold text-primary-600">{stats.global_streak} dias</p>
            </div>
            <Activity className="w-12 h-12 text-primary-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">XP para Próximo Nível</p>
              <p className="text-3xl font-bold text-primary-600">{stats.xp_to_next_level}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hoje */}
        <div className="lg:col-span-2">
          <TodayEvents events={mockEvents} />
        </div>

        {/* Gamificação */}
        <div>
          <GamificationStats stats={stats} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metas em Progresso */}
        <TopGoals goals={mockGoals} />

        {/* Hábitos do Dia */}
        <HabitCards habits={mockHabits} />
      </div>
    </div>
  )
}
