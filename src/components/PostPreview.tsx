import { formatDistance } from 'date-fns'
import { DefaultRootState } from 'react-redux'
import React from 'react'

type ComponentProps = DefaultRootState['posts'][number]

const PostPreview: React.FC<ComponentProps> = ({ title, content, created }) => {
    return (
        <div className="px-4 py-3 bg-white border-gray-600 rounded-lg shadow">
            <h2 className="text-3xl text-center">{title}</h2>
            {content}
            <br />
            Created: {formatDistance(new Date(created), new Date(), { addSuffix: true })}
        </div>
    )
}

export default PostPreview
