import { Request, Response } from 'express'

class GithubAuthController {
    static handle(req: Request, res: Response) {
        const clientId = process.env.GITHUB_CLIENT_ID

        res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
    }
}

export { GithubAuthController }
