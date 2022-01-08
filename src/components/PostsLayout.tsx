import React from 'react'
import { Outlet } from 'react-router-dom'

const PostsLayout: React.FC = () => (
        <div className="mx-auto px-2 max-w-3xl">
            <Outlet />
        </div>
    )

export default PostsLayout
