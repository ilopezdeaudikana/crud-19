import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemsService } from '../services/api'

function CreateForm() {
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const createMutation = useMutation({
    mutationFn: ItemsService.createItem,
    onSuccess: () => {
      setErrorMessage(null)
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
    onError: error => {
      setErrorMessage((error as Error).message)
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = (formData.get('title') as string) ?? ''
    const description = (formData.get('description') as string) ?? ''

    if (!title.trim()) {
      setErrorMessage('Title is required')
      return
    }

    await createMutation.mutateAsync({ title, description })
    event.currentTarget.reset()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create Item</Typography>

      <TextField
        fullWidth
        name="title"
        label="Item Title"
        disabled={createMutation.isPending}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="description"
        label="Description"
        multiline
        rows={3}
        disabled={createMutation.isPending}
        sx={{ mb: 2 }}
      />
      <Button data-testid="create-button" type="submit" variant="contained" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Adding...' : 'Add Item'}
      </Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Box>
  )
}

export default CreateForm
