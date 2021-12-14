import { User } from '../../entities/User'

class GetOneUserService {
    async execute(id: string) {
        const user = await this.getUser(id)

        if (!user) {
            throw new Error('User is not found! Check the id and try again!')
        }

        user.password = undefined
        return user
    }

    private async getUser(id: string) {
        try {
            const user = await User.findById(id)
            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { GetOneUserService }
