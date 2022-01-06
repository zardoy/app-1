import faker from 'faker'
import { sub } from 'date-fns'
import delay from 'delay'

export const getPosts = async () => {
    await delay(1500)
    return Array.from({ length: 3 }, (_, i) => ({
        id: i.toString(),
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        created: sub(new Date(), { hours: (5 - i) * 3 }).toISOString(),
    }))
}
