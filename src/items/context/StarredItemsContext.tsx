import { createContext, useContext, useState } from 'react'

type StarredItemsContextValue = {
  starredIds: Set<number>
  isStarred: (id: number) => boolean
  toggleStar: (id: number) => void
  unstar: (id: number) => void
}

const StarredItemsContext = createContext<StarredItemsContextValue | undefined>(undefined)

export const StarredItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [starredIds, setStarredIds] = useState<Set<number>>(new Set())

  const isStarred = (id: number) => starredIds.has(id)

  const toggleStar = (id: number) => {
    setStarredIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const unstar = (id: number) => {
    setStarredIds(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }


  return (
    <StarredItemsContext.Provider
      value={{
        starredIds,
        isStarred,
        toggleStar,
        unstar
      }}
  >
      {children}
    </StarredItemsContext.Provider>
  )
}

export const useStarredItems = () => {
  const context = useContext(StarredItemsContext)
  if (!context) {
    throw new Error('useStarredItems must be used within StarredItemsProvider')
  }
  return context
}
