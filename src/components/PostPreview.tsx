import { formatDistanceToNow } from 'date-fns'
import { DefaultRootState } from 'react-redux'
import React from 'react'

type ComponentProps = DefaultRootState['posts']['posts'][number]

const PostPreview: React.FC<ComponentProps> = ({ title, content, created }) => (
    <div className="px-4 py-3 bg-white border-gray-600 rounded-lg shadow">
        <h2 className="text-3xl text-center">{title}</h2>
        {content}
        <p className="mt-3 italic">{formatDistanceToNow(new Date(created), { addSuffix: true })}</p>
    </div>
)

export default PostPreview
