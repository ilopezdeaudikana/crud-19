import { Routes, Route } from 'react-router-dom'
import HomePage from './items/views/HomePage'
import UpdateItemPage from './items/views/UpdateItemPage'
const App = () => {
  
  return (
    <div className="container min-h-screen min-w-screen pl-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/:id/edit" element={<UpdateItemPage />} />
      </Routes>
    </div>
  )
}

export default App
