// @ts-ignore
import Client from '../database'

export type Order = {
    id: number;
    user_id: number;
    active: boolean;
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

            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not add the new order for user ${_order.user_id}. Error: ${err}`)
        }
    }
}