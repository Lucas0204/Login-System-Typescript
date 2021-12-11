import { Router } from 'express'
import { SignUpController } from './useCases/signUp/signUpController'
import { SignInController } from './useCases/signIn/signInController'

const routes = Router()

routes.post('/signup', SignUpController.handle)

routes.post('/signin', SignInController.handle)

export { routes }
