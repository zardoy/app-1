import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PageContent from '../components/PageContent'
import { useAppDispatch } from '../redux/store'
import { selectAllUsers } from '../redux/users/slice'

const Users: React.FC = () => {
    const users = useSelector(selectAllUsers)
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <PageContent>
            {isLoading ? (
                'Loading'
            ) : (
                <div className="w-max grid max-w-6xl">
                    {users.map(({ firstName, lastName, username }) => (
                        <div key={username} className="flex justify-between">
                            <Link to={username} className="hover:no-underline text-blue-500 underline">
                                {username}
                            </Link>
                            <span className="text-muted">
                                {firstName} {lastName}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </PageContent>
    )
}

export default Users
