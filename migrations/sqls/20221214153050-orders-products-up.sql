CREATE TABLE orders_products (
    order_id SERIAL REFERENCES orders(id),
    product_id SERIAL REFERENCES products(id),
    quantity integer,
    CONSTRAINT orders_products_pk PRIMARY KEY (order_id, product_id)
);