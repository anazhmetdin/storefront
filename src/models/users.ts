
import Client from '../databases'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    password_digest: string;
};

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserList {  

    async index(): Promise<User[]> {
        try {
            
            const conn = await Client.connect()
            const sql = 'SELECT id, first_name, last_name FROM users'
    
            const result = await conn.query(sql)
    
            conn.release()
    
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
  
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            
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
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *'
            
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(
                _user.password_digest + pepper, 
                parseInt(saltRounds)
                );

            const result = await conn
                .query(sql, [_user.first_name, _user.last_name, hash])

            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add the new user ${_user.first_name} ${_user.last_name}. Error: ${err}`)
        }
    }
}