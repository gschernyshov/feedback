import { ChangeEvent } from 'react'

interface EmailFiledProps {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  errorMessage: undefined | string
}

export const EmailFiled = ({
  value,
  handleChange,
  isLoading,
  errorMessage,
}: EmailFiledProps) => {
  return (
    <div className="relative">
      {errorMessage && (
        <span className="absolute -top-3 right-2 p-1 bg-white border border-red-500 rounded-xs text-xs text-red-500">
          {errorMessage}
        </span>
      )}

      <input
        required
        className="w-full px-2 py-3 border cursor-pointer"
        type="email"
        name="email"
        placeholder="Email"
        value={value}
        disabled={isLoading}
        onChange={handleChange}
      />
    </div>
  )
}
