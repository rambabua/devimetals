DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    weight TEXT,
    dimensions TEXT
);

CREATE TABLE Orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    total_amount REAL NOT NULL,
    transaction_ref TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrderItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Seed initial products
INSERT INTO Products (id, name, price, image, category, description, weight, dimensions) VALUES
('1', 'Traditional Brass Diya', 850.00, 'https://via.placeholder.com/600?text=Brass+Diya', 'Puja Items', 'Authentic Ajjaram crafted brass diya.', '450g', '12cm x 10cm'),
('2', 'Bronze Temple Bell', 1250.00, 'https://via.placeholder.com/600?text=Bronze+Bell', 'Decor', 'A beautifully resonant bronze bell.', '800g', '15cm x 8cm'),
('3', 'Brass Water Jug', 1800.00, 'https://via.placeholder.com/600?text=Brass+Jug', 'Utensils', 'Pure brass jug for health benefits.', '1.2kg', '25cm x 12cm'),
('4', 'Antique Brass Plate', 650.00, 'https://via.placeholder.com/600?text=Brass+Plate', 'Utensils', 'Heavy brass dining plate with an antique finish.', '600g', '28cm diameter');
