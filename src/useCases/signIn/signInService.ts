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
        await this.validateData()

        const user = await this.getUser()

        if (!this.passwordMatch(user.password)) {
            throw new Error('Email / Password does not match!')
        }

        const token = this.generateToken(user)

        return token
    }

    private async validateData() {
        const { email, password } = this.signInData

        if (!email || !password) {
            throw new Error('There is some field empty! Please, check and try again.')
        }

        const userExists = await User.exists(email)

        if (!userExists) {
            throw new Error('Email / Password does not match!')
        }
    }

    private async getUser() {
        const { email } = this.signInData
        const user = await User.findByEmail(email)
  
        return user
    }

    private passwordMatch(userPassword: string) {
        const { password } = this.signInData
        const passwordMatch = compareSync(password, userPassword)

        return passwordMatch
    }

    private generateToken(user: User) {
        const token = sign({
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}

export { SignInService }
