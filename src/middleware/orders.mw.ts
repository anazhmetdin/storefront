import express from 'express'
import { OrderList } from '../models/orders'

const orderList = new OrderList();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const productIndex = await orderList.index(parseInt(req.params.id));
        res.json(productIndex)
    } catch (error) {
        res.status(401).send(error)
    }
}

export default {index}