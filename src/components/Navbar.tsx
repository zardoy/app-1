import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarLink: React.FC<{ to: string }> = ({ to, children }) => (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
        {children}
    </NavLink>
)
export const Navbar: React.FC = () => (
    <div className="flex items-center justify-between w-full h-12 p-4 text-white bg-cyan-700">
        <div className="space-x-2">
            <NavbarLink to="/posts">Posts</NavbarLink>
            <NavbarLink to="/newPost">New post</NavbarLink>
            <NavbarLink to="/notifications">Notifications</NavbarLink>
        </div>
        <div />
        <div />
    </div>
)
