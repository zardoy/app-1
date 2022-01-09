import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import { Post } from '../redux/posts/slice'

export const getNotifications = (posts: Post[]) => {
    const pastDate = new Date()
    pastDate.setMinutes(pastDate.getMinutes() - 15)

    return Array.from({ length: 3 }, () => {
        const post = posts[faker.datatype.number(posts.length - 1)]!
        const userActions = ['liked', 'removed', "didn't like", 'shared', 'reposted', 'created']
        const message = `${faker.internet.userName()} ${userActions[faker.datatype.number(userActions.length - 1)]!} ${post.title}`

        return {
            id: nanoid(),
            isRead: faker.datatype.boolean(),
            date: faker.date.between(pastDate, new Date()).toISOString(),
            linkedPostId: post.id,
            message,
        }
    })
}
