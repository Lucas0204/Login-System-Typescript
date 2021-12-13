import { User } from '../../entities/User'
import { hashSync } from 'bcryptjs'

interface DataToBeUpdated {
    name?: string;
    email?: string;
    password?: string;
}

class EditUserService {
    private dataToBeUpdated: DataToBeUpdated;
    constructor({ name, email, password }: DataToBeUpdated) {
        this.dataToBeUpdated = {
            name,
            email,
            password
        }
    }

    async execute(id: string) {
        this.validateData()

        const updateData = this.getWhatWillBeUpdated()

        const updatedUser = await this.updateUser(id, updateData)
        updatedUser.password = undefined

        return updatedUser
    }

    private validateData() {
        const { name, email, password } = this.dataToBeUpdated

        if (!name && !email && !password) {
            throw new Error('You must provide some data!')
        }
    }

    private getWhatWillBeUpdated() {
        const { name, email, password } = this.dataToBeUpdated
        let updateData: { [key: string]: any } = {}

        if (name) updateData.name = name

        if (email) updateData.email = email

        if (password) updateData.password = hashSync(password)

        return updateData
    }

    private async updateUser(id: string, data: { [key: string]: any }) {
        try {
            const updatedUser = await User.update(id, data)
            return updatedUser
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { EditUserService }
