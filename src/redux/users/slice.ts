import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { User } from '../../api'
import { apiSlice } from '../apiSlice'

const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (_: void) => '/users/',
            transformResponse: (data: User[]) => usersAdapter.setAll(initialState, data),
        }),
    }),
})

// export const selectUserByUsername = createSelector([selectUsersResult, (_state, username: string) => username], ({ data: users }, username) =>
//     users?.find(({ username: un }) => un === username),
// )

export const selectUsersData = createSelector(extendedApiSlice.endpoints.getUsers.select(), ({ data }) => data)
export const { selectAll: selectAllUsers, selectEntities: selectUsers } = usersAdapter.getSelectors(
    (state: any) => selectUsersData(state) ?? initialState,
)

// export const usersSlice = createSlice({
//     name: 'users',
//     initialState: usersAdapter.getInitialState(),1
//     reducers: {},
//     extraReducers(builder) {
//         builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
//     },
// })

export const selectUserByUsername = (state: DefaultRootState, username: string) =>
    Object.values(selectUsers(state)).find(user => user?.username === username)
