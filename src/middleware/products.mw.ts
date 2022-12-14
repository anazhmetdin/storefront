import express from 'express'
import { Product, ProductVendor } from '../models/products'

const productVendor = new ProductVendor();

const create = async (req: express.Request, res: express.Response) => {
    const product: Product = {
        id: -1,
        name: req.body.name,
        price: req.body.price
    }
    try {
        const newProduct = await productVendor.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400).send(err);
    }
}

const index = async (req: express.Request, res: express.Response) => {
    try {
        const productIndex = await productVendor.index();
        res.json(productIndex)
    } catch (error) {
        res.status(401).send(error)
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const user = await productVendor.show(parseInt(req.params.id))
        res.json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}

export default {create, index, show}