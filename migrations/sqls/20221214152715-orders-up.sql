CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id SERIAL REFERENCES users(id),
    active boolean
);