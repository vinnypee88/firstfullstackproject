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
    stock integer
);

CREATE TABLE orders (
    id varchar(100) primary key,
    users_id INTEGER REFERENCES users(id),
    item_id varchar(100) REFERENCES item(id),
    quantity INTEGER, 
    date_of_order date
);

CREATE TABLE cart (
    users_id integer REFERENCES users(id),
    item_id varchar(100) REFERENCES item(id),
    quantity INTEGER
);
