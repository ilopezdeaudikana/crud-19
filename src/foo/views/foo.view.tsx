import { Link, Stack, Typography } from '@mui/material'
import { FooList } from '../components/foo-list.component'
import { useQuery } from '@tanstack/react-query'
import { FooService } from '@/services/foo.service'
import { useNavigate } from 'react-router-dom'

const FooView = (): React.JSX.Element => {

  const navigate = useNavigate()
  const {
    data: foo,
    isPending,
    isError,
    error
  } = useQuery({
    queryFn: FooService.getFoo,
    queryKey: ['foo']
  })

  return (
    <>
      <Stack direction="column">
        <Link
          component='a'
          data-testid='create-new-foo'
          onClick={() => navigate('/foo/create')}
          sx={{ mt: 2, ml: 4, display: 'block', cursor: 'pointer' }}
        >
          Create new foo
        </Link>
        {isError && !isPending && <Typography>Something went wrong {error.message}</Typography>}
        {isPending && <Typography>Loading Foo</Typography>}
        {foo && foo.length ?
          <FooList list={foo} />
          : <Typography>No results</Typography>
        }
      </Stack>
    </>
  )
}

export default FooView
