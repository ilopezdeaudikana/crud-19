import ItemListSkeleton from './ItemListSkeleton'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemsService } from '../services/api'

const ItemList = () => {
  const queryClient = useQueryClient()
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['items'],
    queryFn: ItemsService.fetchItems,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ItemsService.deleteItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {isLoading ? (
        <ItemListSkeleton />
      ) : isError ? (
        <Typography color="error">Failed to load items: {(error as Error).message}</Typography>
      ) : items.length === 0 ? (
        <Typography>No items found. Create one to get started!</Typography>
      ) : (
        items.map(item => (
          <Paper
            key={item.id}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <>
              <Typography variant="h6">
                {item.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>{item.description}</Typography>
              <Stack direction="row" spacing={1.25}>
                <Button
                  data-testid={`edit-button-${item.id}`}
                  variant="contained"
                  component={RouterLink}
                  to={`/items/${item.id}/edit`}
                >
                  Edit
                </Button>
                <Button
                  data-testid={`delete-button-${item.id}`}
                  variant="outlined"
                  color="error"
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </Stack>
            </>
          </Paper>
        ))
      )}
    </Box>
  )
}

export default ItemList
