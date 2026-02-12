import { Button } from '@/shared/ui/Form/Button'

interface SubmitButtonProps {
  isLoading: boolean
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <Button size="base" type="submit" disabled={isLoading}>
      {!isLoading ? 'Отправить' : 'Отправка'}
    </Button>
  )
}
