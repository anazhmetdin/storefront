// @ts-ignore
import Client from '../databases'
import { Order, OrderList } from './orders'

export type OrderProductDetails = {
    product_id: number;
    quantity: number;
};

export type OrdersProducts = {
    order: Order;
    products: OrderProductDetails[];
}

export class OrderProductList {  
    orderList = new OrderList();
  
    async create(_ordersProducts: OrdersProducts): Promise<OrdersProducts> {
        try {
            const order = await this.orderList.create(_ordersProducts.order)
            
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            
            const conn = await Client.connect()

            const ordersProducts = {
                order: order,
                products: [] as OrderProductDetails[]
            }

            
            for (var _productsDetails of _ordersProducts.products) {
                const productsDetails = await conn
                    .query(sql, [order.id,
                        _productsDetails.product_id,
                        _productsDetails.quantity])
                    
                ordersProducts.products.push({
                    product_id: productsDetails.rows[0].product_id,
                    quantity: productsDetails.rows[0].quantity
                })
            }
                
            conn.release()
                
            return ordersProducts
        } catch (err) {
            throw new Error(`Could not add the new order for user ${_ordersProducts.order.user_id}. Error: ${err}`)
        }
    }
}