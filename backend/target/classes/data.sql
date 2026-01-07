INSERT INTO categories (name) VALUES
('Electronics'),
('Fashion'),
('Home'),
('Books');

INSERT INTO products (name, description, price, in_stock, category_id) VALUES
('Wireless Headphones', 'Bluetooth headphones with noise isolation and 20h battery life.', 59.99, TRUE, 1),
('Smart Watch', 'Fitness tracking smart watch with heart-rate monitor.', 79.90, TRUE, 1),
('Laptop Backpack', 'Water-resistant backpack suitable for 15-inch laptops.', 29.50, TRUE, 2),
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt for everyday use.', 12.99, FALSE, 2),
('Air Fryer', 'Oil-free cooking air fryer with 4L basket.', 64.00, TRUE, 3),
('Desk Lamp', 'LED desk lamp with adjustable brightness levels.', 18.75, TRUE, 3),
('Java Basics Book', 'Beginner-friendly book for learning Java programming.', 15.00, TRUE, 4),
('React Handbook', 'Practical guide for building apps with React.', 17.50, TRUE, 4),
('Phone Case', 'Shockproof phone case with slim design.', 9.99, TRUE, 1);
