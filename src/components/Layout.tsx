import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navbar: React.FC = () => (
    <div className="flex items-center justify-between w-full h-12 p-4 text-white bg-cyan-700">
        <div />
        <div />
        <Link to="/newPost" className="">
            New post
        </Link>
    </div>
)

const Layout: React.FC = () => (
    <>
        <Navbar />
        <Outlet />
    </>
)

export default Layout
