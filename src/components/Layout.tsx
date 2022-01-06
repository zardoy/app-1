import React from 'react'
import { Outlet } from 'react-router-dom'

const Navbar: React.FC = () => {
    return <div className="w-full bg-cyan-700 h-6"></div>
}

const Layout: React.FC = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout
