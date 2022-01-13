import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { Icon } from '@mdi/react'
import { mdiHeart } from '@mdi/js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EntityId } from '@reduxjs/toolkit'
import { postsSlice, selectPostById } from '../redux/posts/slice'
import { useAppDispatch } from '../redux/store'

type ComponentProps = { postId: EntityId }

const PostPreview: React.FC<ComponentProps> = ({ postId }) => {
    const dispatch = useAppDispatch()
    const post = useSelector(state => selectPostById(state, postId))

    if (!post) return null
    const { content, created, id, likes, title, author } = post

    return (
        <div className="px-4 py-3 bg-white border-gray-600 rounded-lg shadow">
            <Link to={`/posts/${id}`}>
                <h2 className="text-3xl">{title}</h2>
            </Link>
            <div className="mt-4">{content}</div>
            <div className="flex justify-between">
                <div>
                    <span className="mt-3 italic">{formatDistanceToNow(new Date(created), { addSuffix: true })}</span>{' '}
                    <Link to={`/users/${author}`}>
                        <span>by {author}</span>
                    </Link>
                </div>
                <div className="flex items-center">
                    <span>{likes}</span>
                    <button
                        type="button"
                        aria-label="like"
                        onClick={() => {
                            dispatch(postsSlice.actions.likePost({ id }))
                        }}
                    >
                        <Icon size="24px" path={mdiHeart} className="hover:text-red-500 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostPreview
