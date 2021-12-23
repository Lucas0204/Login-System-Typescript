import { User } from '../../entities/User'
import axios from 'axios'

interface GithubUserData {
    email: string;
    name: string;
    id: number;
}

interface EmailData {
    email: string;
    primary: boolean;
    verified: boolean;
}

class GithubAuthService {
    private access_token: string;
    private code: string;

    constructor(code: string) {
        if (!code) {
            throw new Error('The code from github must be provided!')
        }

        this.code = code
    }

    async execute() {
        const access_token = await this.getAccessToken()
        this.access_token = access_token

        const githubUser = await this.getUserFromGithub()

        const user = await this.findOrCreateUser(githubUser)

        return user
    }

    private async getAccessToken() {
        const url = 'https://github.com/login/oauth/access_token'

        try {
            const { data } = await axios.post(url, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: this.code
                },
                headers: {
                    'Accept': 'application/json'
                }
            })

            return data.access_token
        } catch(err) {
            throw new Error('Failed to get access token!')
        }
    }

    private async getUserFromGithub() {
        try {
            const { data: githubUser } = await axios.get<GithubUserData>('https://api.github.com/user', {
                headers: {
                    authorization: `Bearer ${this.access_token}`
                }
            })
    
            return githubUser
        } catch(err) {
            throw new Error('Failed to get user from Github!')
        }
    }

    private async findOrCreateUser({ id, name, email }: GithubUserData) {
        const currentUser = await User.findByGithubId(id)

        if (!currentUser) {
            const userEmail = email ? email : await this.getUserEmail()

            const user = await User.createFromGithub({
                email: userEmail,
                name,
                github_id: id
            })

            return user
        }

        return currentUser
    }

    private async getUserEmail() {
        try {
            const { data: emails } = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    authorization: `Bearer ${this.access_token}`
                }
            })

            const { email } = emails.filter((email: EmailData) => email.primary)[0] as EmailData

            return email
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { GithubAuthService }
