import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useDispatch } from 'react-redux'
import { postsSlice } from '../redux/posts/slice'

const NewPost: React.FC = () => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    return (
        <div>
            <h1 className="text-center">New Post</h1>
            <Editor defaultLanguage="markdown" height="50vh" onChange={value => setContent(value ?? '')} />
            <button type="button" onClick={() => dispatch(postsSlice.actions.addPost('Next pos', content))}>
                Add
            </button>
        </div>
    )
}

export default NewPost
