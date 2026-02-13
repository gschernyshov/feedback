'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useLazyFindOneFeedbackQuery, useUpdateFeedbackMutation } from '../api'
import { validationSearch, validationEdit } from '../model/validation'
import { FeedbackSearch } from './FeedbackSearch'
import { FeedbackView } from './FeedbackView'
import { FeedbackEdit } from './FeedbackEdit'
import { useAppDispatch, useAppSelector } from '@/app/providers/store'
import { addTemporary } from '@/features/notifications/model'
import {
  selectDeletedIds,
  type FindFeedback,
  type FindFeedbackError,
  type UpdateFeedback,
  type UpdateFeedbackErrors,
} from '@/entities/feedback/model'
import { getErrorMessage } from '@/shared/lib/errors'

export const FeedbackManager = () => {
  const dispatch = useAppDispatch()
  const deletedIds = useAppSelector(selectDeletedIds)
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
  }, [feedback, isSuccess, dispatch])

  useEffect(() => {
    if (isErrorSearch) {
      dispatch(
        addTemporary({
          type: 'error',
          message: 'При поиске Feedback возникла ошибка',
          errorMessage: getErrorMessage(errorSearch),
        }),
      )
    }
  }, [isErrorSearch, errorSearch, dispatch])

  useEffect(() => {
    if (isErrorUpdate) {
      dispatch(
        addTemporary({
          type: 'error',
          message: 'При обновлении Feedback возникла ошибка',
          errorMessage: getErrorMessage(errorUpdate),
        }),
      )
    }
  }, [isErrorUpdate, errorUpdate, dispatch])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target
    setChanges({
      ...changes,
      [fieldName]: value,
    })
  }

  const handleSearch = async () => {
    setSearchError('')

    const newErrorValidation = validationSearch(id)
    if (newErrorValidation) {
      setSearchError(newErrorValidation)
      return
    }

    await trigger(id)

    setId('')
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
        !deletedIds.includes(feedback.id) &&
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
    </div>
  )
}
