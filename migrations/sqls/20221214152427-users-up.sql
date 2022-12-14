CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(128),
    lastName VARCHAR(128),
    password VARCHAR(255)
);