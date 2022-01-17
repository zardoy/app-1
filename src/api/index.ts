import { Except, Simplify } from 'type-fest'
import { rest, setupWorker } from 'msw'
import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import faker from 'faker'
import { range } from 'rambda'
import delay from 'delay'
import { postsInternalApi } from './posts'
import { usersInternalApi } from './users'
import { notificationsInternalApi } from './notifications'

const USERS_COUNT = 5
const POSTS_PER_USER = 3

export const db = factory({
    user: {
        id: primaryKey(nanoid),
        username: String,
        firstName: String,
        lastName: String,
        posts: manyOf('post'),
    },
    post: {
        id: primaryKey(nanoid),
        title: String,
        content: String,
        created: Date,
        likes: Number,
        author: oneOf('user'),
    },
})

export type PostDb = ReturnType<typeof db.post.getAll>[number]
export type Post = Except<PostDb, 'author'> & { author: string }
export type User = Simplify<Except<ReturnType<typeof db.user.getAll>[number], 'posts'>>

// #region SEED FAKER
let seed = +localStorage.getItem('seed')!
if (!seed) localStorage.setItem('seed', (seed = Date.now()).toString())
faker.seed(seed)
// #endregion

// #region SEED DB WITH DATA
for (const i of range(0, USERS_COUNT)) {
    const author = db.user.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName().replaceAll('.', '_'),
    })

    for (const k of range(0, POSTS_PER_USER))
        db.post.create({
            title: faker.lorem.words(),
            content: faker.lorem.paragraphs(),
            // ignores seed
            created: sub(new Date(), { hours: (5 - i) * 3 }).toISOString(),
            author,
            likes: faker.datatype.number(100),
        })
}
// #endregion

// #region Define API
const delays = {
    default: 500,
    add: 1500,
}

// todo make type to ensure all methods are async
const internalApi = {
    posts: postsInternalApi,
    users: usersInternalApi,
    notifications: notificationsInternalApi,
}
const api = Object.fromEntries(
    Object.entries(internalApi).map(([key, internalApi]) => [
        key,
        new Proxy(internalApi, {
            get(target, prop) {
                return async (...args) => {
                    // don't get bothered in dev
                    if (!import.meta.env.DEV || localStorage.getItem('PROD')) await delay(delays[prop] ?? delays.default)
                    return target[prop](...args)
                }
            },
        }),
    ]),
) as typeof internalApi
// #endregion

const worker = setupWorker(
    rest.get('/fakeApi/posts', async (_req, res, ctx) => res(ctx.json(await api.posts.getAll()))),
    rest.post('/fakeApi/posts', async (req, res, ctx) => {
        const data = req.body as any
        if (data.content === 'error') return res(ctx.delay(500), ctx.status(500), ctx.json('Server error saving this post!'))
        return res(ctx.json(await api.posts.add(data)))
    }),
    rest.patch('/fakeApi/posts/:postId', async (req, res, ctx) => {
        const data = req.body as any
        db.post.update({
            where: {
                id: {
                    equals: req.params.postId as string,
                },
            },
            data: {
                content: data.content,
            },
        })
        return res()
    }),
    rest.get('/fakeApi/posts/:postId', async (req, res, ctx) => res(ctx.json(await api.posts.get(req.params.postId as string)) as any)),
    rest.get('/fakeApi/users', async (req, res, ctx) => res(ctx.json(await api.users.getAll()))),
    rest.get('/fakeApi/notifications', async (req, res, ctx) => res(ctx.json(await api.notifications.refresh()))),
)

// thats where we take advantage of ESM
await worker.start()
