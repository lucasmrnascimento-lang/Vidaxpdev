export type EventStatus = 'planejado' | 'feito' | 'faltou'
export type GoalType = 'livro' | 'curso' | 'personalizada'
export type GoalStatus = 'em_andamento' | 'concluída' | 'pausada' | 'cancelada'
export type HabitType = 'bom' | 'mau'
export type HabitSchedule = 'diário' | 'dias_da_semana' | 'custom'
export type CheckinSource = 'event' | 'goal' | 'habit'
export type CheckinOutcome = 'feito' | 'parcial' | 'não_feito'
export type StreakScope = 'global' | 'habit' | 'goal'
export type PresetKind = 'goal' | 'habit'

export interface User {
  id: string
  name: string
  email: string
  timezone: string
  created_at: string
}

export interface Event {
  id: string
  user_id: string
  title: string
  description: string | null
  start_datetime: string
  end_datetime: string
  all_day: boolean
  tags: string[]
  status: EventStatus
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  type: GoalType
  title: string
  metric_label: string
  target_value: number
  current_value: number
  start_date: string
  due_date: string | null
  status: GoalStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  type: HabitType
  schedule: HabitSchedule
  days_of_week: string[]
  target_per_day: number
  unit_label: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Checkin {
  id: string
  user_id: string
  date: string
  source: CheckinSource
  source_id: string
  outcome: CheckinOutcome
  quantity: number | null
  notes: string | null
  created_at: string
}

export interface XpTransaction {
  id: string
  user_id: string
  date: string
  reason: string
  xp_delta: number
  metadata: Record<string, any>
  created_at: string
}

export interface Streak {
  id: string
  user_id: string
  scope: StreakScope
  scope_id: string | null
  current_streak: number
  longest_streak: number
  last_check_date: string | null
}

export interface Preset {
  id: string
  kind: PresetKind
  title: string
  description: string
  metric_label: string | null
  target_value: number | null
  unit_label: string | null
  example_tags: string[]
}

export interface UserStats {
  total_xp: number
  current_level: number
  xp_to_next_level: number
  global_streak: number
  longest_streak: number
}
