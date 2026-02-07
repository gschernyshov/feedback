import { ChangeEvent } from 'react'

interface NameFieldProps {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  errorMessage: undefined | string
}

export const NameField = ({
  value,
  handleChange,
  isLoading,
  errorMessage,
}: NameFieldProps) => {
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
        name="name"
        placeholder="Имя"
        value={value}
        disabled={isLoading}
        onChange={handleChange}
      />
    </div>
  )
}
