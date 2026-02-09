import { Box, IconButton, Stack, Typography, Drawer, Divider } from '@mui/material'
import { useStarredItems } from '@/items/context/StarredItemsContext'
import { useItems } from '@/items/context/ItemsContext'
import { Fragment } from 'react'

const StarredItemsPanel: React.FC = () => {
  const { items, isLoading, isError } = useItems()
  const { isStarred, toggleStar } = useStarredItems()
  const starredItems = items.filter(item => isStarred(item.id))

  const isOpen = true

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      variant='permanent'
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          width: 500,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>Starred Items</Typography>
        {isLoading ? (
          <Typography color="text.secondary">Loading starred items...</Typography>
        ) : isError ? (
          <Typography color="error">Failed to load items.</Typography>
        ) : starredItems.length === 0 ? (
          <Typography color="text.secondary">No starred items yet.</Typography>
        ) : (
          <Stack spacing={1}>
            {starredItems.map((item, index) => (
              <Fragment key={item.id}>
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="Unstar item"
                    onClick={() => toggleStar(item.id)}
                    color="warning"
                  >
                    <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>★</Box>
                  </IconButton>
                </Box>
                <Divider />
              </Fragment>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}

export default StarredItemsPanel
