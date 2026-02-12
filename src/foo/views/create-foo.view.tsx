import { FooService } from "@/services/foo.service"
import { Stack, Button, TextField, Typography } from "@mui/material"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const CreateFooView = (): React.JSX.Element => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: FooService.createFoo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foo'] })
      navigate('/foo')
    }
  })

  const createFoo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    return createMutation.mutateAsync({
      id: '',
      bar: String(data.get('bar')),
      baz: String(data.get('baz'))
    })
  }

  return (
    <>
      <Stack direction="column" sx={{ mt: 2, mb: 2 }} gap={2}>
        <Typography variant='h6'>Create new Foo</Typography>
        <form onSubmit={createFoo}>
          <Stack direction="column" sx={{ mt: 2, mb: 2 }} gap={2}>
            <Stack direction="row" gap={2}>
              <TextField
                name="bar"
                label="Bar"
                required
              />
              <TextField
                name="baz"
                label="Baz"
                required
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  )
}

export default CreateFooView