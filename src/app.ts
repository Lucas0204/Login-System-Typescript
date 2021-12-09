import 'dotenv/config'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.json({
            status: 'Error!',
            error: err.message
        })
    }

    return res.json({
        code: '500',
        error: 'Internal server error!'
    })
})

export { app }
