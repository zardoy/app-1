import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPosts as fetchPostsApi, addPost as addPostApi } from '../../api/posts'

export type Post = Awaited<ReturnType<typeof fetchPosts>>[number]

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        posts: [] as Post[],
        error: undefined as string | undefined,
    },
    reducers: {
        editPost(state, action: PayloadAction<Post>) {
            const postIndex = state.posts.findIndex(({ id }) => id === action.payload.id)
            if (postIndex === -1) return
            state[postIndex] = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
    },
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => fetchPostsApi())

export const addPost = createAsyncThunk('posts/addPost', async (data: Parameters<typeof addPostApi>[0]) => addPostApi(data))
