import { cn } from '@/lib/utils'

interface ProgressBarProps {
  current: number
  target: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export default function ProgressBar({ 
  current, 
  target, 
  label,
  showPercentage = true,
  className 
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100)
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900">
              {current}/{target} ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
