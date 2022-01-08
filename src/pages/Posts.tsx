import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostPreview from '../components/PostPreview'
import { fetchPosts } from '../redux/posts/slice'

const Posts: React.FC = () => {
    const posts = useSelector(state => state.posts.posts)
    const orderedPosts = [...posts].sort((a, b) => b.created.localeCompare(a.created))
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
            {orderedPosts.map(post => (
                <Link key={post.id} to={post.id}>
                    <PostPreview {...post} />
                </Link>
            ))}
        </section>
    )
}

export default Posts
