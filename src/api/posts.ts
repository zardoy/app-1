import randomItem from 'random-item'
import { db, Post, PostDb } from '.'

// TODO!
const serializePost = (post: PostDb): Post => ({ ...post, author: post.author!.username })

export const getPosts = () => db.post.getAll().map(serializePost)

export const postsInternalApi = {
    async getAll() {
        return getPosts()
    },
    async add(data: Record<'title' | 'content', string>): Promise<Post> {
        return serializePost(
            db.post.create({
                ...data,
                author: randomItem(db.user.getAll()),
                created: new Date().toISOString(),
                likes: 0,
            }),
        )
    },
}
