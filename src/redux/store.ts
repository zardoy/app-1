import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { apiSlice } from './apiSlice'
import { notificationSlice } from './notifications/slice'

const store = configureStore({
    reducer: {
        notifications: notificationSlice.reducer,
        // users: usersSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // eslint-disable-next-line unicorn/prefer-spread
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

declare module 'react-redux' {
    interface DefaultRootState extends ReturnType<typeof store['getState']> {}
}

export const useAppDispatch = () => useDispatch<typeof store['dispatch']>()

export default store
