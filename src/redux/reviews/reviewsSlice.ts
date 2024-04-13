import { initialState } from './reviews.type'
import { Status } from '../@types/enum'
import { fetchReviews } from './getReviews'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetReviewsContent: (state, action: PayloadAction<string>) => {
      if (state.id === action.payload) {
        state.comments = []
      } else {
        state.id = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = Status.pending
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.comments = [...state.comments, ...action.payload.docs]
        state.pages = action.payload.pages
        state.page += 1
        state.status = Status.fulfilled
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = Status.rejected
      })
  },
})

export default reviewsSlice.reducer

export const { resetReviewsContent } = reviewsSlice.actions
