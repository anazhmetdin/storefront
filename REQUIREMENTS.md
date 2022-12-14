# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: 'products/' [GET]
- Show: 'products/:id/' [GET]
- Create [token required]: 'products/' [POST]

#### Users

- Index [token required]: 'users/' [GET]
- Show [token required]: 'users/:id/' [GET]
- Create N[token required]: 'users/' [POST]

#### Orders

- Current Order by user (args: user id)[token required]: 'orders/:id/' [GET]
- Place an Order by user (args: user id)[token required]: 'orders/:id/' [POST]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Tables

* products (id:serial, name:varchar, price:real)
* users (id:serial, firstName:varchar, lastName:varchar, password_digest:varchar)
* orders (id:serial, user_id:serial, active:boolean)
* orders_products (order_id:serial, product_id:serial, quantity:integer)
