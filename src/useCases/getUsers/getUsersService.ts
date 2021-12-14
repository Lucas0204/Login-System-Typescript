import { User } from '../../entities/User'

class GetUsersService {
    async execute() {
        const users = await this.getUsers()

        const usersWithoutPassword = users.map(user => {
            return {
                ...user,
                password: undefined
            }
        })

        return usersWithoutPassword
    }

    private async getUsers() {
        try {
            const users = await User.getAll()
            return users
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { GetUsersService }
