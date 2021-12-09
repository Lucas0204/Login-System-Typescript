import { Router } from 'express'
import { SignUpController } from './useCases/signUp/signUpController'

const routes = Router()

routes.post('/signup', SignUpController.handle)

export { routes }
