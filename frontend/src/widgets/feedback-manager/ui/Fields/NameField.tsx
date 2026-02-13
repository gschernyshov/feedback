import { ChangeEvent } from 'react'
import { Input } from '@/shared/UI/Form/Input'

interface NameFieldProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  errorMessage: undefined | string
}

export const NameField = ({
  value,
  onChange,
  disabled,
  errorMessage,
}: NameFieldProps) => {
  return (
    <Input
      size="sm"
      type="text"
      name="name"
      disabled={disabled}
      placeholder="Имя"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  )
}
