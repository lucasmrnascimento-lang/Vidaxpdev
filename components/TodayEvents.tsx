import { Event } from '@/lib/types'
import Card from './Card'
import { formatTime } from '@/lib/utils'
import { Calendar } from 'lucide-react'

interface TodayEventsProps {
  events: Event[]
}

export default function TodayEvents({ events }: TodayEventsProps) {
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.start_datetime)
    const today = new Date()
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    )
  })

  return (
    <Card title="Hoje">
      {todayEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Nenhum evento para hoje</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}
                </p>
              </div>
              <button className="btn btn-sm btn-primary">Check-in</button>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
