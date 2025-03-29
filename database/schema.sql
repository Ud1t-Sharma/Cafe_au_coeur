
-- Create database
CREATE DATABASE IF NOT EXISTS cafe_au_coeur;
USE cafe_au_coeur;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id VARCHAR(50) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Allergens table
CREATE TABLE IF NOT EXISTS allergens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Menu item ingredients junction table
CREATE TABLE IF NOT EXISTS menu_item_ingredients (
    menu_item_id VARCHAR(50) NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (menu_item_id, ingredient_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Menu item allergens junction table
CREATE TABLE IF NOT EXISTS menu_item_allergens (
    menu_item_id VARCHAR(50) NOT NULL,
    allergen_id INT NOT NULL,
    PRIMARY KEY (menu_item_id, allergen_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
    FOREIGN KEY (allergen_id) REFERENCES allergens(id)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    delivery_type ENUM('delivery', 'pickup') NOT NULL,
    address_id INT,
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    service_fee DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Insert sample data for categories
INSERT INTO categories (id, name, description, image_url) VALUES
('coffee', 'Coffee', 'Our selection of specialty coffees', 'images/categories/coffee.jpg'),
('pastries', 'Pastries', 'Freshly prepared French pastries', 'images/categories/pastries.jpg'),
('breakfast', 'Breakfast', 'Morning dishes prepared with care', 'images/categories/breakfast.jpg'),
('lunch', 'Lunch', 'Light dishes for lunch', 'images/categories/lunch.jpg');

-- Insert sample data for menu items
INSERT INTO menu_items (id, name, description, price, image_url, category_id, featured) VALUES
('espresso', 'Espresso', 'Shot of our signature espresso blend', 250.00, 'images/menu/espresso.jpg', 'coffee', TRUE),
('cappuccino', 'Cappuccino', 'Espresso with steamed milk and foam', 320.00, 'images/menu/cappuccino.jpg', 'coffee', TRUE),
('latte', 'Café Latte', 'Espresso with steamed milk', 350.00, 'images/menu/latte.jpg', 'coffee', FALSE),
('americano', 'Americano', 'Espresso diluted with hot water', 280.00, 'images/menu/americano.jpg', 'coffee', FALSE),
('croissant', 'Croissant', 'Classic buttery French croissant', 150.00, 'images/menu/croissant.jpg', 'pastries', TRUE),
('pain-au-chocolat', 'Pain au Chocolat', 'Chocolate-filled buttery pastry', 180.00, 'images/menu/pain-au-chocolat.jpg', 'pastries', TRUE),
('eclair', 'Chocolate Éclair', 'Chocolate filled éclair with chocolate glaze', 200.00, 'images/menu/eclair.jpg', 'pastries', FALSE),
('avocado-toast', 'Avocado Toast', 'Sourdough toast with avocado, radish, and microgreens', 400.00, 'images/menu/avocado-toast.jpg', 'breakfast', TRUE),
('french-toast', 'French Toast', 'Brioche french toast with maple syrup and berries', 450.00, 'images/menu/french-toast.jpg', 'breakfast', FALSE),
('quiche', 'Quiche Lorraine', 'Classic quiche with bacon and Gruyère cheese', 380.00, 'images/menu/quiche.jpg', 'lunch', TRUE),
('nicoise-salad', 'Niçoise Salad', 'Tuna, egg, olives, and vegetables with Dijon vinaigrette', 500.00, 'images/menu/nicoise-salad.jpg', 'lunch', FALSE);

-- Insert sample ingredients
INSERT INTO ingredients (name) VALUES
('Espresso'), ('Milk'), ('Water'), ('Flour'), ('Butter'),
('Chocolate'), ('Eggs'), ('Avocado'), ('Sourdough Bread'),
('Radish'), ('Microgreens'), ('Brioche'), ('Maple Syrup'),
('Berries'), ('Bacon'), ('Gruyère Cheese'), ('Tuna'),
('Olives'), ('Dijon Mustard'), ('Mixed Vegetables');

-- Insert sample allergens
INSERT INTO allergens (name) VALUES
('Gluten'), ('Dairy'), ('Eggs'), ('Nuts'), ('Seafood');

-- Create PHP database connection file
