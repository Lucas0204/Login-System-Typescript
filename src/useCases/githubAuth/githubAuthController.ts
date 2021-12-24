import { Request, Response } from 'express'
import { GithubAuthService } from './githubAuthService'

class AuthenticateUserByGithub {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { code } = req.params
        
        try {
            const githubAuthService = new GithubAuthService(code)
            const user = await githubAuthService.execute()
            return res.json(user)
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { AuthenticateUserByGithub }
