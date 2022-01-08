import React from 'react'
import { Outlet } from 'react-router-dom'

const Navbar: React.FC = () => <div className="w-full bg-cyan-700 h-6" />

const Layout: React.FC = () => (
        <>
            <Navbar />
            <Outlet />
        </>
    )

export default Layout
