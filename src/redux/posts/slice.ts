import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { getPosts } from '../../api/api'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        status: 'idle'|'loading'|'succeeded'|'failed'
        posts: [] as Awaited<ReturnType<typeof getPosts>>,
    },
    reducers: {
        addPost: {
            reducer(state, action: PayloadAction<typeof state[number]>) {
                state.push(action.payload)
            },
            prepare: function (title: string, content: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        created: new Date().toISOString(),
                    },
                }
            },
        },
        editPost(state, action: PayloadAction<typeof state[number]>) {
            const postIndex = state.findIndex(({ id }) => id === action.payload.id)
            if (postIndex === -1) return
            state[postIndex] = action.payload
        },
    },
})

export const fetchPosts = () => {
    return (dispatch, getState) => {}
}
