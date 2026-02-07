'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateFeedbackMutation } from '../api/useCreateFeedbackMutation'
import { initialFeedbackForm } from '../model/initData'
import { validationCreateFeedbackForm } from '../model/validation'
import { CreateFeedbackErrors } from '../model/types'
import { NameField } from './NameField'
import { EmailFiled } from './EmailFiled'
import { MessageField } from './MessageField'
import { SubmitButton } from './SubmitButton'
import { getErrorMessage } from '@/shared/lib/errors'

export const CreateFeedbackForm = () => {
  const [sendFeedback, { isLoading, isSuccess, data, isError, error }] =
    useCreateFeedbackMutation()

  const [dataForm, setDataForm] = useState(initialFeedbackForm)
  const [errorsValidation, setErrorsValidation] =
    useState<CreateFeedbackErrors>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target
    setDataForm({
      ...dataForm,
      [fieldName]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrorsValidation({})

    const newErrorsValidation = validationCreateFeedbackForm(dataForm)

    if (Object.keys(newErrorsValidation).length > 0) {
      setErrorsValidation(newErrorsValidation)
      return
    }

    const result = await sendFeedback(dataForm)

    if (result.data) setDataForm(initialFeedbackForm)
  }

  return (
    <div className="w-full max-w-xl">
      <form
        className="flex flex-col justify-start gap-4 w-full p-3 border"
        onSubmit={handleSubmit}
      >
        <NameField
          value={dataForm.name}
          handleChange={handleChange}
          isLoading={isLoading}
          errorMessage={errorsValidation.name}
        />

        <EmailFiled
          value={dataForm.email}
          handleChange={handleChange}
          isLoading={isLoading}
          errorMessage={errorsValidation.email}
        />

        <MessageField
          value={dataForm.message}
          handleChange={handleChange}
          isLoading={isLoading}
          errorMessage={errorsValidation.message}
        />

        <SubmitButton isLoading={isLoading} />
      </form>

      {isSuccess && (
        <p className="text-green-500">
          Feedback создан: {JSON.stringify(data)}
        </p>
      )}

      {isError &&
        getErrorMessage(
          error,
          'При отправки Feedback возникла ошибка!',
        ).toLocaleLowerCase()}
    </div>
  )
}
