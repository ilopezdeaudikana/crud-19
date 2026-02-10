import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FooService } from '@/services/foo.service'

export const FooList = (): React.JSX.Element => {
  const {
    data: foo,
    isError,
    error,
    isPending
  } = useQuery({
    queryKey: ['foo'],
    queryFn: FooService.getFoo
  })

  return (
    <>
      {isError && !isPending && <Typography>Something went wrong {error.message}</Typography>}
      {isPending && <Typography>Loading Foo</Typography>}
      {foo && foo.length ?
        <ul>
          {foo.map(f =>
            <li key={f.id}>
                <Box>
                  <Stack direction='row' component='p' gap='1rem'>
                  <Typography sx={{ minWidth: '6rem'}}>{f.bar}</Typography>
                    <Typography>{f.baz}</Typography>
                  </Stack>
                </Box> 
              </li>
              )
          }
          </ul> : <Typography>No results</Typography>
      }
    </>
  )
}