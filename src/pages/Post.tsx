import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { postsSlice } from '../redux/posts/slice'

const Post: React.FC = () => {
    const { postId } = useParams<'postId'>()
    const post = useSelector(state => state.posts.find(({ id }) => id === postId!))
    const [inEditMode, setInEditMode] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const [editingContent, setEditingContent] = useState(post?.content!)
    const dispatch = useDispatch()

    if (!post) return <div className="bg-[red]">Post not found.</div>

    return (
        <div>
            <h2>{post.title}</h2>
            {inEditMode ? (
                <textarea className="border" value={editingContent} onChange={e => setEditingContent(e.target.value)} />
            ) : (
                <section className="border">{post.content}</section>
            )}
            <button
                onClick={() => {
                    // if (inEditMode) dispatch(postsSlice.actions.editPost({ ...post, id: postId!, content: editingContent }))

                    setInEditMode(s => !s)
                }}
            >
                {inEditMode ? 'Done' : 'Edit'}
            </button>
        </div>
    )
}

export default Post
