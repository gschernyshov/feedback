'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useCreateFeedbackMutation } from '../api/useCreateFeedbackMutation'
import { initialFeedbackForm } from '../model/initData'
import { validationCreateFeedbackForm } from '../model/validation'
import { NameField, EmailFiled, MessageField, SubmitButton } from './Form'
import {
  CreateFeedback,
  CreateFeedbackErrors,
} from '@/entities/feedback/model/types'
import { getErrorMessage } from '@/shared/lib/errors'
import { Toast } from '@/shared/ui/Toast'

export const FeedbackCreateForm = () => {
  const [sendFeedback, { isLoading, isSuccess, data, isError, error }] =
    useCreateFeedbackMutation()

  const [dataForm, setDataForm] = useState<CreateFeedback>(initialFeedbackForm)
  const [errorsValidation, setErrorsValidation] =
    useState<CreateFeedbackErrors>({})

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target
    setDataForm({
      ...dataForm,
      [fieldName]: value.trim(),
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
    <div className="flex flex-col justify-start gap-4 w-full p-3 border">
      <h2 className="text-xl font-bold">Отправьте Feedback</h2>
      <form
        className="flex flex-col justify-start gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <NameField
          value={dataForm.name}
          onChange={handleChange}
          disabled={isLoading}
          errorMessage={errorsValidation.name}
        />

        <EmailFiled
          value={dataForm.email}
          onChange={handleChange}
          disabled={isLoading}
          errorMessage={errorsValidation.email}
        />

        <MessageField
          value={dataForm.message}
          onChange={handleChange}
          disabled={isLoading}
          errorMessage={errorsValidation.message}
        />

        <SubmitButton isLoading={isLoading} />
      </form>

      {isSuccess && (
        <Toast
          isSuccess={true}
          infoText={`Feedback c id: ${data.id} успешно создан!`}
        />
      )}

      {isError && (
        <Toast
          isSuccess={false}
          infoText="При отправке Feedback возникла ошибка"
          errorMessage={getErrorMessage(error)}
        />
      )}
    </div>
  )
}
