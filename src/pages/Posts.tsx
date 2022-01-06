import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostPreview from '../components/PostPreview'

const Posts: React.FC = () => {
    const posts = useSelector(state => state.posts)
    const orderedPosts = posts.slice().sort((a, b) => b.created.localeCompare(a.created))

    return (
        <section>
            {orderedPosts.map(post => (
                <Link to={post.id} key={post.id}>
                    <PostPreview {...post}></PostPreview>
                </Link>
            ))}
        </section>
    )
}

export default Posts
