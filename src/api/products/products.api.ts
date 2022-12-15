import { Router } from 'express'
import productsMW from '../../middleware/products.mw'
import usersMW from '../../middleware/users.mw'

export const productsRouter = Router()

productsRouter.get(
    '/products',
    productsMW.index
)

productsRouter.post(
    '/products',
    usersMW.authenticate,
    productsMW.create
)

productsRouter.get(
    '/products/:id',
    productsMW.show
)
