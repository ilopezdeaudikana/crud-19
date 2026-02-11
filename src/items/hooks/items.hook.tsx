import { useQuery } from '@tanstack/react-query'
import type { Item } from '@/items/types/items'
import { ItemsService } from '@/services/items.service'

type ItemsReturnValue = {
  items: Item[]
  isLoading: boolean
  isError: boolean
  error: unknown
}

export const useItems = (): ItemsReturnValue => {
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['items'],
    queryFn: ItemsService.fetchItems,
  })

  return {
    items,
    isLoading,
    isError,
    error
  }
}
