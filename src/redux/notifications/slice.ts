import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { getNotifications } from '../../api/notifications'

export const fetchNotifications = createAsyncThunk('notifications', () => getNotifications())

type Notification = ReturnType<typeof getNotifications>[0]

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [] as Notification[],
    reducers: {
        readNotification(state, action: PayloadAction<{ id: string }>) {
            const notification = state.find(({ id }) => id === action.payload.id)
            if (!notification) return
            notification.isRead = true
        },
        readAllNotifications: state => {
            for (const notification of state) notification.isRead = true
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.push(...action.payload)
            state.sort((a, b) => b.date.localeCompare(a.date))
        })
    },
})
export const selectAllNotifications = (state: DefaultRootState) => state.notifications
