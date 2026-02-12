import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

const initialState = {
  starredItems: {
    byId:[]
  }
}
const store = mockStore(initialState)

export const useCustomHook = () => {
  return useQuery({ queryKey: ['items'], queryFn: () => 'Hello' })
}

const queryClient = new QueryClient()

export const wrapperWithProviders = ({children}) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
           {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>)
