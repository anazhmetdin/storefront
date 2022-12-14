import { Router } from 'express'
import ordersMW from '../../middleware/orders.mw'
import productsOrdersMW from '../../middleware/orders_products.mw'
import usersMW from '../../middleware/users.mw'

export const ordersRouter = Router()

ordersRouter.get(
    '/orders/:id',
    usersMW.authenticate,
    ordersMW.index
)

ordersRouter.post(
    '/orders/:id',
    usersMW.authenticate,
    productsOrdersMW.create
)
