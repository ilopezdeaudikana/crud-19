import CreateForm from '../components/create/create-form.component'
import { Box } from '@mui/material'

export const NewItemView = () => {
  return (
    <Box sx={{ py: 4 }}>
      <CreateForm />
    </Box>
  )
}
