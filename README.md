# Storefront Backend Project

## Setting up

### Database and security

create a file named `.env` that contains the following parameters to connect to your postgres server:

```plaintext
POSTGRES_HOST       = ______
POSTGRES_PORT       = ______
POSTGRES_DB         = ______
POSTGRES_DB_TEST    = ______
POSTGRES_USER       = ______
POSTGRES_PASSWORD   = ______
BCRYPT_PASSWORD     = ______
SALT_ROUNDS         = ______
```

To create database user in psql:

```pgsql
CREATE USER udacity1 user WITH PASSWORD 'password123';
```

Then, create two databases, one for the application and one for testing:

```pgsql
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

Finally, you need to the user an access on the databases:

```pgsql
GRANT PRIVILEGES ON DATABASE storefront TO udacity1 USER;
GRANT PRIVILEGES ON DATABASE storefront_test TO udacity1 USER;
```

An example of the `.env` file using the default parameters of pgsql:

```plaintext
POSTGRES_HOST       = 127.0.0.1
POSTGRES_PORT       = 5432
POSTGRES_DB         = storefront
POSTGRES_DB_TEST    = storefront_test
POSTGRES_USER       = udacity1
POSTGRES_PASSWORD   = password123
BCRYPT_PASSWORD     = anyWord123
SALT_ROUNDS         = 10
```

`BCRYPT_PASSWORD` and `SALT_ROUNDS` are used for securing the stored passwords and providing tokens for users authorization.

### Running the application

Using the terminal, install all the required packages:

```bash
$ npm install
```

Test the application before running

```bash
$ npm test
```

Spin up the server

```bash
$ npm start
```

## API Endpoints

please refer to the [technichal requirements](./REQUIREMENTS.md)
