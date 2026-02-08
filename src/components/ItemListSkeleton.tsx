import { Paper, Skeleton, Stack } from '@mui/material'

const ItemListSkeleton: React.FC = () => (
  <>
  {
    Array.from({ length: 3 }).map((_, index) => (
      <Paper
        key={`skeleton-${index}`}
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Skeleton variant="text" width="55%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
        <Stack direction="row" spacing={1.25}>
          <Skeleton variant="rounded" width={72} height={36} />
          <Skeleton variant="rounded" width={82} height={36} />
        </Stack>
      </Paper>
    ))
  }
  </>
)
export default ItemListSkeleton
