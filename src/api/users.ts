import { db } from '.'

export const usersInternalApi = {
    async getAll() {
        return db.user.getAll()
    },
}
