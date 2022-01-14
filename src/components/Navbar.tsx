import React from 'react'
import { useSelector } from 'react-redux'
import { fetchNotifications, selectAllNotifications } from '../redux/notifications/slice'
import { useAppDispatch } from '../redux/store'
import { NavbarLinks } from './NavbarLinks'

export const Navbar: React.FC = () => {
    const notifications = useSelector(selectAllNotifications)
    const unreadNotificationsCount = notifications.filter(({ isRead }) => !isRead).length
    const dispatch = useAppDispatch()

    return (
        <div className="bg-cyan-700 flex items-center justify-between w-full h-12 p-4 text-white">
            <div className="space-x-2">
                <NavbarLinks links={['/posts', '/users', '/newPost', ['/notifications', `Notifications ${unreadNotificationsCount}`]]} />
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
