import { Router } from 'express'
import { SignUpController } from './useCases/signUp/signUpController'
import { SignInController } from './useCases/signIn/signInController'
import { EditUserController } from './useCases/editUser/editUserController'
import { GetUsersController } from './useCases/getUsers/getUsersController'
import { GetOneUserController } from './useCases/getOneUser/getOneUserController'
import { DeleteUserController } from './useCases/deleteUser/deleteUserController'
import { ForgotPasswordController } from './useCases/forgotPassword/forgotPasswordController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const routes = Router()

routes.post('/signup', SignUpController.handle)

routes.post('/signin', SignInController.handle)

routes.post('/user/edit', ensureAuthenticated, EditUserController.handle)

routes.post('/forgot_password', ForgotPasswordController.handle)

routes.get('/users', ensureAuthenticated, ensureAdmin, GetUsersController.handle)

routes.get('/user/:id', ensureAuthenticated, ensureAdmin, GetOneUserController.handle)

routes.delete('/user/:id', ensureAuthenticated, ensureAdmin, DeleteUserController.handle)


export { routes }
