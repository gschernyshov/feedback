import { ChangeEvent } from 'react'
import { Textarea } from '@/shared/UI/Form/Textarea'

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
      size="base"
      name="message"
      disabled={disabled}
      placeholder="Сообщение"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  )
}
