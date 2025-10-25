'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Target, Activity, Trophy, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Metas', href: '/goals', icon: Target },
  { name: 'Hábitos', href: '/habits', icon: Activity },
  { name: 'Gamificação', href: '/gamification', icon: Trophy },
  { name: 'Perfil', href: '/profile', icon: User },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Vida XP</h1>
          </div>
          <div className="flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
