import CreateForm from '../components/home/create-form.component'
import ItemList from '../components/home/item-list.component'
import StarredItemsPanel from '../components/home/starred-items-panel.component'
import { Box } from '@mui/material'
import { ItemsProvider } from '@/items/context/items.context'

export const ItemsView = () => {
  return (
    <ItemsProvider>
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
    </ItemsProvider>
  )
}
