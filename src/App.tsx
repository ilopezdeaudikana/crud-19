import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UpdateItemPage from './pages/UpdateItemPage'

const App = () => {
  return (
    <Container fixed={true} className="w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id/edit" element={<UpdateItemPage />} />
      </Routes>
    </Container>
  )
}

export default App
