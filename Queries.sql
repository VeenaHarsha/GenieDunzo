CREATE TABLE IF NOT EXISTS categories
 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
    -- storeid INTEGER REFERENCES stores(id) ON DELETE RESTRICT,

INSERT INTO categories (name) values ('Groceries');
INSERT INTO categories (name) values ('Fruits');
INSERT INTO categories (name) values ('Beverages');
INSERT INTO categories (name) values ('Medicines');
INSERT INTO categories (name) values ('PickDrop');

CREATE TABLE IF NOT EXISTS stores
 (
    id SERIAL PRIMARY KEY,
    storename VARCHAR(100) NOT NULL
);

INSERT INTO stores (storename) values ('Eazy Day');
INSERT INTO stores (storename) values ('More');
INSERT INTO stores (storename) values ('Garden City Super market');
INSERT INTO stores (storename) values ('Med Plus');



CREATE TABLE IF NOT EXISTS storecats
 (
    id SERIAL PRIMARY KEY,
    storeid INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    catid INTEGER REFERENCES categories(id) ON DELETE RESTRICT
);

INSERT INTO storecats (storeid, catid) values (1, 1);
INSERT INTO storecats (storeid, catid) values (1, 2);
INSERT INTO storecats (storeid, catid) values (1, 3);


INSERT INTO storecats (storeid, catid) values (2, 1);
INSERT INTO storecats (storeid, catid) values (2, 2);
INSERT INTO storecats (storeid, catid) values (2, 3);


INSERT INTO storecats (storeid, catid) values (3, 1);
INSERT INTO storecats (storeid, catid) values (3, 2);
INSERT INTO storecats (storeid, catid) values (3, 3);

INSERT INTO storecats (storeid, catid) values (4, 4);
INSERT INTO storecats (storeid, catid) values (4, 3);

CREATE TABLE IF NOT EXISTS items
 (
    id SERIAL PRIMARY KEY,
    storecatid INTEGER REFERENCES storecats(id) ON DELETE RESTRICT,
    itemname VARCHAR(100) NOT NULL,
    price NUMERIC(12,2) NOT NULL
);

INSERT INTO items (storecatid,itemname,price) values ( 1, 'Carrot', 40.50);
INSERT INTO items (storecatid,itemname,price) values ( 1, 'Capsicum', 20.00);
INSERT INTO items (storecatid,itemname,price) values ( 1, 'Beans', 35.90);
INSERT INTO items (storecatid,itemname,price) values ( 2, 'Apple', 180.50);
INSERT INTO items (storecatid,itemname,price) values ( 2, 'Orange', 45.99);




CREATE TABLE IF NOT EXISTS Kart
 (
    id SERIAL PRIMARY KEY,
    storeid INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    totalitems INTEGER NOT NULL,
    amount NUMERIC(12,2) NOT NULL
);

/* FMI */

CREATE TABLE IF NOT EXISTS storecategories
 (
    id SERIAL PRIMARY KEY,
    storeid INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    catid INTEGER[] 
 );
INSERT INTO storecategories (storeid, catid) values (1, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (2, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (3, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (4, ARRAY[3,4]);

CREATE TABLE IF NOT EXISTS items
 (
    id SERIAL PRIMARY KEY,
    storecatid INTEGER REFERENCES storecategories(id) ON DELETE RESTRICT,
    itemname VARCHAR(100) NOT NULL,
    price NUMERIC(12,2) NOT NULL
);

INSERT INTO items (storecatid,itemname,price) values ( 1, 'Carrot', 40.50);
INSERT INTO items (storecatid,itemname,price) values ( 1, 'Capsicum', 20.00);
INSERT INTO items (storecatid,itemname,price) values ( 1, 'Beans', 35.90);
INSERT INTO items (storecatid,itemname,price) values ( 2, 'Apple', 180.50);
INSERT INTO items (storecatid,itemname,price) values ( 2, 'Orange', 45.99);

