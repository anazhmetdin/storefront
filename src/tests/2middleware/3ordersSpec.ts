import supertest from 'supertest'
import { app } from '../../server'
import { authorizationHeader } from './1usersSpec';

const request = supertest(app)

describe("OrdersPRoducts middleware", () => {
  it('/api/orders/:id should create a new order on git request after authorization', async () => {
    const response  = await request.post('/api/orders/3')
      .send(
        {products: [
          {
            product_id: 2,
            quantity: 1
          },
          {
            product_id: 3,
            quantity: 2
          },
          {
            product_id: 1,
            quantity: 4
          }
        ]}
      ).set({authorization: authorizationHeader});

    expect(response.body.order.id).toEqual(3);
    expect(response.body.products.length).toEqual(3);
    expect(response.body.products[0].product_id).toEqual(2);
    expect(response.body.products[1].quantity).toEqual(2);
  });
  
  it('/api/orders/:id should reject requests without authorization', async () => {
    
    const response  = await request.post('/api/orders/3')
      .send(
        {products: [
          {
            product_id: 2,
            quantity: 1
          },
          {
            product_id: 3,
            quantity: 2
          },
          {
            product_id: 1,
            quantity: 4
          }
        ]}
      );
      
    expect(response.status).toEqual(401);
  });
});