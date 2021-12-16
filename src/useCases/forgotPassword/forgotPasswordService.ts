import { transporter } from '../../resources/mailTransporter'
import { User } from '../../entities/User'
import crypto from 'crypto'

interface IEmail {
    email: string
}

class ForgotPasswordService {
    private userEmail: string;
    constructor({ email }: IEmail) {
        this.userEmail = email
    }

    async execute() {
        await this.verifyUser()

        const user = await this.getUser()
        const { token, expires } = this.generateTokenAndExpirationTime()

        await this.addTokenAndExpiresToUserEntity(token, expires)

        await this.sendEmail(user, token)
    }

    private async verifyUser() {
        if (!this.userEmail) {
            throw new Error('Please, provide your email!')
        }

        const userExists = await User.exists(this.userEmail)

        if (!userExists) {
            throw new Error('User is not found!')
        }
    }

    private async getUser() {
        try {
            const user = await User.findByEmail(this.userEmail)
            return user
        } catch(err) {
            throw new Error(err.message)
        }
    }

    private generateTokenAndExpirationTime() {
        const token = crypto.randomBytes(20).toString('hex')

        const expires = new Date()
        expires.setHours(expires.getHours() + 1)

        return { token, expires }
    }

    private async addTokenAndExpiresToUserEntity(token: string, expiresIn: Date) {
        try {
            await User.update({
                where: { email: this.userEmail },
                data: {
                    password_reset_token: token,
                    password_reset_expires: expiresIn
                }
            })

            return
        } catch(err) {
            throw new Error(err.message)
        }
    }

    private async sendEmail(user: User, token: string) {
        await transporter.sendMail({
            from: `Sys <${process.env.MAIL_USER}>`,
            to: `${user.name} <${user.email}>`,
            subject: 'Password recovery.',
            text: `Forgot your password, use this token to set a new one: ${token}`
        })
    }
}

export { ForgotPasswordService }
