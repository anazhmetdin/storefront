import supertest from 'supertest'
import { app } from '../../server'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const request = supertest(app)
export let authorizationHeader: string;

describe("Users middleware", () => {
  it('/api/users/ should create a new user on post request', async () => {
    
    const response = await request.post('/api/users')
      .send(
          {first_name: "test2",
            last_name: "test2",
            password: "password"}
      );

    authorizationHeader = response.body as string;
    const decoded = jwt.verify(authorizationHeader, process.env.BCRYPT_PASSWORD as jwt.Secret) as jwt.JwtPayload;
    
    const user = decoded.user;

    expect(user.id).toEqual(3);
    expect(user.first_name).toEqual('test2');
    expect(user.last_name).toEqual('test2');
    expect(bcrypt.compareSync('password'+(process.env.BCRYPT_PASSWORD as string), user.password_digest)).toEqual(true);
  });
  
  it('/api/users/:id should show user after authorization', async () => {
    
    const response = await request.get('/api/users/3')
        .set({authorization: authorizationHeader});

    const user = response.body;

    expect(user.id).toEqual(3);
    expect(user.first_name).toEqual('test2');
    expect(user.last_name).toEqual('test2');
    expect(bcrypt.compareSync('password'+(process.env.BCRYPT_PASSWORD as string), user.password_digest)).toEqual(true);
  });

  it('/api/users/ should show all users without passwords on get request after authorization', async () => {
    
    const response = await request.get('/api/users/')
        .set({authorization: authorizationHeader});

    const users = response.body;

    expect(users.length).toEqual(3);
    expect(users[2].first_name).toEqual('test2');
    expect(users[1].last_name).toEqual('test1');
    expect(users[0].password_digest).toBeUndefined();
  });

  it('/api/users/ should reject requests without authorization', async () => {
    
    const response1 = await request.get('/api/users/');
    expect(response1.status).toEqual(401);
    
    const response2 = await request.get('/api/users/3');
    expect(response2.status).toEqual(401);
  });

});