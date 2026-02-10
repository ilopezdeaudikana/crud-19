import { Typography } from '@mui/material'
import { FooList } from '../components/foo-list.component'
import { useQuery } from '@tanstack/react-query'
import { FooService } from '@/services/foo.service'

export const FooView = (): React.JSX.Element => {

  const {
    data: foo,
    isPending,
    isError,
    error
  } = useQuery({
    queryFn: FooService.getFoo,
    queryKey:['foo']
  })
  
  return (
    <> 
      { isError && !isPending && <Typography>Something went wrong {error.message}</Typography>}
      {isPending && <Typography>Loading Foo</Typography>}
      {foo && foo.length ?
        <FooList list={foo} />
        : <Typography>No results</Typography>
      }
    </>
  )
}