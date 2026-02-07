interface SubmitButtonProps {
  isLoading: boolean
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <button
      className="p-3 border border-black cursor-pointer"
      type="submit"
      disabled={isLoading}
    >
      {!isLoading ? 'Отправить' : 'Отправка'}
    </button>
  )
}
