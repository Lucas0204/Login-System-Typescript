import { Router } from 'express'
import { SignUpController } from './useCases/signUp/signUpController'
import { SignInController } from './useCases/signIn/signInController'
import { EditUserController } from './useCases/editUser/editUserController'
import { GetUsersController } from './useCases/getUsers/getUsersController'
import { GetOneUserController } from './useCases/getOneUser/getOneUserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const routes = Router()

routes.post('/signup', SignUpController.handle)

routes.post('/signin', SignInController.handle)

routes.post('/user/edit', ensureAuthenticated, EditUserController.handle)

routes.get('/users', ensureAuthenticated, ensureAdmin, GetUsersController.handle)

routes.get('/user/:id', ensureAuthenticated, ensureAdmin, GetOneUserController.handle)

export { routes }
