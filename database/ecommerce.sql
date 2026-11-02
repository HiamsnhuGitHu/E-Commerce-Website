-- ===================================================================
-- ShopHere E-Commerce Database Schema & Seed Data
-- ===================================================================

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- -------------------------------------------------------------------
-- 1. Users Table
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(20) DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------
-- 2. Products Table (20 Catalog Products)
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(60) NOT NULL,
    price DOUBLE NOT NULL,
    original_price DOUBLE,
    discount VARCHAR(30),
    badge VARCHAR(50),
    rating DOUBLE DEFAULT 4.5,
    reviews INT DEFAULT 0,
    image TEXT,
    icon VARCHAR(20),
    color VARCHAR(30),
    variant_type VARCHAR(40),
    variants TEXT,      -- Comma-separated sizes/storage (e.g. UK 7, UK 8, UK 9)
    colors TEXT,        -- Comma-separated color choices
    default_variant VARCHAR(50),
    description TEXT,
    specs TEXT,         -- Newline or semicolon separated specs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------
-- 3. Cart Items Table
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    variant VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- -------------------------------------------------------------------
-- 4. Orders Table
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(60) NOT NULL UNIQUE,
    user_id BIGINT,
    total_amount DOUBLE NOT NULL,
    status VARCHAR(40) DEFAULT 'Processing',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    shipping_address TEXT,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- -------------------------------------------------------------------
-- 5. Order Items Table
-- -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    variant VARCHAR(100),
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ===================================================================
-- SEED DATA: Users (BUYER, SELLER, ADMIN)
-- ===================================================================
INSERT INTO users (id, name, email, password, phone, address, role) 
VALUES 
(1, 'Himanshu Sharma', 'himanshu.sharma@example.com', 'password123', '+91 98765 43210', 'Flat 402, Green Valley Apartments, Bengaluru', 'BUYER'),
(2, 'John Buyer', 'buyer@shophere.com', 'buyer123', '+91 98765 11111', 'Plot 12, Indiranagar, Bengaluru', 'BUYER'),
(3, 'Apex Retailers Store', 'seller@shophere.com', 'seller123', '+91 98765 22222', 'Commercial Complex, Koramangala, Bengaluru', 'SELLER'),
(4, 'ShopHere Platform Admin', 'admin@shophere.com', 'admin123', '+91 98765 00000', 'HQ Tower, Outer Ring Road, Bengaluru', 'ADMIN')
ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role);

-- ===================================================================
-- SEED DATA: 20 Products (Shoes, T-Shirts, Phones, Laptops, Accessories)
-- ===================================================================
INSERT INTO products (id, name, category, price, original_price, discount, badge, rating, reviews, image, icon, color, variant_type, variants, colors, default_variant, description, specs)
VALUES
(1, 'Nike Air Zoom Pegasus', 'Shoes', 4999, 7499, '33% OFF', 'Trending', 4.8, 240, 
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80', '👟', '#fee2e2', 
 'shoes', 'UK 7,UK 8,UK 9,UK 10,UK 11', 'Racer Red,Triple Black,Pure White', 'UK 9',
 'Lightweight, ultra-responsive running shoes designed for explosive speed, cushioned comfort, and daily road runs.',
 'Engineered breathable mesh upper;Responsive Zoom Air cushioning units;High-abrasion rubber waffle outsole;Weight: 260g (Men size 9)'),

(2, 'Classic White Low-Top Sneakers', 'Shoes', 2499, 3999, '38% OFF', 'Bestseller', 4.6, 180, 
 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80', '👟', '#f1f5f9', 
 'shoes', 'UK 7,UK 8,UK 9,UK 10', 'Crisp White,White & Navy,Off-White', 'UK 8',
 'Timeless minimalist white sneakers crafted with smooth synthetic leather for clean, versatile everyday styling.',
 'Premium synthetic leather upper;Memory foam cushioned footbed;Vulcanized anti-skid rubber sole;Reinforced lace eyelets'),

(3, 'High-Top Basketball Shoes', 'Shoes', 5499, 7999, '31% OFF', 'New', 4.7, 95, 
 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=700&q=80', '🏀', '#fef3c7', 
 'shoes', 'UK 8,UK 9,UK 10,UK 11,UK 12', 'Volt Gold,Midnight Red,Carbon Black', 'UK 9',
 'Dynamic high-cut court shoes delivering maximum ankle lock-in, lateral support, and high-energy rebound.',
 'Padded collar for reinforced ankle stability;High-rebound EVA midsole;Multidirectional herringbone grip pattern;Shock absorbing heel cup'),

(4, 'Handcrafted Leather Derby Shoes', 'Shoes', 3299, 4999, '34% OFF', 'Handmade', 4.5, 112, 
 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=700&q=80', '👞', '#fef3c7', 
 'shoes', 'UK 7,UK 8,UK 9,UK 10', 'Burnished Tan,Classic Black,Espresso Brown', 'UK 8',
 'Sophisticated formal derby shoes tailored from genuine burnished leather for executive meetings and black-tie occasions.',
 '100% Genuine polished top-grain leather;Breathable leather inner lining;Stacked wooden heel with rubber cap;Classic open-lacing construction'),

(5, 'Oversized Streetwear Graphic T-Shirt', 'T-Shirts', 799, 1299, '38% OFF', 'Trending', 4.7, 320, 
 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80', '👕', '#ede9fe', 
 'clothing', 'S,M,L,XL,XXL', 'Vintage Black,Acid Wash Gray,Sand Beige', 'L',
 'Heavyweight streetwear drop-shoulder tee made from 100% combed cotton with screen-printed urban art.',
 '240 GSM heavy combed cotton;Drop-shoulder relaxed streetwear cut;Pre-shrunk and bio-washed fabric;Ribbed crew collar that retains shape'),

(6, 'Classic Slim-Fit Crew Neck T-Shirt', 'T-Shirts', 499, 899, '44% OFF', 'Bestseller', 4.4, 410, 
 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80', '👕', '#e0e7ff', 
 'clothing', 'S,M,L,XL', 'Classic White,Charcoal Gray,Navy Blue,Jet Black', 'M',
 'Silky-smooth organic cotton crew neck t-shirt tailored for a clean, athletic silhouette.',
 '100% Organic combed cotton;180 GSM lightweight breathable weave;Fade-resistant color dyes;Tagless itch-free neck label'),

(7, 'Dry-Fit Athletic Gym T-Shirt', 'T-Shirts', 899, 1499, '40% OFF', 'Sale', 4.8, 190, 
 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80', '🎽', '#dcfce7', 
 'clothing', 'S,M,L,XL,XXL', 'Neon Green,Stealth Black,Cobalt Blue', 'L',
 'Sweat-wicking performance athletic tee with 4-way stretch engineered for bodybuilding, crossfit, and running.',
 '88% Polyester, 12% Spandex quick-dry;4-way flexible stretch construction;Anti-microbial odor resistance;Reflective safety logos on chest and back'),

(8, 'Premium Pique Collar Polo T-Shirt', 'T-Shirts', 999, 1699, '41% OFF', 'Classic', 4.6, 215, 
 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=700&q=80', '👔', '#ffedd5', 
 'clothing', 'M,L,XL,XXL', 'Royal Navy,Forest Green,Crimson Red,Pure White', 'L',
 'Smart-casual pique polo with ribbed collar, dual-button placket, and subtle tonal embroidery.',
 '100% Cotton honeycomb pique knit;Side-slit hem for unhindered mobility;Shrink-resistant collar and cuffs;Regular smart fit'),

(9, 'Apple iPhone 15 Pro', 'Phones', 124900, 134900, '7% OFF', 'Premium', 4.9, 580, 
 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80', '📱', '#f3f4f6', 
 'storage', '128GB,256GB,512GB,1TB', 'Natural Titanium,Blue Titanium,White Titanium,Black Titanium', '256GB',
 'Aerospace-grade titanium design featuring the groundbreaking 3nm A17 Pro chip and versatile 48MP camera.',
 '6.1 Super Retina XDR OLED ProMotion 120Hz;A17 Pro chip with 6-core GPU;48MP Main + 3x Telephoto + Ultra-Wide;USB-C connector with 10Gbps USB 3 speeds'),

(10, 'Samsung Galaxy S24 Ultra', 'Phones', 119999, 129999, '8% OFF', 'AI Powered', 4.8, 460, 
 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80', '📱', '#fef9c3', 
 'storage', '256GB,512GB,1TB', 'Titanium Gray,Titanium Black,Titanium Violet,Titanium Yellow', '256GB',
 'Flagship AI smartphone with built-in S Pen stylus, titanium armor frame, and quad-telephoto zoom.',
 '6.8 QHD+ Dynamic AMOLED 2X 120Hz;Snapdragon 8 Gen 3 for Galaxy;200MP Quad Camera with Galaxy AI editing;5000mAh Battery with 45W wired charging'),

(11, 'Google Pixel 8', 'Phones', 62999, 75999, '17% OFF', 'Best Camera', 4.7, 275, 
 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80', '📱', '#fae8ff', 
 'storage', '128GB,256GB', 'Hazel,Rose,Obsidian', '128GB',
 'Powered by Google Tensor G3 with industry-leading computational photography and 7 years of OS updates.',
 '6.2 Actua OLED 120Hz display;Google Tensor G3 security coprocessor;50MP Dual Camera with Best Take & Magic Eraser;7 years of direct Android OS and security updates'),

(12, 'OnePlus 12 5G', 'Phones', 54999, 64999, '15% OFF', 'Fast Charge', 4.7, 310, 
 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80', '📱', '#ecfccb', 
 'storage', '256GB / 12GB RAM,512GB / 16GB RAM', 'Flowy Emerald,Silky Black', '256GB / 12GB RAM',
 'Supreme speed backed by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera, and 100W SUPERVOOC charging.',
 '6.82 2K 120Hz ProXDR display (4500 nits peak);Snapdragon 8 Gen 3 with 16GB LPDDR5X RAM;Hasselblad Camera system with 64MP periscope;5400mAh dual-cell battery with 100W wired charger'),

(13, 'Apple MacBook Pro 14 (M3)', 'Laptops', 159900, 169900, '6% OFF', 'Top Rated', 4.9, 340, 
 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80', '💻', '#f1f5f9', 
 'storage', '512GB SSD / 8GB RAM,1TB SSD / 16GB RAM,2TB SSD / 24GB RAM', 'Space Gray,Silver', '512GB SSD / 8GB RAM',
 'Extreme efficiency and unthrottled computing power with Apple M3 chip and Liquid Retina XDR screen.',
 '14.2 Liquid Retina XDR display (1000 nits sustained);Apple M3 Chip (8-Core CPU, 10-Core GPU);512GB Ultra-fast SSD storage + 8GB Unified Memory;Up to 22 hours continuous battery life'),

(14, 'Dell XPS 15 OLED Touch', 'Laptops', 145000, 165000, '12% OFF', 'Creator Choice', 4.6, 145, 
 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=700&q=80', '💻', '#e2e8f0', 
 'storage', '16GB RAM / 1TB SSD,32GB RAM / 1TB SSD,64GB RAM / 2TB SSD', 'Platinum Silver with Black Interior', '16GB RAM / 1TB SSD',
 'Breathtaking 3.5K OLED touchscreen display encased in CNC machined aluminum and carbon fiber palm rest.',
 '15.6 3.5K (3456x2160) OLED InfinityEdge Touch;13th Gen Intel Core i7-13700H (14 cores, 5.0 GHz);NVIDIA GeForce RTX 4050 6GB GDDR6;16GB DDR5 4800MHz + 1TB NVMe PCIe SSD'),

(15, 'ASUS ROG Zephyrus G16 Gaming', 'Laptops', 134990, 159990, '16% OFF', 'Gaming Beast', 4.8, 180, 
 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80', '💻', '#fbcfe8', 
 'storage', '16GB / RTX 4060,32GB / RTX 4070,32GB / RTX 4080', 'Eclipse Gray,Platinum White', '32GB / RTX 4070',
 'Ultra-slim 1.85kg gaming powerhouse featuring 2.5K 240Hz OLED Nebula display and NVIDIA RTX 4070.',
 '16 2.5K 240Hz 0.2ms OLED ROG Nebula display;Intel Core Ultra 9 185H with dedicated AI NPU;NVIDIA GeForce RTX 4070 8GB GDDR6 (105W TGP);32GB LPDDR5X RAM + 1TB PCIe 4.0 NVMe SSD'),

(16, 'Lenovo ThinkPad E14 Gen 5', 'Laptops', 58990, 72990, '19% OFF', 'Business', 4.5, 205, 
 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80', '💻', '#e2e8f0', 
 'storage', '8GB / 256GB SSD,16GB / 512GB SSD,16GB / 1TB SSD', 'Thunder Black', '16GB / 512GB SSD',
 'Legendary ThinkPad rugged reliability, MIL-STD-810H durability, and world-class spill-resistant keyboard.',
 '14 WUXGA (1920x1200) IPS Anti-glare display;AMD Ryzen 5 7530U 6-core processor;16GB DDR4 3200MHz RAM + 512GB PCIe SSD;Integrated Fingerprint scanner & Privacy webcam shutter'),

(17, 'Sony WH-1000XM5 ANC Headphones', 'Accessories', 26990, 34990, '23% OFF', 'Bestseller', 4.9, 512, 
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', '🎧', '#f3f4f6', 
 'color', 'Standard Edition', 'Midnight Black,Platinum Silver,Midnight Blue', 'Standard Edition',
 'World-class active noise cancellation with 8 microphones, LDAC high-res audio, and crystal-clear calls.',
 'Dual processors (V1 + QN1) for advanced ANC;30-hour battery life with 3-minute quick charge (3 hrs);Multipoint Bluetooth connection to 2 devices;Precise voice pickup with 4 beamforming mics'),

(18, 'Smart Fitness Watch AMOLED', 'Accessories', 4499, 7999, '44% OFF', 'Trending', 4.5, 380, 
 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80', '⌚', '#fee2e2', 
 'size', '42mm Dial,46mm Dial', 'Carbon Black,Silver Frost,Rose Gold', '46mm Dial',
 'Brilliant 1.43 AMOLED always-on display smartwatch with heart-rate, SpO2 monitor, and Bluetooth calling.',
 '1.43 HD AMOLED Always-On screen (466x466);Bluetooth Calling with built-in mic and speaker;100+ Sports modes & IP68 water & dust resistance;Up to 7 days battery endurance on normal use'),

(19, 'Mechanical Wireless RGB Keyboard', 'Accessories', 3999, 5999, '33% OFF', 'Hot', 4.7, 220, 
 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80', '⌨️', '#e0e7ff', 
 'switch', 'Red Linear Switch (Quiet),Blue Clicky Switch (Tactile),Brown Switch (Balanced)', 'Classic Retro Gray,Obsidian Black', 'Red Linear Switch (Quiet)',
 'Compact 75% mechanical keyboard with hot-swappable switches, PBT double-shot keycaps, and vibrant RGB.',
 'Pre-lubed Gateron Red linear mechanical switches;Tri-Mode: Bluetooth 5.0, 2.4GHz wireless & Type-C;Internal silicone sound-dampening foam pads;Per-key customizable 16.8M RGB backlighting'),

(20, 'Ergonomic 26K DPI Gaming Mouse', 'Accessories', 2199, 3499, '37% OFF', 'Pro Gear', 4.6, 290, 
 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=700&q=80', '🖱️', '#dbeafe', 
 'color', 'Wireless Standard', 'Matte Black,Arctic White', 'Wireless Standard',
 'Ultra-lightweight 58g wireless gaming mouse equipped with flawless 26,000 DPI optical sensor and PTFE skates.',
 'Featherlight 58-gram honeycomb frame;PixArt 26,000 DPI optical sensor with 650 IPS;100% Virgin grade PTFE low-friction mouse feet;Up to 80 hours continuous rechargeable battery')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- ===================================================================
-- SEED DATA: Sample Orders for Demo User
-- ===================================================================
INSERT INTO orders (id, order_number, user_id, total_amount, status, payment_method, shipping_address)
VALUES 
(1, '#ORD-9842', 1, 4999, 'Delivered', 'UPI', 'Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru, Karnataka - 560103'),
(2, '#ORD-9710', 1, 26990, 'Shipped', 'Credit Card', 'Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru, Karnataka - 560103')
ON DUPLICATE KEY UPDATE order_number=VALUES(order_number);

INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, variant)
VALUES
(1, 1, 'Nike Air Zoom Pegasus', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80', 4999, 1, 'UK 9 • Racer Red'),
(2, 17, 'Sony WH-1000XM5 ANC Headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', 26990, 1, 'Standard Edition • Midnight Black')
ON DUPLICATE KEY UPDATE product_name=VALUES(product_name);

