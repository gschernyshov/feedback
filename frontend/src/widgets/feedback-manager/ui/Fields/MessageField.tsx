import { ChangeEvent } from 'react'
import { Textarea } from '@/shared/ui/Form/Textarea'

interface MessageFieldProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  disabled: boolean
  errorMessage: undefined | string
}

export const MessageField = ({
  value,
  onChange,
  disabled,
  errorMessage,
}: MessageFieldProps) => {
  return (
    <Textarea
      size="sm"
      name="message"
      disabled={disabled}
      placeholder="Имя"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  )
}
