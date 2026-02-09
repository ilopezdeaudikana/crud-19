import CreateForm from '../components/home/CreateForm'
import ItemList from '../components/home/ItemList'
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
