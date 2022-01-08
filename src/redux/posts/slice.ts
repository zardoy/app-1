import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { getPosts } from '../../api/api'

type Post = Awaited<ReturnType<typeof getPosts>>[number]

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        posts: [] as Post[],
        error: undefined as string | undefined,
    },
    reducers: {
        addPost: {
            reducer(state, action: PayloadAction<Post>) {
                state.posts.push(action.payload)
            },
            prepare(title: string, content: string) {
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
    },
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => getPosts())
