import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({
            error: 'Unauthorized!'
        })
    }

    const token = authToken.split(' ')[1]

    try {
        const { sub } = verify(token, process.env.JWT_SECRET)
        req.user_id = sub.toString()

        return next()
    } catch(err) {
        return res.status(400).json({
            error: err.message
        })
    }
}
