// @ts-ignore
import Client from '../database'

export type OrderProductDetails = {
    product_id: number;
    quantity: number;
};

export type Order = {
    id: number;
    user_id: number;
    active: boolean;
    products: OrderProductDetails[];
};

export class OrderList {  
    async show(user_id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND active=TRUE'
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn.query(sql, [user_id])
        
            conn.release()
        
            return result.rows
        } catch (err) {
            throw new Error(`Could not find user ${user_id}. Error: ${err}`)
        }
    }
  
    async create(_order: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, active) VALUES($1, TRUE) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [_order.user_id])
        
            const order = result.rows[0]

            order['products'] = []

            const sql_ordersDetails = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            for (var _productsDetails of _order.products) {
                const productsDetails = await conn
                    .query(sql, [_order.id,
                        _productsDetails.product_id,
                        _productsDetails.quantity])
                
                order.products.push({
                    product_id: productsDetails.product_id,
                    quantity: productsDetails.quantity
                })
            }
        
            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not add the new order for user ${_order.user_id}. Error: ${err}`)
        }
    }
}