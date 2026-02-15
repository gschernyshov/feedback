import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector)
