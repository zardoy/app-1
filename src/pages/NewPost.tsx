import React, { useCallback, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { apiSlice, useAddPostMutation, useGetPostsQuery } from '../redux/apiSlice'

const NewPost: React.FC = () => {
    const [content, setContent] = useState('')
    const [addNewPost, { isLoading }] = useAddPostMutation()
    const canAddPost = !isLoading && [content].every(Boolean)
    const navigate = useNavigate()
    const addPostCallback = useCallback(async () => {
        await addNewPost({ content, title: 'New Post' }).unwrap()
        navigate('/posts')
    }, [addNewPost, content, navigate])

    return (
        <div>
            <h1 className="text-4xl text-center">New Post</h1>
            <div className="flex flex-col items-center max-w-6xl mx-auto mt-4">
                <Editor
                    options={{ minimap: { enabled: false }, readOnly: isLoading }}
                    height="50vh"
                    defaultLanguage="markdown"
                    onChange={value => setContent(value ?? '')}
                />
                <button type="button" className="text-white bg-green-400 btn" disabled={!canAddPost} onClick={addPostCallback}>
                    Add Post
                </button>
            </div>
        </div>
    )
}

export default NewPost
