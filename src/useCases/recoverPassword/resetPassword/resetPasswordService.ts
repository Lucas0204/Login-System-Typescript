import { User } from '../../../entities/User'
import { hashSync } from 'bcryptjs'

interface ResetPasswordData {
    email: string;
    token: string;
    newPassword: string;
}

class ResetPasswordService {
    private email: string;
    private token: string;
    private newPassword: string;
    constructor({ email, token, newPassword }: ResetPasswordData) {
        this.email = email
        this.token = token
        this.newPassword = newPassword
    }

    async execute() {
        await this.validateData()

        const user = await this.getUser()
        this.verifyIfTokenIsValid(user)

        await this.resetPassword()
    }

    private async validateData() {
        if (!this.email || !this.token || !this.newPassword) {
            throw new Error('Some data is missing! Check, and try again!')
        }

        const userExists = await User.exists(this.email)

        if (!userExists) {
            throw new Error('User is not found!')
        }
    }

    private async getUser() {
        try {
            const user = await User.findByEmail(this.email)
            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }

    private verifyIfTokenIsValid(user: User) {
        const { 
            password_reset_token: userToken, 
            password_reset_expires: expirationTime 
        } = user

        if (this.token !== userToken) {
            throw new Error('The token does not match!')
        }

        const now = new Date()

        if (now > expirationTime) {
            throw new Error('The token has expired! Generate a new one!')
        }
    }

    private async resetPassword() {
        const passwordHash = hashSync(this.newPassword)

        try {
            await User.update({
                where: { email: this.email },
                data: {
                    password: passwordHash
                }
            })
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { ResetPasswordService }
