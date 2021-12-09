import { prisma } from '../database'

interface UserData {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class User {
    static async create({ name, email, password, admin }: UserData) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                admin
            }
        })

        return user
    }

    static async exists(email: string) {
        const exists = await prisma.user.findFirst({
            where: { email }
        })

        return !!exists
    }
}

export { User }
