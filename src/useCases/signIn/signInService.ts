import { User } from '../../entities/User'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface SignInData {
    email: string;
    password: string;
}

class SignInService {
    private signInData: SignInData;
    constructor(data: SignInData) {
        this.signInData = data
    }

    async execute() {
        this.validateData()


    }

    private async validateData() {
        const { email, password } = this.signInData

        if (!email || !password) {
            throw new Error('There is some field empty! Please, check and try again.')
        }

        const userExists = await User.exists(email)

        if (!userExists) {
            throw new Error('User is not found!')
        }
    }
}

export { SignInService }
