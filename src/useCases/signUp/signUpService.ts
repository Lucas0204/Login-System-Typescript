import { User } from '../../entities/User'
import { hashSync } from 'bcryptjs'

interface SignUpData {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class SignUpService {
    private signUpData: SignUpData;
    constructor(data: SignUpData) {
        this.signUpData = data
    }

    async execute() {
        await this.validateData()

        const user = await this.createUser()
        user.password = undefined

        return user;
    }

    private async validateData() {
        const { name, email, password } = this.signUpData

        if (!name || !email || !password) {
            throw new Error('There is some field empty! Please, check and try again.')
        }

        const userAlreadyExists = await User.exists(email)

        if (userAlreadyExists) {
            throw new Error('User is already exists!')
        }
    }

    private async createUser() {
        const { password } = this.signUpData
        const passwordHash = hashSync(password)

        try {
            const user = await User.create({
                ...this.signUpData,
                password: passwordHash
            })
    
            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { SignUpService }
