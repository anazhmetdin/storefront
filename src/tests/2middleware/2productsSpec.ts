import supertest from 'supertest'
import { app } from '../../server'
import { authorizationHeader } from './1usersSpec';

const request = supertest(app)

describe("Products middleware", () => {
  it('/api/products/ should create a new product on git request after authorization', async () => {
    const response = await request.post('/api/products')
        .send(
            {name: "test2",
            price: 300}
        ).set({authorization: authorizationHeader});

    expect(response.body.id).toEqual(3);
    expect(response.body.name).toEqual('test2');
    expect(response.body.price).toEqual(300);
  });

  it('/api/products/:id should returns the product on git request', async () => {
    const response = await request.get('/api/products/3');

    expect(response.body.id).toEqual(3);
    expect(response.body.name).toEqual('test2');
    expect(response.body.price).toEqual(300);
  });

  it('/api/products/ should returns a list of all products on git request', async () => {
    const response = await request.get('/api/products');

    expect(response.body.length).toEqual(3);
    expect(response.body[2].id).toEqual(3);
    expect(response.body[1].name).toEqual('test1');
    expect(response.body[0].price).toEqual(100);
  });
  
  it('/api/products/ should reject requests without authorization', async () => {
    
    const response  = await request.post('/api/products')
      .send(
          {name: "test2",
          price: 300}
      );
      
    expect(response.status).toEqual(401);
  });
});