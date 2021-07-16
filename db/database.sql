CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    password varchar(100) not null,
    address varchar(200) not null,
    date_of_birth date
);

CREATE TABLE IF NOT EXISTS item (
    id varchar(100) primary key,
    item_name varchar(50) not null,
    model_number varchar(50) not null,
    description varchar(50) not null,
    stock integer
);

CREATE TABLE IF NOT EXISTS orders (
    id varchar(100) primary key,
    users_id INTEGER,
    item_id varchar(100),
    quantity INTEGER, 
    date_of_order date,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE IF NOT EXISTS cart (
    users_id integer,
    item_id varchar(100),
    quantity INTEGER,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);
