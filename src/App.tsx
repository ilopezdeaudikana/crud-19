import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from '@/common/nav.component'
import { ErrorBoundary } from 'react-error-boundary'

const ItemsView = lazy(() => import('./items/views/items.view'))
const UpdateItemView = lazy(() => import('./items/views/update-item.view'))
const NewItemView = lazy(() => import('./items/views/create-item.view'))
const FooView = lazy(() => import('./foo/views/foo.view'))
const NewFooView = lazy(() => import('./foo/views/create-foo.view'))

const App = () => {

  return (
    <ErrorBoundary fallback={<p>Something went wrong. Is the server running at all?</p>}>
      <div className="container min-h-screen min-w-screen flex gap-x-6">
        <Navigation />
        <Suspense fallback={<p>Loading route...</p>}>
          <Routes>
            <Route path="/" element={<ItemsView />} />
            <Route path="/items" element={<ItemsView />} />
            <Route path="/foo" element={<FooView />} />
            <Route path="/foo/create" element={<NewFooView />} />
            <Route path="/items/create" element={<NewItemView />} />
            <Route path="/items/:id/edit" element={<UpdateItemView />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
