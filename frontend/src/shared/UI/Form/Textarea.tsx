import { ChangeEvent } from 'react'

interface TextareaProps {
  size: 'sm' | 'base'
  name: string
  disabled: boolean
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  errorMessage: undefined | string
}

export const Textarea = ({
  size,
  name,
  disabled,
  placeholder,
  value,
  onChange,
  errorMessage,
}: TextareaProps) => {
  return (
    <div className="relative">
      {errorMessage && (
        <span className="absolute -top-3 right-2 p-1 bg-white border border-red-500 rounded-xs text-xs text-red-500">
          {errorMessage}
        </span>
      )}

      <textarea
        required
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full ${size === 'sm' ? 'p-1' : size === 'base' ? 'px-2 py-3' : ''} border cursor-pointer`}
      />
    </div>
  )
}
