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
    storename VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL
);

INSERT INTO stores (storename,address) values ('Eazy Day','RT Nagar, Bengaluru');
INSERT INTO stores (storename,address) values ('More', 'Sahakar nagar,Bangalore');
INSERT INTO stores (storename,address) values ('Nilgiris Super market', 'Malleshwaram, Bengaluru');
INSERT INTO stores (storename,address) values ('Med Plus', 'Jakkur, Bengaluru');
INSERT INTO stores (storename,address) values ('Reliance Fresh','Srinagar, Bengaluru');
INSERT INTO stores (storename,address) values ('Natures Basket', 'Indira nagar,Bangalore');
INSERT INTO stores (storename,address) values ('Nilgiris Super market', 'KR Puram, Bengaluru');
INSERT INTO stores (storename,address) values ('Arun Medicals', 'Kalyan Nagar, Bengaluru');
--------------------------------------------------------
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
INSERT INTO storecategories (storeid, catid) values (5, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (6, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (7, ARRAY[1,2,3]);
INSERT INTO storecategories (storeid, catid) values (8, ARRAY[3,4]);

-------------------------------------------------------------------------------


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
    userid INTEGER REFERENCES tblusers(id) ON DELETE RESTRICT,
    storeId INTEGER REFERENCES stores(id) ON DELETE RESTRICT,
    itemId INTEGER REFERENCES items(id) ON DELETE RESTRICT,
    itemname VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    itemtotal NUMERIC(12,2) NOT NULL
);
-------------------------------------------
CREATE TABLE IF NOT EXISTS tblusers
 (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);
-------------------------------------------
CREATE TABLE IF NOT EXISTS tblDeliveryPartners
 (
    id SERIAL PRIMARY KEY,
    partnername VARCHAR(200) NOT NULL,
    phone VARCHAR(200) NOT NULL
);
INSERT INTO tblDeliveryPartners(partnername, phone) VALUES ('GENIE 1', 1111111);
INSERT INTO tblDeliveryPartners(partnername, phone) VALUES ('GENIE 2', 2222222);
INSERT INTO tblDeliveryPartners(partnername, phone) VALUES ('GENIE 3', 3333333);
INSERT INTO tblDeliveryPartners(partnername, phone) VALUES ('GENIE 4', 4444444);

-----------------------------------------

/* needed for Delivery Partner*/
alter table tblusers add column isDP boolean default false;

update  tblusers set isDp = true where id = 3


ALTER TABLE tblusers RENAME COLUMN isdp TO deliverypartner;


INSERT INTO roads (road_id, roads_geom, road_name)
  VALUES (1,ST_GeomFromText('LINESTRING(191232 243118,191108 243242)',-1),'Jeff Rd');

  CREATE TABLE IF NOT EXISTS tblDelivery
 (
    id SERIAL PRIMARY KEY,
    storeAddress VARCHAR(300) NOT NULL,
    storeLat FLOAT,
    storeLon FLOAT,
    deliveryAddress VARCHAR(300) NOT NULL,
    deliveryLat FLOAT,
    deliveryLon FLOAT
);

INSERT INTO tblDelivery (storeAddress,deliveryAddress,storelocation,deliverylocation, isDelivered)
 values ('Carrot',ARRAY[1,2,3],1,40.50);


INSERT INTO global_points (name, location)
 VALUES ('Town', ST_GeographyFromText('SRID=4326;POINT(-110 30)') );

--FMI

 --- converting lon lat coords to geography
ALTER TABLE sometable ADD COLUMN geog geography(POINT,4326);
UPDATE sometable SET geog = ST_GeogFromText('SRID=4326;POINT(' || lon || ' ' || lat || ')');

--- specify a geography point using EPSG:4267, NAD27
SELECT ST_AsEWKT(ST_GeogFromText('SRID=4267;POINT(-77.0092 38.889588)'));

SELECT ST_Distance(ST_GeogFromWKB('SRID=4267;POINT(-77.0092 38.889588)')

--https://postgis.net/docs/manual-2.1/using_postgis_dbmanagement.html#Geography_Basics
-- http://postgis.net/workshops/postgis-intro/geometries.html
-- https://w3resource.com/PostgreSQL/postgresql-geometric-functions-and-operators.php
-- https://stackoverflow.com/questions/8150721/which-data-type-for-latitude-and-longitude#:~:text=5%20Answers&text=You%20can%20use%20the%20data,(%3D%20float8%20or%20double%20precision%20).