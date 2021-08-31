CREATE TABLE users (
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    password varchar(100) not null,
    address varchar(200) not null,
    date_of_birth date
);

CREATE TABLE item (
    id varchar(100) primary key,
    item_name varchar(50) not null,
    model_number varchar(50) not null,
    description varchar(50) not null,
    stock integer,
    image varchar(50) not null,
    price real NOT NULL
);

CREATE TABLE orders (
    id integer(100) serial primary key,
    users_id INTEGER REFERENCES users(id),
    total_cost real, 
    date_of_order date
);

CREATE TABLE orders_items (
    order_id integer(100) primary key,
    item_id INTEGER REFERENCES users(id),
    quantity INTEGER
);

CREATE TABLE cart (
    users_id integer,
    item_id varchar(100) ,
    quantity INTEGER
);
