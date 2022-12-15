import { Order, OrderList } from '../../models/orders';

const orderList = new OrderList()

describe("Orders Model", () => {
  it('should have an index method', () => {
    expect(orderList.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderList.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await orderList.create({
        id: -1,
        user_id: 1,
        active: true,
    });
    expect(result).toEqual({
        id: 2,
        user_id: 1,
        active: true
    });
  });
  
  it("index method should return all details of all the user's order", async () => {
    const result = await orderList.index(1);
    //@ts-ignore
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        active: true,
        product_id: 1,
        quantity: 1,
        name: 'test',
        subtotal: 100
      },
      {
        id: 1,
        user_id: 1,
        active: true,
        product_id: 2,
        quantity: 2,
        name: 'test1',
        subtotal: 400
      }
    ]);
  });
});