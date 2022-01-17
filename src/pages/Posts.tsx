import { mdiRefresh } from '@mdi/js'
import Icon from '@mdi/react'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import PostPreview from '../components/PostPreview'
import { useGetPostsQuery } from '../redux/apiSlice'

const Posts: React.FC = () => {
    const { data: posts = [], isLoading, isFetching, error, refetch } = useGetPostsQuery()

    const orderedPosts = useMemo(() => [...posts].sort((a, b) => b.created.localeCompare(a.created)), [posts])

    if (isLoading) return <span>Loading...</span>
    if (error) return <span className="whitespace-pre">Error: {JSON.stringify(error, undefined, 4)}</span>

    return (
        <section>
            <h2 className="text-4xl">
                Posts{' '}
                <button type="button" title="Refresh posts" onClick={refetch}>
                    <Icon size="36px" className="inline-block" path={mdiRefresh} />
                </button>
            </h2>
            <div
                className={classNames('', {
                    'opacity-60': isFetching,
                })}
            >
                {orderedPosts.map(post => (
                    <PostPreview key={post.id} {...{ post }} />
                ))}
            </div>
        </section>
    )
}

export default Posts
