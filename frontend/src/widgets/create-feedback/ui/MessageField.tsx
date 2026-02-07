import { ChangeEvent } from 'react'

interface MessageFieldProps {
  value: string
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
  errorMessage: undefined | string
}

export const MessageField = ({
  value,
  handleChange,
  isLoading,
  errorMessage,
}: MessageFieldProps) => {
  return (
    <div className="relative">
      {errorMessage && (
        <span className="absolute -top-3 right-2 p-1 bg-white border border-red-500 rounded-xs text-xs text-red-500">
          {errorMessage}
        </span>
      )}

      <textarea
        required
        className="block w-full p-3 border cursor-pointer"
        name="message"
        placeholder="Сообщение"
        value={value}
        disabled={isLoading}
        onChange={handleChange}
      />
    </div>
  )
}
