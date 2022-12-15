import { Order, OrderList } from '../../models/orders';
import { OrdersProducts, OrderProductDetails, OrderProductList } from '../../models/orders_products'

const list = new OrderProductList()

describe("OrdersProducts Model", () => {
  it('should have a create', () => {
    expect(list.create).toBeDefined();
  });

  it('create method should add an order including all of the products', async () => {
    const order: Order = {
        id: -1,
        user_id: 1,
        active: true
    };
    
    const ordersProducts: OrdersProducts = {
        order: order,
        products: [
            {
                product_id: 1,
                quantity: 1
            },
            {
                product_id: 2,
                quantity: 2
            }
        ] as OrderProductDetails[]
    }
    
    const result = await list.create(ordersProducts);

    expect(result.order.id).toEqual(1);
    expect(result.products.length).toEqual(2);
    
  });
});
