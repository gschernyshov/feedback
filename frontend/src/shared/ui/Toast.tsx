interface ToastProps {
  isSuccess: boolean
  infoText: string
  errorMessage?: string
}

export const Toast = ({ isSuccess, infoText, errorMessage }: ToastProps) => {
  return (
    <div
      className={`fixed bottom-10 right-10 px-3 py-1 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <span className="text-white">
        {isSuccess ? infoText : infoText + ': ' + errorMessage + '.'}
      </span>
    </div>
  )
}
