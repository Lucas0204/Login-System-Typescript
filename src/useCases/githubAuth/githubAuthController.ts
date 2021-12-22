import { Request, Response } from 'express'
import { GithubAuthService } from './githubAuthService'

class AuthenticateUserByGithub {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { code } = req.body
        const githubAuthService = new GithubAuthService()

        try {
            const user = await githubAuthService.execute(code)
            return res.json(user)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { AuthenticateUserByGithub }
