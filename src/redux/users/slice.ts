import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { api, User } from '../../api'

const usersAdapter = createEntityAdapter<User>()

export const fetchUsers = createAsyncThunk('users', async () => api.users.getAll())

export const { selectAll: selectAllUsers, selectEntities: selectUsers } = usersAdapter.getSelectors<DefaultRootState>(state => state.users)

export const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(),
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    },
})

export const selectUserByUsername = (state: DefaultRootState, username: string) =>
    Object.entries(state.users.entities).find(([, user]) => user?.username === username)
