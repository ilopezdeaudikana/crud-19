import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import HomePage from './items/views/HomePage'
import UpdateItemPage from './items/views/UpdateItemPage'
const App = () => {
  
  return (
  <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id/edit" element={<UpdateItemPage />} />
      </Routes>
    </Container>
  )
}

export default App
