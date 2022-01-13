import { db } from '.'

export const fetchUsers = async () =>
    // await delay(500)
    db.user.getAll()
