import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Item } from '@/items/types/items'
import { ItemsService } from '@/services/items.service'
import type { ProviderProps } from '@/types/provider'

type ItemsContextValue = {
  items: Item[]
  isLoading: boolean
  isError: boolean
  error: unknown
}

const ItemsContext = createContext<ItemsContextValue | undefined>(undefined)

export const ItemsProvider= ({ children } : ProviderProps): React.JSX.Element => {
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['items'],
    queryFn: ItemsService.fetchItems,
  })

  return (
    <ItemsContext.Provider value={{ items, isLoading, isError, error }}>
      { children }
    </ItemsContext.Provider>
  )
}

export const useItems = () => {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider')
  }
  return context
}
