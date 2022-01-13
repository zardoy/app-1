import { configureStore, createReducer, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { notificationSlice } from './notifications/slice'
import { postsSlice } from './posts/slice'
import { usersSlice } from './users/slice'

const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        notifications: notificationSlice.reducer,
        users: usersSlice.reducer,
    },
})

declare module 'react-redux' {
    interface DefaultRootState extends ReturnType<typeof store['getState']> {}
}

export const useAppDispatch = () => useDispatch<typeof store['dispatch']>()

export default store
