import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, User } from '../api'
import { PostInputData } from '../api/posts'

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    endpoints(builder) {
        return {
            getPosts: builder.query<Post[], void>({
                query: () => '/posts',
                providesTags: ['Post'],
            }),
            getPost: builder.query<Post, { postId: string }>({
                query: ({ postId }) => `/posts/${postId}`,
            }),
            addPost: builder.mutation({
                query: (initialPost: PostInputData) => ({
                    url: '/posts',
                    method: 'POST',
                    body: initialPost,
                }),
                invalidatesTags: ['Post'],
            }),
            editPost: builder.mutation<void, Record<'postId' | 'content', string>>({
                query: ({ content, postId }) => ({
                    url: `/posts/${postId}`,
                    method: 'PATCH',
                    body: { content },
                }),
            }),
        }
    },
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useEditPostMutation } = apiSlice
