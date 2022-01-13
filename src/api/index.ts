import { Except, Simplify } from 'type-fest'
import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import faker from 'faker'
import { range } from 'rambda'

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
