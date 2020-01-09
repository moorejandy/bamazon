DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

USE bamazon_DB;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Camping", 80.00, 11), ("Hammer", "Tools", 5.00, 22), ("Sandals", "Shoes", 14.00, 40),
("Sweatshirt", "Clothing", 20.00, 32), ("Sweatpants", "Clothing", 22.00, 45), ("Screwdriver", "Tools", 7.00, 17), ("Sleeping bag", "Camping", 65.00, 20),
("Boots", "Shoes", 90.00, 25), ("Dresser", "Furniture", 200.00, 10), ("Coffee table", "Furniture", 100.00, 12);

USE bamazon_DB;
SELECT * FROM products;
