import { Routes, Route } from 'react-router-dom'
import { ItemsView } from './items/views/items.view'
import { UpdateItemView } from './items/views/update-item.view'
import { FooView } from './foo/views/foo.view'
import { UpdateFooView } from './foo/views/update-foo.view'
import { Navigation } from '@/common/nav.component'

const App = () => {

  return (
      <div className="container min-h-screen min-w-screen flex gap-x-6">
        <Navigation />
        <Routes>
          <Route path="/" element={<ItemsView />} />
          <Route path="/items" element={<ItemsView />} />
          <Route path="/foo" element={<FooView />} />
          <Route path="/items/:id/edit" element={<UpdateItemView />} />
          <Route path="/foo/:id/edit" element={<UpdateFooView />} />
        </Routes>
      </div>
    
  )
}

export default App
