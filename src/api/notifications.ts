import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import randomItem from 'random-item'
import { getPosts } from './posts'

export const getNotifications = () => {
    const posts = getPosts()

    const pastDate = new Date()
    pastDate.setMinutes(pastDate.getMinutes() - 15)

    return Array.from({ length: 3 }, () => {
        const post = randomItem(posts)
        const userActions = ['liked', 'removed', "didn't like", 'shared', 'reposted', 'created']
        const message = `${faker.internet.userName()} ${randomItem(userActions)} ${post.title}`

        return {
            id: nanoid(),
            isRead: faker.datatype.boolean(),
            date: faker.date.between(pastDate, new Date()).toISOString(),
            linkedPostId: post.id,
            message,
            postLinkRange: [message.length - post.title.length, message.length] as [number, number],
        }
    })
}
