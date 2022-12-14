import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserList } from '../models/users'

dotenv.config()
const userList = new UserList();

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        jwt.verify(authorizationHeader as string, process.env.BCRYPT_PASSWORD as jwt.Secret)
        next()
    } catch (error) {
        res.status(401).send('Access denied!')
    }
}

const create = async (req: express.Request, res: express.Response) => {
    const user: User = {
        id: -1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password_digest: req.body.password,
    }
    try {
        const newUser = await userList.create(user)
        var token = jwt.sign({ user: newUser }, process.env.BCRYPT_PASSWORD as jwt.Secret);
        res.json(token)
    } catch(err) {
        res.status(400).send(err);
    }
}

const index = async (req: express.Request, res: express.Response) => {
    try {
        const userIndex = await userList.index();
        res.json(userIndex)
    } catch (error) {
        res.status(401).send('Access denied!')
    }
}

const show = async (req: express.Request, res: express.Response) => {
    
    const id = parseInt(req.params.id);

    try {
        const authorizationHeader = req.headers.authorization
        const decoded = jwt.verify(authorizationHeader as string, process.env.BCRYPT_PASSWORD as jwt.Secret) as jwt.JwtPayload
        
        if(decoded.user.id !== id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401).send(err)
        return
    }

    try {
        const user = await userList.show(id)
        res.json(user)
    } catch(err) {
        res.status(400)
        res.json(err?? + id)
    }
}

export default {create, authenticate, index, show}