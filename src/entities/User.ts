import { prisma } from '../database'

interface UserData {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

interface DataToUpdate {
    name?: string;
    email?: string;
    password?: string;
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

    static async update(id: string, data: DataToUpdate) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data
            })

            return updatedUser
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

    static async findByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }

    static async findById(id: string) {
        try {
            const user = await prisma.user.findFirst({
                where: { id }
            })

            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }

    static async getAll() {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch(err) {
            throw new Error(err.message)
        }
    }

    id: string;
    name: string;
    email: string;
    password: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;
}

export { User }
