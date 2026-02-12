'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useLazyFindOneFeedbackQuery, useUpdateFeedbackMutation } from '../api'
import { validationSearch, validationEdit } from '../model/validation'
import { FeedbackSearch } from './FeedbackSearch'
import { FeedbackView } from './FeedbackView'
import { FeedbackEdit } from './FeedbackEdit'
import {
  FindFeedback,
  FindFeedbackError,
  UpdateFeedback,
  UpdateFeedbackErrors,
} from '@/entities/feedback/model/types'
import { getErrorMessage } from '@/shared/lib/errors'
import { Toast } from '@/shared/ui/Toast'

export const FeedbackManager = () => {
  const [
    trigger,
    {
      isFetching: isSearching,
      isSuccess: isSuccess,
      data: feedback,
      isError: isErrorSearch,
      error: errorSearch,
    },
  ] = useLazyFindOneFeedbackQuery()
  const [
    updateFeedback,
    { isLoading: isUpdating, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateFeedbackMutation()

  const [id, setId] = useState<FindFeedback>('')
  const [searchError, setSearchError] = useState<FindFeedbackError>('')

  const [changes, setChanges] = useState<UpdateFeedback>({
    id: '',
    name: '',
    message: '',
  })
  const [editErrors, setEditErrors] = useState<UpdateFeedbackErrors>({})

  const [isEdit, setIsEdit] = useState(false)
  const openEdit = () => setIsEdit(true)
  const closeEdit = () => setIsEdit(false)

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChanges({
        id: feedback.id,
        name: feedback.name,
        message: feedback.message,
      })
    }
  }, [feedback, isSuccess])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target
    setChanges({
      ...changes,
      [fieldName]: value.trim(),
    })
  }

  const handleSearch = () => {
    setSearchError('')

    const newErrorValidation = validationSearch(id)
    if (newErrorValidation) {
      setSearchError(newErrorValidation)
      return
    }

    trigger(id)
  }

  const handleUpdate = async () => {
    setEditErrors({})

    const newErrorsValidation = validationEdit(changes)
    if (Object.keys(newErrorsValidation).length > 0) {
      setEditErrors(newErrorsValidation)
      return
    }

    const result = await updateFeedback(changes)

    if (result.data) closeEdit()
  }

  return (
    <div className="flex flex-col gap-3 w-full p-3 border">
      <FeedbackSearch
        value={id}
        onChange={setId}
        onSearch={handleSearch}
        isLoading={isSearching}
        errorMessage={searchError}
      />

      {!isSearching &&
        isSuccess &&
        (isEdit ? (
          <FeedbackEdit
            changes={changes}
            onChange={handleChange}
            onSave={handleUpdate}
            isUpdating={isUpdating}
            errorsMessages={editErrors}
            onCloseEdit={closeEdit}
          />
        ) : (
          <FeedbackView feedback={feedback} onOpenEdit={openEdit} />
        ))}

      {isErrorSearch && (
        <Toast
          isSuccess={false}
          infoText="При поиске Feedback возникла ошибка"
          errorMessage={getErrorMessage(errorSearch)}
        />
      )}

      {isErrorUpdate && (
        <Toast
          isSuccess={false}
          infoText="При обновлении Feedback возникла ошибка"
          errorMessage={getErrorMessage(errorUpdate)}
        />
      )}
    </div>
  )
}
