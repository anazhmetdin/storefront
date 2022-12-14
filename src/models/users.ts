// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password_digest: string;
};

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

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
            const sql = 'SELECT * FROM users WHERE id=($1)'
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
            const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const hash = bcrypt.hashSync(
                _user.password_digest + pepper, 
                parseInt(saltRounds)
            );
        
            const result = await conn
                .query(sql, [_user.firstName, _user.lastName, hash])
        
            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add the new user ${_user.firstName} ${_user.lastName}. Error: ${err}`)
        }
    }
}