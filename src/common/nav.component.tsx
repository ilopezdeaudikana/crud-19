import { Link as RouterLink } from 'react-router-dom'
import { Paper } from '@mui/material'

export const Navigation = (): React.JSX.Element => {
  const navLinks = [
    <RouterLink to='/items' key='items'>Items</RouterLink>,
    <RouterLink to='/foo' key='foo'>Foo</RouterLink>
  ]

  return (
    <Paper sx={{ minHeight: '100vh'}}>
      {navLinks}
    </Paper>
  )
}