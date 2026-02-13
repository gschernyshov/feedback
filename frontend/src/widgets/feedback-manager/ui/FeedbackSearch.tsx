import {
  FindFeedback,
  FindFeedbackError,
} from '@/entities/feedback/model/types'
import { Input } from '@/shared/UI/Form/Input'
import { Button } from '@/shared/UI/Form/Button'

interface FeedbackSearchProps {
  value: FindFeedback
  onChange: (id: FindFeedback) => void
  onSearch: () => void
  isLoading: boolean
  errorMessage: FindFeedbackError
}

export const FeedbackSearch = ({
  value,
  onChange,
  onSearch,
  isLoading,
  errorMessage,
}: FeedbackSearchProps) => {
  return (
    <div className="flex flex-col gap-3 w-full p-3 border">
      <h3 className="text-md font-bold">Найти Feedback по id</h3>
      <div className="flex gap-3">
        <Input
          size="base"
          type="text"
          name="id"
          disabled={isLoading}
          placeholder="Id"
          value={value}
          onChange={e => onChange(e.target.value.trim())}
          errorMessage={errorMessage}
        />
        <Button size="sm" type="button" disabled={isLoading} onClick={onSearch}>
          {isLoading ? 'Поиск...' : 'Найти'}
        </Button>
      </div>
    </div>
  )
}
