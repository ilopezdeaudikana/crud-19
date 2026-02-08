import React, { useState } from 'react'
import type { Item } from '../types'
import { ItemsService } from '../services/api'
import { TextField, Button, Box, Stack } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateFormProps {
  item: Item;
  onUpdate?: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ item, onUpdate }) => {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (payload: Omit<Item, 'id'>) => ItemsService.updateItem(item.id, payload),
    onSuccess: () => {
      setErrorMessage(null)
      queryClient.invalidateQueries({ queryKey: ['items'] })
      queryClient.invalidateQueries({ queryKey: ['item', item.id] })
      onUpdate?.()
    },
    onError: error => {
      setErrorMessage((error as Error).message)
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formTitle = (formData.get('new-title') as string) ?? title
    const formDescription = (formData.get('new-description') as string) ?? description

    await updateMutation.mutateAsync({
      title: formTitle,
      description: formDescription,
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        name="new-title"
        label="Item Title"
        disabled={updateMutation.isPending}
        required
        value={title}
        onChange={event => setTitle(event.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        name="new-description"
        label="Description"
        multiline
        rows={3}
        disabled={updateMutation.isPending}
        value={description}
        onChange={event => setDescription(event.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack direction="row" spacing={1.25}>
        <Button data-testid={`update-button-${item.id}`} type="submit" variant="contained" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Updating...' : 'Update Item'}
        </Button>
        <Button variant="text" onClick={() => onUpdate?.()}>Cancel</Button>
      </Stack>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Box>
  )
}

export default UpdateForm
