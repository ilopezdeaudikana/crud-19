import CreateForm from '../components/CreateForm'
import ItemList from '../components/ItemList'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Box sx={{ py: 4 }}>
      <CreateForm />
      <ItemList />
    </Box>
  )
}

export default HomePage
