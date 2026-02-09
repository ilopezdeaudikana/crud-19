import CreateForm from '../components/home/CreateForm'
import ItemList from '../components/home/ItemList'
import StarredItemsPanel from '../components/home/StarredItemsPanel'
import { Box } from '@mui/material'
import { ItemsProvider } from '@/items/context/ItemsContext'
import { StarredItemsProvider } from '@/items/context/StarredItemsContext'

const HomePage = () => {
  return (
    <ItemsProvider>
      <StarredItemsProvider>
        <div className="flex gap-x-4 min-h-screen">
          <div className="basis-2/3 flex-shrink">
            <Box sx={{ py: 4 }}>
              <CreateForm />
              <ItemList />
            </Box>
          </div>
          <div className="basis-1/3 flex-shrink">
            <StarredItemsPanel />
          </div>
        </div>
      </StarredItemsProvider>
    </ItemsProvider>
  )
}

export default HomePage
