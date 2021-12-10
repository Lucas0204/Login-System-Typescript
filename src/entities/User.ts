import { prisma } from '../database'

interface UserData {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class User {
    static async create(data: UserData) {
        try {
            const user = await prisma.user.create({
                data
            })

            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }

    static async exists(email: string) {
        try {
            const exists = await prisma.user.findFirst({
                where: { email }
            })

            return !!exists
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { User }
