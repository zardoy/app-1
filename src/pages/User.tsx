import { createSelector } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Post } from '../api'
import PageContent from '../components/PageContent'
import PostPreview from '../components/PostPreview'
import { useGetPostsQuery } from '../redux/apiSlice'
import { selectUserByUsername } from '../redux/users/slice'

const selectPostsByUser = createSelector(
    //
    [(res: { data: Post[] }) => res.data, (res, userId: string) => userId],
    (data, userId) => data.filter(({ author }) => author === userId),
)

const User: React.FC = () => {
    const { username } = useParams() as { username: string }
    const user = useSelector(state => selectUserByUsername(state as any, username))
    const { postsForUser } = useGetPostsQuery(undefined, {
        skip: !!user,
        selectFromResult: result => ({
            ...result,
            postsForUser: selectPostsByUser({ data: result.data! }, user!.id),
        }),
    })

    if (!user) return <PageContent>User not found</PageContent>

    return (
        <PageContent>
            Posts from {user.firstName} {user.lastName}({postsForUser.length}):
            {postsForUser.map(post => (
                <PostPreview key={post.id} {...{ post }} />
            ))}
        </PageContent>
    )
}

export default User
