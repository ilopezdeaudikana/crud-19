import { Routes, Route } from 'react-router-dom'
import { ItemsView } from './items/views/items.view'
import { UpdateItemView } from './items/views/update-item.view'
import { NewItemView } from './items/views/create-item.view'
import { FooView } from './foo/views/foo.view'
import { Navigation } from '@/common/nav.component'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {

  return (
    <ErrorBoundary fallback={<p>Something went wrong. Is the server running at all?</p>}>
      <div className="container min-h-screen min-w-screen flex gap-x-6">
        <Navigation />
        <Routes>
          <Route path="/" element={<ItemsView />} />
          <Route path="/items" element={<ItemsView />} />
          <Route path="/foo" element={<FooView />} />
          <Route path="/items/create" element={<NewItemView />} />
          <Route path="/items/:id/edit" element={<UpdateItemView />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App
