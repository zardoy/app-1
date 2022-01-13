import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostPreview from '../components/PostPreview'
import { fetchPosts, selectPostIds } from '../redux/posts/slice'

const Posts: React.FC = () => {
    const orderedPostsIds = useSelector(selectPostIds)
    const dispatch = useDispatch()
    const postsStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postsStatus === 'idle') dispatch(fetchPosts())
    }, [])

    if (postsStatus === 'loading') return <span>Loading...</span>
    if (postsStatus === 'failed') return <span>Error: {error}</span>
    if (postsStatus === 'idle') return <div />

    return (
        <section>
            {orderedPostsIds.map(postId => (
                <PostPreview key={postId} {...{ postId }} />
            ))}
        </section>
    )
}

export default Posts
