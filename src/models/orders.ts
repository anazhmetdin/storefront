
import Client from '../databases'

export type Order = {
    id: number;
    user_id: number;
    active: boolean;
};

export type orderProductDetailed = {
    id: number;
    user_id: number;
    active: boolean;
    product_id: number;
    quantity: number;
    name: string;
    subtotal: number
}

export class OrderList {
    async index(user_id: number): Promise<orderProductDetailed[]> {
        try {
            const sql = `SELECT o.*, op.product_id, op.quantity, p.name, p.price*op.quantity as subtotal
                FROM orders o
                INNER JOIN orders_products op
                ON o.id = op.order_id
                INNER JOIN products p
                ON op.product_id = p.id
                WHERE o.user_id=($1) AND o.active=TRUE`
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
            
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [_order.user_id])
        
            const order = result.rows[0]

            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not add the new order for user ${_order.user_id}. Error: ${err}`)
        }
    }
}