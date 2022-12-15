import express from 'express'
import jwt from 'jsonwebtoken'
import { Order } from '../models/orders'
import { OrdersProducts, OrderProductDetails, OrderProductList } from '../models/orders_products'

const orderProductList = new OrderProductList();

const create = async (req: express.Request, res: express.Response) => {
    const user_id = parseInt(req.params.id);

    try {
        const authorizationHeader = req.headers.authorization
        const decoded = jwt.verify(authorizationHeader as string, process.env.BCRYPT_PASSWORD as jwt.Secret) as jwt.JwtPayload
        
        if(decoded.user.id !== user_id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401).send(err)
        return
    }

    const order: Order = {
        id: -1,
        user_id: user_id,
        active: true
    };
    
    const ordersProducts: OrdersProducts = {
        order: order,
        products: req.body.products as OrderProductDetails[]
    }

    try {
        const newOrder = await orderProductList.create(ordersProducts)
        res.json(newOrder)
    } catch(err) {
        res.status(400).send(err);
    }
}

export default {create}