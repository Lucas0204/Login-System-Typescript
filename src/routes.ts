import { Router } from 'express'
import { SignUpController } from './useCases/signUp/signUpController'
import { SignInController } from './useCases/signIn/signInController'
import { EditUserController } from './useCases/editUser/editUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const routes = Router()

routes.post('/signup', SignUpController.handle)

routes.post('/signin', SignInController.handle)

routes.post('/user/edit', ensureAuthenticated, EditUserController.handle)

routes.get('/users', ensureAuthenticated, ensureAdmin, )

export { routes }
