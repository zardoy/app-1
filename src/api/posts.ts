import randomItem from 'random-item'
import { db, Post, PostDb } from '.'

const serializePost = (post: PostDb): Post => ({ ...post, author: post.author!.username })

export const getPosts = () => db.post.getAll().map(serializePost)

export type PostInputData = Record<'title' | 'content', string>

export const postsInternalApi = {
    async getAll() {
        return getPosts()
    },
    async get(postId: string) {
        const post = db.post.findFirst({
            where: {
                id: {
                    equals: postId,
                },
            },
        })
        return post && serializePost(post)
    },
    async add(data: PostInputData): Promise<Post> {
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
