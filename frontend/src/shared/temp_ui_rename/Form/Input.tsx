import { ChangeEvent } from 'react'

interface InputProps {
  size: 'sm' | 'base'
  type: 'text' | 'email'
  name: string
  disabled: boolean
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  errorMessage: undefined | string
}

export const Input = ({
  size,
  type,
  name,
  disabled,
  placeholder,
  value,
  onChange,
  errorMessage,
}: InputProps) => {
  return (
    <div className="relative w-full">
      {errorMessage && (
        <span className="absolute -top-3 right-2 p-1 bg-white border border-red-500 rounded-xs text-xs text-red-500">
          {errorMessage}
        </span>
      )}

      <input
        required
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${size === 'sm' ? 'p-1' : size === 'base' ? 'px-2 py-3' : ''} border cursor-pointer`}
      />
    </div>
  )
}
