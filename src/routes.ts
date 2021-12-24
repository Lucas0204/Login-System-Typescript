import { Router } from 'express'

import { SignUpController } from './useCases/signUp/signUpController'
import { SignInController } from './useCases/signIn/signInController'
import { EditUserController } from './useCases/editUser/editUserController'
import { GetUsersController } from './useCases/getUsers/getUsersController'
import { GetOneUserController } from './useCases/getOneUser/getOneUserController'
import { DeleteUserController } from './useCases/deleteUser/deleteUserController'
import { ForgotPasswordController } from './useCases/recoverPassword/forgotPassword/forgotPasswordController'
import { ResetPasswordController } from './useCases/recoverPassword/resetPassword/resetPasswordController'

import { GithubAuthController } from './useCases/githubAccess/githubAccessController'
import { GithubSignCallback } from './useCases/githubAccess/githubSignCallback'
import { AuthenticateUserByGithub } from './useCases/githubAuth/githubAuthController'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const routes = Router()


routes.get('/github', GithubAuthController.handle)
routes.get('/signin/callback', GithubSignCallback.handle)


routes.post('/github_auth/:code', AuthenticateUserByGithub.handle)


routes.post('/signup', SignUpController.handle)

routes.post('/signin', SignInController.handle)

routes.post('/user/edit', ensureAuthenticated, EditUserController.handle)

routes.post('/forgot_password', ForgotPasswordController.handle)

routes.post('/reset_password', ResetPasswordController.handle)

routes.get('/users', ensureAuthenticated, ensureAdmin, GetUsersController.handle)

routes.get('/user/:id', ensureAuthenticated, ensureAdmin, GetOneUserController.handle)

routes.delete('/user/:id', ensureAuthenticated, ensureAdmin, DeleteUserController.handle)


export { routes }
