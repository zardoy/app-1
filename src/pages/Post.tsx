import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEditPostMutation, useGetPostQuery } from '../redux/apiSlice'

const Post: React.FC = () => {
    const { postId } = useParams() as { postId: string }

    const { isFetching, error, data: post } = useGetPostQuery({ postId })

    const [editPostMutation, { isLoading }] = useEditPostMutation()

    const [editingContent, setEditingContent] = useState<string>()
    const [inEditMode, setInEditMode] = useState(false)
    useEffect(() => {
        setEditingContent(post?.content)
    }, [post])

    if (isFetching) return <div>Loading...</div>
    if (error) return null

    if (!post) return <div className="text-[red]">Post not found.</div>

    return (
        <div>
            <h2>{post.title}</h2>
            {inEditMode ? (
                <textarea title="Post content" className="border" value={editingContent} onChange={e => setEditingContent(e.target.value)} />
            ) : (
                <section className="border">{post.content}</section>
            )}
            <button
                disabled={!editingContent || isLoading}
                type="button"
                onClick={async () => {
                    if (inEditMode) await editPostMutation({ content: editingContent!, postId }).unwrap()

                    setInEditMode(s => !s)
                }}
            >
                {isLoading ? 'Sending' : inEditMode ? 'Done' : 'Edit'}
            </button>
        </div>
    )
}

export default Post
