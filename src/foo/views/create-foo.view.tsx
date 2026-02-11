import { FooService } from "@/services/foo.service"
import { Box, Button, TextField, Typography } from "@mui/material"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"



const CreateFooView = (): React.JSX.Element => {

  const navigate = useNavigate()
  
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: FooService.createFoo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foo']})
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
      <Box sx={{margin: '2rem 0'}}>
        <Typography variant='h6' sx={{ margin: '1rem 0' }}>Create new Foo</Typography>
        <form onSubmit={createFoo}>
          <TextField
            name="bar"
          />
          <TextField
            name="baz"
          />
          <Button
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  )
}

export default CreateFooView