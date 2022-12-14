import { Router } from 'express'
import usersMW from '../../middleware/users.mw'

export const usersRouter = Router()

usersRouter.get(
    '/users',
    usersMW.authenticate,
    usersMW.index
)

usersRouter.post(
    '/users',
    usersMW.create
)

usersRouter.get(
    '/users/:id',
    usersMW.authenticate,
    usersMW.show
)
