import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/User'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req
    const user = await User.findById(user_id)

    if (!user.admin) {
        return res.status(401).json({
            error: 'Unauthorized!'
        })
    }

    return next()
}
