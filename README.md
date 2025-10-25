# Vida XP — Agenda & Metas Gamificadas

MVP de produtividade que une agenda (calendário), metas quantificáveis, rastreador de hábitos (bons e maus) e gamificação (XP, níveis, streaks, badges).

## 🎯 Funcionalidades

- **Agenda/Calendário**: Crie e gerencie eventos com check-ins e quantificação
- **Metas Quantificáveis**: Acompanhe progresso de livros, cursos e metas personalizadas
- **Hábitos**: Monitore hábitos bons e controle hábitos ruins
- **Gamificação**: Sistema completo de XP, níveis, streaks e badges
- **Dashboard**: Visualize seu progresso diário e semanal

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Supabase** - Backend (Database, Auth, RLS)
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Recharts** - Gráficos

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [seu-repositorio]
cd Vidaxpdev
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Configure o banco de dados:
   - Crie um projeto no Supabase
   - Execute o script SQL em `supabase/schema.sql` no SQL Editor do Supabase

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📊 Estrutura do Projeto

```
Vidaxpdev/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página do Dashboard
│   ├── calendar/          # Página de Calendário
│   ├── goals/             # Página de Metas
│   ├── habits/            # Página de Hábitos
│   └── gamification/      # Página de Gamificação
├── components/            # Componentes React
│   ├── Navigation.tsx
│   ├── Card.tsx
│   ├── ProgressBar.tsx
│   ├── TodayEvents.tsx
│   ├── TopGoals.tsx
│   ├── HabitCards.tsx
│   └── GamificationStats.tsx
├── lib/                   # Utilitários e configurações
│   ├── types.ts           # Tipos TypeScript
│   ├── utils.ts           # Funções utilitárias
│   └── supabase.ts        # Cliente Supabase
├── supabase/              # Scripts SQL
│   └── schema.sql         # Schema do banco de dados
└── package.json
```

## 🎮 Sistema de Gamificação

### XP (Pontos de Experiência)
- **Evento feito**: +10 XP
- **Evento parcial**: +5 XP
- **Hábito bom feito**: +8 XP
- **Evitou hábito ruim**: +12 XP
- **Recaída em hábito ruim**: -15 XP
- **Meta 100%**: +100 XP
- **Streak 7 dias**: +30 XP
- **Streak 30 dias**: +150 XP

### Níveis
Nível = floor(XP / 250) + 1

### Streaks
- Streak global: mantido com pelo menos 1 check-in positivo por dia
- Streaks por hábito/meta específicos

### Badges
- **Primeira Semana**: 7 dias de streak global
- **Meta Cumprida**: Primeira meta 100%
- **Controle Ativo**: 7 dias sem recaída em hábito mau

## 📝 Modelos Prontos

### Metas
- **Livro**: 300 páginas
- **Curso**: 15 aulas
- **Treino Mensal**: 900 minutos

### Hábitos Bons
- **Ler 30 min**: Leitura diária
- **Treinar**: Exercícios físicos
- **Meditar 10 min**: Mindfulness

### Hábitos a Evitar
- **Evitar Pornografia**: Controle de conteúdo
- **Reduzir Tempo de Tela**: Limite diário

## 🔒 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Usuários só podem acessar seus próprios dados
- Políticas de segurança configuradas no Supabase

## 🛠️ Desenvolvimento

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linter
npm run lint
```

## 📄 Licença

Este projeto é um MVP de código aberto.

## 👨‍💻 Autor

Desenvolvido com ❤️ para melhorar a produtividade e bem-estar.