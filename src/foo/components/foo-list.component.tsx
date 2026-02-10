import { Box, Typography } from '@mui/material'
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
      {isError && <Typography>Something went wrong {error.message}</Typography>}
      {isPending && <Typography>Loading Foo</Typography>}
      {foo && foo.length ?
        <ul>
          {foo.map(f =>
            <li>
                <Box>
                  <Typography>{f.bar}</Typography>
                  <Typography>{f.baz}</Typography>
                </Box> 
              </li>
              )
          }
          </ul> : <Typography>No results</Typography>
      }
    </>
  )
}