import { configureStore } from '@reduxjs/toolkit'
import starredItemsReducer from '@/store/starredItemsSlice'

export const store = configureStore({
  reducer: {
    starredItems: starredItemsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
