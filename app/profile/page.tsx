'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { User, Settings, Bell } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Usuário',
    email: 'usuario@example.com',
    timezone: 'America/Sao_Paulo',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
          <p className="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="lg:col-span-2">
          <Card title="Informações Pessoais">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={user.name}
                  className="input"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="input"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  O email não pode ser alterado
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuso Horário
                </label>
                <select
                  value={user.timezone}
                  className="input"
                  onChange={(e) => setUser({ ...user, timezone: e.target.value })}
                >
                  <option value="America/Sao_Paulo">Brasil (America/Sao_Paulo)</option>
                  <option value="America/New_York">EUA - Nova Iorque</option>
                  <option value="America/Los_Angeles">EUA - Los Angeles</option>
                  <option value="Europe/London">Reino Unido</option>
                  <option value="Asia/Tokyo">Japão</option>
                </select>
              </div>

              <div className="pt-4">
                <button className="btn btn-primary">Salvar Alterações</button>
              </div>
            </div>
          </Card>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <Card title="Preferências">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notificações</p>
                    <p className="text-xs text-gray-600">Receber lembretes</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tema</p>
                    <p className="text-xs text-gray-600">Modo claro/escuro</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
