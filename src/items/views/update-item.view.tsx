import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemsService } from '../../services/items.service'
import UpdateForm from '../components/edit/update-form.component'
import type { Item } from '../types/items'

const UpdateItemView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const parsedId = Number(id)
  const itemId = Number.isFinite(parsedId) ? parsedId : null

  const { data: item, isLoading, isError, error } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => ItemsService.fetchItem(itemId as number),
    enabled: itemId !== null,
    refetchOnMount: 'always',
    initialData: () => {
      const items = queryClient.getQueryData<Item[]>(['items'])
      return items?.find(i => i.id === itemId)
    },
  })

  if (itemId === null) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Invalid item id.</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to list</Button>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ py: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography>Loading item...</Typography>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Failed to load item: {(error as Error).message}</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to list</Button>
      </Box>
    )
  }

  if (!item) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Item not found.</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to list</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Update Item</Typography>
      <UpdateForm item={item} onUpdate={() => navigate('/')} />
    </Box>
  )
}

export default UpdateItemView
