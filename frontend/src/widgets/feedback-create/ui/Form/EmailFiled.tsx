import { ChangeEvent } from 'react'
import { Input } from '@/shared/UI/Form/Input'

interface EmailFiledProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  errorMessage: undefined | string
}

export const EmailFiled = ({
  value,
  onChange,
  disabled,
  errorMessage,
}: EmailFiledProps) => {
  return (
    <Input
      size="base"
      type="email"
      name="email"
      disabled={disabled}
      placeholder="Email"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  )
}
