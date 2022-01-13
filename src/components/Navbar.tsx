import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../redux/notifications/slice'
import { useAppDispatch } from '../redux/store'

const NavbarLink: React.FC<{ to: string } & React.ComponentProps<typeof NavLink>> = ({ to, children, className, ...props }) => (
    <NavLink to={to} className={({ isActive }) => classNames(className, { 'font-bold': isActive })} {...props}>
        {children}
    </NavLink>
)

export const Navbar: React.FC = () => {
    const notifications = useSelector(selectAllNotifications)
    const unreadNotificationsCount = notifications.filter(({ isRead }) => !isRead).length
    const dispatch = useAppDispatch()

    return (
        <div className="bg-cyan-700 flex items-center justify-between w-full h-12 p-4 text-white">
            <div className="space-x-2">
                <NavbarLink to="/posts">Posts</NavbarLink>
                <NavbarLink to="/users">Users</NavbarLink>
                <NavbarLink to="/newPost">New post</NavbarLink>
                <NavbarLink to="/notifications">Notifications ({unreadNotificationsCount})</NavbarLink>
            </div>
            <div />
            <div>
                <button
                    type="button"
                    onClick={async () => {
                        await dispatch(fetchNotifications()).unwrap()
                    }}
                >
                    Push Notifications
                </button>
            </div>
        </div>
    )
}
