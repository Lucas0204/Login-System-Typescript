import { Request, Response } from 'express'
import { ResetPasswordService } from './resetPasswordService'

class ResetPasswordController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const resetPasswordService = new ResetPasswordService(req.body)

        try {
            await resetPasswordService.execute()
            return res.json({
                status: 'Ok!',
                message: 'Password reset successfully!'
            })
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
}

export { ResetPasswordController }
