import { Request, Response } from 'express'

class GithubSignCallback {
    static handle(req: Request, res: Response) {
        const { code } = req.query

        res.redirect(`/github_auth/${code}`)
    }
}

export { GithubSignCallback }
