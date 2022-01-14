import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { api } from '../../api'

export const fetchNotifications = createAsyncThunk('notifications', async () => api.notifications.getAll())

type Notification = Awaited<ReturnType<typeof api.notifications.getAll>>[0]

const notificationsAdapter = createEntityAdapter<Notification>({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors((state: DefaultRootState) => state.notifications)

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        readNotification(state, action: PayloadAction<{ id: string }>) {
            const notification = state.entities[action.payload.id]
            if (!notification) return
            notification.isRead = true
        },
        readAllNotifications: state => {
            for (const notification of Object.values(state.entities)) notification!.isRead = true
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, notificationsAdapter.upsertMany)
    },
})
