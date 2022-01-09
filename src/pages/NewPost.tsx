import React, { useCallback, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../redux/posts/slice'
import { useAppDispatch } from '../redux/store'

const NewPost: React.FC = () => {
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch()
    const [isInProgress, setIsInProgress] = useState(false)
    const canAddPost = !isInProgress && [content].every(Boolean)
    const navigate = useNavigate()
    const addPostCallback = useCallback(async () => {
        setIsInProgress(true)
        await dispatch(addPost({ content, title: 'New Post' }))
            .unwrap()
            .finally(() => {
                setIsInProgress(false)
            })
            .catch(console.error)
        navigate('/posts')
    }, [content, dispatch, navigate])

    return (
        <div>
            <h1 className="text-4xl text-center">New Post</h1>
            <div className="flex flex-col items-center max-w-6xl mx-auto mt-4">
                <Editor
                    options={{ minimap: { enabled: false }, readOnly: isInProgress }}
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
