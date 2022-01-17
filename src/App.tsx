import { Provider } from 'react-redux'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import store from './redux/store'
import Posts from './pages/Posts'
import Layout from './components/Layout'
import Post from './pages/Post'
import PostsLayout from './components/PostsLayout'
import NewPost from './pages/NewPost'
import NotificationsList from './pages/NotificationsList'
import Users from './pages/Users'
import User from './pages/User'
import { extendedApiSlice } from './redux/users/slice'

void store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

const App: React.FC = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="posts" element={<PostsLayout />}>
                        <Route index element={<Posts />} />
                        <Route path=":postId" element={<Post />} />
                    </Route>
                    <Route path="newPost" element={<NewPost />} />
                    <Route path="notifications" element={<NotificationsList />} />
                    <Route path="users">
                        <Route index element={<Users />} />
                        <Route path=":username" element={<User />} />
                    </Route>
                    <Route path="/" element={<Navigate to="posts" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)

export default App
