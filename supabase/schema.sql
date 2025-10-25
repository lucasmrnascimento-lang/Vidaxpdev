-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'planejado' CHECK (status IN ('planejado', 'feito', 'faltou')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('livro', 'curso', 'personalizada')),
  title TEXT NOT NULL,
  metric_label TEXT NOT NULL,
  target_value NUMERIC NOT NULL CHECK (target_value > 0),
  current_value NUMERIC DEFAULT 0 CHECK (current_value >= 0),
  start_date DATE NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'em_andamento' CHECK (status IN ('em_andamento', 'concluída', 'pausada', 'cancelada')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bom', 'mau')),
  schedule TEXT NOT NULL CHECK (schedule IN ('diário', 'dias_da_semana', 'custom')),
  days_of_week TEXT[] DEFAULT '{}',
  target_per_day NUMERIC DEFAULT 1 CHECK (target_per_day > 0),
  unit_label TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Checkins table
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('event', 'goal', 'habit')),
  source_id UUID NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('feito', 'parcial', 'não_feito')),
  quantity NUMERIC CHECK (quantity >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- XP Transactions table
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reason TEXT NOT NULL,
  xp_delta INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Streaks table
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL CHECK (scope IN ('global', 'habit', 'goal')),
  scope_id UUID,
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_check_date DATE,
  UNIQUE(user_id, scope, scope_id)
);

-- Presets table
CREATE TABLE presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kind TEXT NOT NULL CHECK (kind IN ('goal', 'habit')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metric_label TEXT,
  target_value NUMERIC,
  unit_label TEXT,
  example_tags TEXT[] DEFAULT '{}'
);

-- Create indexes
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habits_active ON habits(active);
CREATE INDEX idx_checkins_user_id ON checkins(user_id);
CREATE INDEX idx_checkins_date ON checkins(date);
CREATE INDEX idx_checkins_source ON checkins(source, source_id);
CREATE INDEX idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX idx_xp_transactions_date ON xp_transactions(date);
CREATE INDEX idx_streaks_user_id ON streaks(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE presets ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view own events" ON events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own events" ON events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own events" ON events FOR DELETE USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can view own goals" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- Habits policies
CREATE POLICY "Users can view own habits" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habits" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habits" ON habits FOR DELETE USING (auth.uid() = user_id);

-- Checkins policies
CREATE POLICY "Users can view own checkins" ON checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkins" ON checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- XP Transactions policies
CREATE POLICY "Users can view own xp_transactions" ON xp_transactions FOR SELECT USING (auth.uid() = user_id);

-- Streaks policies
CREATE POLICY "Users can view own streaks" ON streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON streaks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON streaks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Presets policies (public read-only)
CREATE POLICY "Anyone can view presets" ON presets FOR SELECT USING (true);

-- Insert initial presets
INSERT INTO presets (kind, title, description, metric_label, target_value, unit_label, example_tags) VALUES
-- Goals presets
('goal', 'Livro', 'Complete um livro lendo página por página', 'páginas', 300, 'páginas', ARRAY['estudo', 'leitura']),
('goal', 'Curso', 'Complete um curso online assistindo todas as aulas', 'aulas', 15, 'aulas', ARRAY['estudo', 'curso']),
('goal', 'Treino Mensal', 'Complete seu treino mensal acumulando minutos', 'minutos', 900, 'min', ARRAY['saúde', 'treino']),

-- Habit presets (bons)
('habit', 'Ler 30 min', 'Ler por pelo menos 30 minutos por dia', NULL, NULL, 'min', ARRAY['leitura', 'aprendizado']),
('habit', 'Treinar', 'Pratique exercícios físicos diariamente', NULL, NULL, 'vez(es)', ARRAY['saúde', 'fitness']),
('habit', 'Meditar 10 min', 'Medite por pelo menos 10 minutos por dia', NULL, NULL, 'min', ARRAY['mindfulness', 'bem-estar']),

-- Habit presets (maus)
('habit', 'Evitar Pornografia', 'Passe o dia sem consumir conteúdo pornográfico', NULL, NULL, 'dia sem', ARRAY['controle', 'bem-estar']),
('habit', 'Reduzir Tempo de Tela', 'Limite seu tempo diário de tela', NULL, NULL, 'min máx.', ARRAY['produtividade', 'saúde']);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_habits_updated_at BEFORE UPDATE ON habits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
