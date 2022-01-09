import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'
import { fetchNotifications, notificationSlice, selectAllNotifications } from '../redux/notifications/slice'
import { useAppDispatch } from '../redux/store'

const NotificationsList: React.FC = () => {
    const notifications = useSelector(selectAllNotifications)
    const dispatch = useAppDispatch()
    const content =
        notifications.length > 0 ? (
            notifications.map(({ date, id, message, isRead }) => (
                <div
                    key={id}
                    className={classNames({
                        border: true,
                        'bg-white cursor-pointer': !isRead,
                        'bg-gray-200': isRead,
                    })}
                    onClick={() => {
                        dispatch(notificationSlice.actions.readNotification({ id }))
                    }}
                >
                    {message}
                    <p className="mt-3 italic">{formatDistanceToNow(new Date(date), { addSuffix: true })}</p>
                </div>
            ))
        ) : (
            <p className="text-muted">(there is currently no notifications)</p>
        )

    return (
        <section className="flex flex-col items-center mx-auto">
            <div className="w-max grid max-w-6xl">{content}</div>
            <div className="mt-5">
                <button
                    type="button"
                    className="btn text-white bg-red-500"
                    onClick={async () => {
                        await dispatch(fetchNotifications()).unwrap()
                    }}
                >
                    Push notifications
                </button>
                <button
                    type="button"
                    className="btn text-white bg-red-700"
                    onClick={async () => {
                        dispatch(notificationSlice.actions.readAllNotifications())
                    }}
                >
                    Read all notifications
                </button>
            </div>
        </section>
    )
}

export default NotificationsList
