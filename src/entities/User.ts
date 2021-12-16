import { prisma } from '../database'

interface UserData {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

interface UpdateParams {
    where: { id?: string; email?: string; }
    data: DataToUpdate;
}

interface DataToUpdate {
    name?: string;
    email?: string;
    password?: string;
    password_reset_token?: string;
    password_reset_expires?: Date;
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

    static async update(params: UpdateParams) {
        const { data } = params
        const { id, email } = params.where
        const where = id ? { id } : { email }

        try {
            const updatedUser = await prisma.user.update({
                where,
                data
            })

            return updatedUser
        } catch(err) {
            throw new Error(err.message)
        }
    }

    static async delete(id: string) {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id }
            })

            return deletedUser
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
    password_reset_token: string;
    password_reset_expires: Date;
}

export { User }
