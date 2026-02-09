import ItemListSkeleton from './ItemListSkeleton'
import { Box, Button, Paper, Stack, Typography, Dialog, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemsService } from '@/services/items.service'
import { useState } from 'react'
import { useStarredItems } from '@/items/context/StarredItemsContext'
import { useItems } from '@/items/context/ItemsContext'

const ItemList = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null)
  const { isStarred, toggleStar, unstar } = useStarredItems()
  
  const queryClient = useQueryClient()
  const { items, isLoading, isError, error } = useItems()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ItemsService.deleteItem(id),
    onSuccess: (_data, id) => {
      unstar(id)
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })

  const handleDelete = (id: number) => {
    setCurrentId(id)
    setOpenDialog(true)
  }

  const handleConfirm = () => {
    if (currentId !== null) {
      deleteMutation.mutate(currentId)
      setOpenDialog(false)
      setCurrentId(null)
    }
  }

  return (
    <>
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
                  <IconButton
                    data-testid={`star-button-${item.id}`}
                    aria-label={isStarred(item.id) ? 'Unstar item' : 'Star item'}
                    onClick={() => toggleStar(item.id)}
                    color={isStarred(item.id) ? 'warning' : 'default'}
                  >
                    <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                      {isStarred(item.id) ? '★' : '☆'}
                    </Box>
                  </IconButton>
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
                    onClick={() => handleDelete(item.id)}
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
      <Dialog
        open={openDialog}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 3
          }}
        >
          <Typography>Are you sure you want to delete item {currentId}?</Typography>
          <Stack direction="row" spacing={1.25}>
            <Button
              data-testid={`dialog-cancel-button-${currentId}`}
              variant="outlined"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              data-testid={`delete-confirm-button-${currentId}`}
              variant="contained"
              color="error"
              onClick={handleConfirm}
              disabled={deleteMutation.isPending}
            >
              Confirm
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  )
}

export default ItemList
