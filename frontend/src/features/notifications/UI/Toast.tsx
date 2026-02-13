import { NotificationType } from '../model/types'

interface ToastProps {
  type: NotificationType
  message: string
  errorMessage?: string
  onClick: () => void
}

export const Toast = ({ type, message, errorMessage, onClick }: ToastProps) => {
  return (
    <div
      className={`flex gap-3 items-center px-2 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <span className="text-white">
        {type === 'success' ? message : message + ': ' + errorMessage + '.'}
      </span>
      <span onClick={onClick} className="text-white text-2xl cursor-pointer">
        ×
      </span>
    </div>
  )
}
