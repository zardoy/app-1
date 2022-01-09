import faker from 'faker'
import { sub } from 'date-fns'
import delay from 'delay'
import { nanoid } from '@reduxjs/toolkit'

export const getPosts = async () => {
    await delay(1500)
    return Array.from({ length: 3 }, (_, i) => ({
        id: i.toString(),
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        created: sub(new Date(), { hours: (5 - i) * 3 }).toISOString(),
    }))
}

export const addPost = async (data: Record<'title' | 'content', string>) => {
    await delay(1500)
    return {
        ...data,
        id: nanoid(),
        created: new Date().toISOString(),
    }
}
