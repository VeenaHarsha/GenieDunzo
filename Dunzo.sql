CREATE TABLE IF NOT EXISTS categories
 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO categories (name) values ('Groceries');
INSERT INTO categories (name) values ('Fruits');
INSERT INTO categories (name) values ('Beverages');
INSERT INTO categories (name) values ('Medicines');
INSERT INTO categories (name) values ('PickDrop');

--------------------------------------------------------

CREATE TABLE IF NOT EXISTS stores
 (
    id SERIAL PRIMARY KEY,
    storename VARCHAR(100) NOT NULL
);

INSERT INTO stores (storename) values ('Eazy Day');
INSERT INTO stores (storename) values ('More');
INSERT INTO stores (storename) values ('Garden City Super market');
INSERT INTO stores (storename) values ('Med Plus');

--------------------------------------------------------
CREATE TABLE IF NOT EXISTS items
 (
    id SERIAL PRIMARY KEY,
    itemname VARCHAR(100) NOT NULL,
    storeId INTEGER[],
    catId INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
    price NUMERIC(12,2) NOT NULL
);

INSERT INTO items (itemname,storeid,catid,price) values ('Carrot',ARRAY[1,2,3],1,40.50);
INSERT INTO items (itemname,storeid,catid,price) values ('Capsicum',ARRAY[1,2,3],1, 20.00);
INSERT INTO items (itemname,storeid,catid,price) values ('Beans',ARRAY[1,2,3],1, 35.90);
INSERT INTO items (itemname,storeid,catid,price) values ('Apple',ARRAY[1,2,3],2, 180.50);
INSERT INTO items (itemname,storeid,catid,price) values ('Orange',ARRAY[1,2,3],2, 45.99);
INSERT INTO items (itemname,storeid,catid,price) values ('Mango',ARRAY[1,2,3],2, 100.00);

--------------------------------------
-- Get Categories available in Stores
SELECT * FROM categories WHERE id in (SELECT unnest(catid)  FROM storecategories WHERE storeid = 4 );

--------------------------------------
--old
CREATE TABLE IF NOT EXISTS invoice
 (
    id SERIAL PRIMARY KEY,
    storeId INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    itemId INTEGER REFERENCES items(id) ON DELETE RESTRICT,
    itemname VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    itemtotal NUMERIC(12,2) NOT NULL
);
-----------------------------------------
CREATE TABLE IF NOT EXISTS cart
 (
    id SERIAL PRIMARY KEY,
    storeId INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    itemId INTEGER REFERENCES items(id) ON DELETE RESTRICT,
    itemname VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    itemtotal NUMERIC(12,2) NOT NULL
);