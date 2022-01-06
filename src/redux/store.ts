import { configureStore, createReducer, PayloadAction } from '@reduxjs/toolkit'
import { postsSlice } from './posts/slice'

const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
    },
})

declare module 'react-redux' {
    interface DefaultRootState extends ReturnType<typeof store['getState']> {}
}

export default store
