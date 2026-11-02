# ShopHere - Full-Stack E-Commerce Platform

A complete, production-grade e-commerce application built with a modern HTML/CSS/JavaScript frontend and a Java Spring Boot REST API backend backed by MySQL.

---

## 🏗️ Architecture

```
ECommerce-Website/
├── frontend/               # Client-side UI & Assets
│   ├── index.html          # Redirect to products
│   ├── products.html       # 20 Catalog items, sort, budget & search
│   ├── product-details.html# Variant selectors, specs & verified reviews
│   ├── cart.html           # Cart management & summary
│   ├── wishlist.html       # Saved favorites with Move to Cart
│   ├── checkout.html       # Delivery details & payment selection
│   ├── order-success.html  # Order confirmation receipt
│   ├── orders.html         # Past order tracking
│   ├── login.html          # Authentication
│   ├── register.html       # User sign up
│   ├── css/style.css       # Responsive styling
│   └── js/                 # products.js, cart.js, auth.js, main.js
│
├── backend/                # Spring Boot REST API (Port 8080)
│   ├── pom.xml             # Maven dependencies (Web, Data JPA, MySQL)
│   └── src/main/java/ecommerce/
│       ├── EcommerceApplication.java # Entry point & Auto-seed runner
│       ├── config/CorsConfig.java   # Global CORS setup
│       ├── entity/                  # User, Product, CartItem, Order, OrderItem
│       ├── repository/              # Spring Data JPA interfaces
│       ├── service/                 # Business logic layer
│       └── controller/              # REST Endpoints (/api/...)
│
└── database/
    └── ecommerce.sql       # MySQL schema and 20 product catalog seed data
```

---

## 🚀 How to Run

### 1. Database Setup (MySQL)
Open MySQL Workbench or MySQL CLI:
```sql
SOURCE D:/ECommerce-Website/database/ecommerce.sql;
```
*(Alternatively, Spring Boot will automatically create tables and seed all 20 products on first run).*

### 2. Run Backend (Spring Boot)
Ensure Java 17+ is installed:
```bash
cd backend
mvn spring-boot:run
```
Backend API will start at: `http://localhost:8080`

### 3. Run Frontend
Open [frontend/products.html](frontend/products.html) directly in any browser, or serve via VS Code Live Server / Python server:
```bash
cd frontend
python -m http.server 5500
```
Visit: `http://localhost:5500/products.html`

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all 20 catalog products |
| `GET` | `/api/products/{id}` | Get single product by ID |
| `GET` | `/api/products/category/{cat}` | Filter by category |
| `GET` | `/api/products/search?q={text}` | Search products by name |
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/cart/{userId}` | Get user shopping cart |
| `POST` | `/api/cart/add` | Add product variant to cart |
| `DELETE` | `/api/cart/{itemId}` | Remove item from cart |
| `POST` | `/api/orders/create` | Place order from cart |
| `GET` | `/api/orders/user/{userId}` | Get customer order history |
| `GET` | `/api/seller/products/{sellerId}` | Get all products listed by seller |
| `POST` | `/api/seller/products` | Add new product (Seller) |
| `PUT` | `/api/seller/products/{id}` | Edit product (Seller) |
| `DELETE` | `/api/seller/products/{id}` | Delete product (Seller) |
| `GET` | `/api/seller/stats/{sellerId}` | Get seller statistics & inventory value |
| `GET` | `/api/admin/users` | Get all registered platform users |
| `PUT` | `/api/admin/users/{id}/role` | Update user role (BUYER / SELLER / ADMIN) |
| `DELETE` | `/api/admin/users/{id}` | Remove user account (Admin) |
| `GET` | `/api/admin/orders` | View all platform customer orders |
| `PUT` | `/api/admin/orders/{id}/status` | Update order delivery status |
| `DELETE` | `/api/admin/products/{id}` | Delete any product (Admin) |
| `GET` | `/api/admin/stats` | Platform overview (Users, Orders, Revenue) |

---

## 👥 Role-Based Access Control (RBAC)

The platform supports 3 primary user roles:
1. **BUYER / Customer:** Can browse 20+ products, filter/sort, manage cart & wishlist, place orders, and track past purchases.
2. **SELLER / Merchant:** Can add, update, and delete their own products, view product inventory, and monitor seller statistics.
3. **ADMIN / Platform Owner:** Full access to view all users, manage user roles, delete abusive accounts, monitor all orders across all sellers, update delivery statuses, and view platform gross revenue metrics.

### 🔑 Pre-Configured Test Accounts

| Role | Email | Password | Access Details |
|---|---|---|---|
| **Buyer** | `buyer@shophere.com` | `buyer123` | Customer browsing & orders |
| **Seller** | `seller@shophere.com` | `seller123` | Merchant dashboard & product listing |
| **Admin** | `admin@shophere.com` | `admin123` | System management & platform analytics |


