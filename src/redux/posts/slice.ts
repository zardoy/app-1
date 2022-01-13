import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { Post } from '../../api'
import { fetchPosts as fetchPostsApi, addPost as addPostApi } from '../../api/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => fetchPostsApi())

export const addPost = createAsyncThunk('posts/addPost', async (data: Parameters<typeof addPostApi>[0]) => addPostApi(data))

export const postsAdapter = createEntityAdapter<Post>({
    sortComparer: (a, b) => b.created.localeCompare(a.created),
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: DefaultRootState) => state.posts)

export const selectPostsByUser = createSelector(
    //
    [selectAllPosts, (_state, userId: string) => userId],
    (posts, userId) => posts.filter(({ author }) => author === userId),
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: postsAdapter.getInitialState({
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: undefined as string | undefined,
    }),
    reducers: {
        editPost(state, action: PayloadAction<Post>) {
            const posts = state.entities
            if (!posts[action.payload.id]) return
            posts[action.payload.id] = action.payload
        },
        likePost(state, action: PayloadAction<{ id: string }>) {
            const post = state.entities[action.payload.id]
            if (!post) return
            post.likes++
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                postsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPost.fulfilled, postsAdapter.addOne)
    },
})
