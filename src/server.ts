import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {usersRouter} from './api/users/users.api'
import {productsRouter} from './api/products/products.api'
import {ordersRouter} from './api/orders/orders.api'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.use('/api', usersRouter)
app.use('/api', productsRouter)
app.use('/api', ordersRouter)
app.use('/api', ordersRouter)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
