import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageContent from '../components/PageContent'
import PostPreview from '../components/PostPreview'
import { selectPostsByUser } from '../redux/posts/slice'
import { selectUserByUsername } from '../redux/users/slice'

const User: React.FC = () => {
    const { username } = useParams<'username'>()
    const user = useSelector(state => selectUserByUsername(state, username!))?.[1]
    const userPosts = useSelector(state => selectPostsByUser(state, username!))

    if (!user) return <PageContent>User not found</PageContent>

    return (
        <PageContent>
            Posts from {user.firstName} {user.lastName} ({userPosts.length}):
            {userPosts.map(({ id: postId }) => (
                <PostPreview key={postId} {...{ postId }} />
            ))}
        </PageContent>
    )
}

export default User
