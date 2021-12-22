import { Request, Response } from 'express'

class GithubSignCallback {
    static handle(req: Request, res: Response) {
        const { code } = req.query

        res.json({ code })
    }
}

export { GithubSignCallback }
