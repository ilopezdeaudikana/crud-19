import ItemList from '../components/home/item-list.component'
import StarredItemsPanel from '../components/home/starred-items-panel.component'
import { Box, Link } from '@mui/material'
import { ItemsProvider } from '@/items/context/items.context'
import { useNavigate } from 'react-router-dom'

export const ItemsView = () => {
  const navigate = useNavigate()

  return (
    <ItemsProvider>
      <div className="flex gap-x-4 min-h-screen grow-1">
        <div className="basis-2/3 flex-shrink">
          <Box sx={{ py: 4 }}>
            <Link 
              component='a' 
              onClick={() => navigate('/items/create')}
              sx={{ mb: 2, display: 'block', cursor: 'pointer' }}
            > 
              Create new item
            </Link>
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
