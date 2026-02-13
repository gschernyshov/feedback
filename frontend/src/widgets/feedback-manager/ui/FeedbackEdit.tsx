import { ChangeEvent } from 'react'
import { NameField } from './Fields/NameField'
import { MessageField } from './Fields/MessageField'
import {
  type UpdateFeedback,
  type UpdateFeedbackErrors,
} from '@/entities/feedback/model'
import { Button } from '@/shared/UI/Form/Button'

interface FeedbackInfoProps {
  changes: UpdateFeedback
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void
  onSave: () => void
  isUpdating: boolean
  errorsMessages: UpdateFeedbackErrors
  onCloseEdit: () => void
}

export const FeedbackEdit = ({
  changes,
  onChange,
  onSave,
  isUpdating,
  errorsMessages,
  onCloseEdit,
}: FeedbackInfoProps) => {
  return (
    <div className="flex flex-col gap-2 w-full p-3 border-dotted border-1">
      <p className="text-md font-bold">Редактирование Feedback</p>

      <NameField
        value={changes.name}
        onChange={onChange}
        disabled={isUpdating}
        errorMessage={errorsMessages.name}
      />

      <MessageField
        value={changes.message}
        onChange={onChange}
        disabled={isUpdating}
        errorMessage={errorsMessages.message}
      />

      <div className="flex gap-2">
        <Button size="sm" type="button" disabled={isUpdating} onClick={onSave}>
          {isUpdating ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <Button
          size="sm"
          type="button"
          disabled={isUpdating}
          onClick={onCloseEdit}
        >
          Отмена
        </Button>
      </div>
    </div>
  )
}
