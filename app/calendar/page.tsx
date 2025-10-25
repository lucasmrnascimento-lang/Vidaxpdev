'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { Calendar, Plus } from 'lucide-react'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
          <p className="text-gray-600 mt-1">Gerencie seus eventos e compromissos</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Adicionar Evento</span>
        </button>
      </div>

      <Card>
        <div className="text-center py-12">
          <Calendar className="w-20 h-20 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Visualização do Calendário</h3>
          <p className="text-gray-600 mb-6">
            Em breve, você poderá visualizar seus eventos em diferentes formatos (Anual, Mensal, Semanal e Diário).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Visualização Anual</h4>
              <p className="text-sm text-gray-600">Visão geral do ano inteiro com todos os eventos</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Visualização Mensal</h4>
              <p className="text-sm text-gray-600">Visualize seu mês com detalhes de cada dia</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Visualização Semanal</h4>
              <p className="text-sm text-gray-600">Foque na semana atual com mais detalhes</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="btn btn-primary">Criar Primeiro Evento</button>
          </div>
        </div>
      </Card>
    </div>
  )
}
