import { Product, ProductVendor } from '../../models/products';

const vendor = new ProductVendor()

describe("Products Model", () => {
  it('should have an index method', () => {
    expect(vendor.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(vendor.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(vendor.show).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await vendor.create({
        id: -1,
        name: 'test',
        price: 100
    });

    expect(result.id).toEqual(1);
    expect(result.name).toEqual('test');
    expect(result.price).toEqual(100);
  });
  
  it('show method should returns the product', async () => {
    const result = await vendor.show(1);

    expect(result.id).toEqual(1);
    expect(result.name).toEqual('test');
    expect(result.price).toEqual(100);
  });

  it('index method should returns a list of all products', async () => {
    await vendor.create({
        id: -1,
        name: 'test1',
        price: 200
    });

    const result = await vendor.index();

    expect(result.length).toEqual(2);
    expect(result[1].name).toEqual('test1');
    expect(result[1].price).toEqual(200);
  });
});