DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;


CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Gummy Bears', 'Candy', 1.49, 50),
		('Milk', 'Food', 2.49, 25),
		('Paper Towls', 'Household', 1.99, 40),
		('Apples', 'Produce', 3.99, 20),
		('Snickers', 'Candy', 0.99, 30),
		('Mac and Cheese', 'Food', 3.19, 10),
		('Coka Cola', 'Beverage', 2.99, 33),
		('Clorox', 'Household', 1.99, 42),
		('Oranges', 'Produce', 3.29, 26),
		('Truffle Salt', 'Gourmet', 12.99, 16),
		('Red Bull', 'Beverage', 4.99, 28),
		('Balsamic Vinegar', 'Gourmet', 9.99, 20),
		('Blow pop', 'Candy', 0.59, 77),
		('Broccoli', 'Produce', 1.99, 48),
		('Tide Pods', 'Household', 13.99, 25)
		