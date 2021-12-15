import { User } from '../../entities/User'

class DeleteUserSerivce {
    async execute(id: string) {
        await this.validateUser(id)

        const deletedUser = await this.deleteUser(id)

        deletedUser.password = undefined

        return deletedUser
    }

    private async validateUser(id: string) {
        const userExists = !!await User.findById(id)

        if (!userExists) {
            throw new Error('User is not found!')
        }
    }

    private async deleteUser(id: string) {
        try {
            const deletedUser = await User.delete(id)
            return deletedUser
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { DeleteUserSerivce }
