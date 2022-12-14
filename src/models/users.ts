// @ts-ignore
import Client from '../database'

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserList {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT id, firstName, lastName FROM users'
    
            const result = await conn.query(sql)
    
            conn.release()
    
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
  
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
  
    async create(_user: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (name, price) VALUES($1, $2) RETURNING id, firstName, lastName'
            // @ts-ignore
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [_user.firstName, _user.lastName, _user.password])
        
            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add the new user ${_user.firstName} ${_user.lastName}. Error: ${err}`)
        }
    }
}