import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type StarredItemsState = {
  byId: Record<number, true>
}

const initialState: StarredItemsState = {
  byId: {},
}

const starredItemsSlice = createSlice({
  name: 'starredItems',
  initialState,
  reducers: {
    toggleStar: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (state.byId[id]) {
        delete state.byId[id]
      } else {
        state.byId[id] = true
      }
    },
    unstar: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (state.byId[id]) {
        delete state.byId[id]
      }
    },
  },
})

export const { toggleStar, unstar } = starredItemsSlice.actions
export default starredItemsSlice.reducer

export const selectStarredById = (state: { starredItems: StarredItemsState }) =>
  state.starredItems.byId

