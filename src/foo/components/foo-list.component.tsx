import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FooService } from '@/services/foo.service'
import { useEffect, useState } from 'react'
import type { Foo } from '../types/foo'

type FooListProps = {
  list: Foo[]
}
export const FooList = ({ list }: FooListProps): React.JSX.Element => {
  const [editing, setEditing] = useState<string | null>(null)
  const [editableFoo, updateFoo] = useState<Foo[]>(list ?? [])

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: FooService.deleteFoo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foo'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: (payload: Foo) => FooService.updateFoo(payload.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foo'] })
      setEditing(null)
    }
  })

  const updateFooIndex = (key: string, value: string, index: number) => {
    const newFoo = [...editableFoo]
    newFoo[index] = { ...newFoo[index], [key]: value }
    updateFoo(newFoo)
  }

  const saveFoo = (id: string) => {
    const foo = editableFoo.find(f => f.id === id)
    if (!foo) return
    updateMutation.mutate(foo)
  }

  const deleteFoo = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      const newFoo = editableFoo.filter(f => f.id !== id)
      updateFoo(newFoo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => updateFoo(list ?? []), [list])

  return (
    <Box sx={{ padding: '2rem' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Bar</TableCell>
              <TableCell align="center">Baz</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editableFoo.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {editing && editing === row.id ? <TextField
                    fullWidth
                    name="new-bar"
                    label="Foo Bar"
                    required
                    value={row.bar}
                    onChange={event => updateFooIndex('bar', event.target.value, index)}
                    sx={{ mb: 2 }}
                  />
                    : row.bar
                  }
                </TableCell>
                <TableCell align="center" component="th" scope="row">

                  {editing && editing === row.id ? <TextField
                    fullWidth
                    name="new-baz"
                    label="Foo Baz"
                    required
                    value={row.baz}
                    onChange={event => updateFooIndex('baz', event.target.value, index)}
                    sx={{ mb: 2 }}
                  />
                    : row.baz
                  }
                </TableCell>
                <TableCell align="right">
                  {editing && editing === row.id ? <Button onClick={() => saveFoo(row.id)}>Save</Button> : <Button onClick={() => setEditing(row.id)}>Edit</Button>}
                </TableCell>
                <TableCell align="right"><Button onClick={() => deleteFoo(row.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
