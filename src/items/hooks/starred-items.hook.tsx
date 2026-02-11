import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectStarredById, toggleStar, unstar } from '@/store/starredItemsSlice'

type StarredItemsValue = {
  starredIds: Set<number>
  isStarred: (id: number) => boolean
  toggleStar: (id: number) => void
  unstar: (id: number) => void
}

export const useStarredItems = (): StarredItemsValue => {
  const dispatch = useAppDispatch()
  const starredById = useAppSelector(selectStarredById)

  const starredIds = useMemo(
    () => new Set(Object.keys(starredById).map(Number)),
    [starredById],
  )

  const isStarred = useCallback((id: number) => Boolean(starredById[id]), [starredById])

  const handleToggleStar = useCallback(
    (id: number) => {
      dispatch(toggleStar(id))
    },
    [dispatch],
  )

  const handleUnstar = useCallback(
    (id: number) => {
      dispatch(unstar(id))
    },
    [dispatch],
  )

  return {
    starredIds,
    isStarred,
    toggleStar: handleToggleStar,
    unstar: handleUnstar,
  }
}
