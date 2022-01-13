import delay from 'delay'
import randomItem from 'random-item'
import { db, Post, PostDb } from '.'

// TODO!
const serializePost = (post: PostDb): Post => ({ ...post, author: post.author!.username })

export const getPosts = () => db.post.getAll().map(serializePost)

export const fetchPosts = async () =>
    // await delay(500)
    getPosts()

export const addPost = async (data: Record<'title' | 'content', string>): Promise<Post> => {
    await delay(1000)
    // show result without serializePost
    return serializePost(
        db.post.create({
            ...data,
            author: randomItem(db.user.getAll()),
            created: new Date().toISOString(),
            likes: 0,
        }),
    )
}
