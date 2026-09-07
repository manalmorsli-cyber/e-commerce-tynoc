# Tynoc E-Commerce - Full-Stack Application

A production-grade, full-stack e-commerce web application designed and developed as part of the Software Engineering Internship project. The application features a modular architecture, clean UI/UX design, custom REST API route handlers, authentication flow, cart/wishlist management, and persistent data operations using **AWS DynamoDB**.

---

## Project Links

* **GitHub Repository**: https://github.com/manalmorsli-cyber/e-commerce-tynoc
* **Live Deployment (Vercel)**: https://e-commerce-tynoc.vercel.app 

---

## Project Overview

This application serves as a realistic e-commerce platform built to simulate real-world software engineering workflows. It focuses on application architecture, business logic implementation, API development, error handling, responsive design, and database interaction.

Users can browse products, search and filter by category, manage a shopping cart and wishlist, view detailed product pages, register/sign in, and enjoy a seamless mobile and desktop experience.

---

## Key Features

### Storefront & Product Discovery
* **Responsive Homepage**: Hero banner, featured categories, search bar, and dynamic product grids.
* **Category Filtering & Search**: Instant filtering by product categories and dynamic keyword search.
* **Product Detail Pages (`/product/[id]`)**: Interactive image gallery with zoom modal, technical specs, stock indicators, quantity selectors, and related products recommendations.

### User & Data Management
* **Authentication Flow**: User registration and login mechanisms (`/login`, `/register`).
* **User Session State**: Global auth state management via Context API to track logged-in users.
* **Resilient Data Handlers**: Robust database fallback mechanisms to ensure high availability during cloud deployments.

### Cart & Wishlist Management
* **Shopping Cart (`/cart`)**: Add items, update quantities, delete products, and automatically calculate subtotals.
* **Wishlist (`/wishlist`)**: Toggle favorite items, prevent duplicate entries, and easily transfer wishlist items to the cart.
* **Empty & Loading States**: Dedicated visual feedback when cart/wishlist are empty or while data is being fetched.

### Application Experience & UX
* **Fully Responsive**: Mobile-first design featuring a compact mobile navigation menu (Hamburger menu) and optimized layout for tablets and desktops.
* **Custom 404 Page (`/not-found.tsx`)**: Friendly navigation redirection when accessing non-existent routes.
* **Error Handling**: Graceful API error catches to prevent application crashes.

---

## Tech Stack

* **Frontend**: Next.js 14+ (App Router), React 18, TypeScript
* **Styling**: Tailwind CSS, CSS Animations
* **Backend**: Next.js API Route Handlers (`app/api/*`) & Server Actions
* **Database**: AWS DynamoDB (AWS SDK v3 `@aws-sdk/client-dynamodb` & `@aws-sdk/lib-dynamodb`)
* **State Management**: React Context API (`CartContext`, `AuthContext`)
* **Deployment & CI/CD**: Vercel & GitHub

---

## Architecture & Data Flow

The project follows a clean layered architecture, ensuring separation of concerns between presentation, business logic, API routing, and database abstraction:

```text
User / Browser
       │
       ▼
Next.js Frontend Pages & UI Components (App Router)
       │
       ▼
React Context API (CartContext / AuthContext - Business Logic)
       │
       ▼
Next.js REST API Route Handlers (/api/products, /api/auth, /api/categories)
       │
       ▼
Database Abstraction Layer (lib/dynamodb.ts)
       │
       ▼
AWS DynamoDB (Cloud Instance or Local Endpoint)
Project Structure
Plaintext
e-commerce-tynoc/
├── app/                            # Next.js App Router (Pages & REST API)
│   ├── api/                        # Backend REST API endpoints (auth, cart, products, orders...)
│   ├── (routes)/                   # Application pages (cart, checkout, product/[id], wishlist...)
│   ├── layout.tsx                  # Root layout & global providers
│   ├── not-found.tsx               # Custom 404 error page
│   └── page.tsx                    # Storefront homepage
├── components/                     # Reusable UI components (Navbar, ProductCard, CartDrawer...)
├── context/                        # React Context state management (AuthContext, CartContext)
├── data/                           # Fallback mock datasets
├── lib/                            # AWS DynamoDB client & server actions
├── scripts/                        # Database seed scripts
├── types/                          # TypeScript type definitions
├── .env.local                      # Environment variables
└── README.md                       # Project documentation
Database Design (AWS DynamoDB)
The database architecture is designed with NoSQL best practices using AWS DynamoDB:

1. Products Table (Products)
Partition Key: id (String)

Attributes: title (String), price (Number), description (String), category (String), image (String), images (List), badge (String), inStock (Boolean)

2. Categories Table (Categories)
Partition Key: id (String)

Attributes: name (String), slug (String), icon (String)

3. Users Table (Users)
Partition Key: id (String)

Attributes: email (String), name (String), password (String), createdAt (String)

4. Shopping Cart Table (Carts)
Partition Key: userId (String)

Attributes: items (List of Objects: { productId, quantity, price }), updatedAt (String)

5. Wishlist Table (Wishlists)
Partition Key: userId (String)

Attributes: productIds (List of Strings), updatedAt (String)

Data Operations (CRUD Breakdown)
CREATE: New user records created via PutCommand during registration (/api/register).

READ: Products and categories fetched via ScanCommand and GetCommand (/api/products, /api/products/[id]).

UPDATE: Cart items and quantities updated dynamically in user session and synchronized with DynamoDB PutCommand/UpdateCommand.

DELETE: Cart and wishlist items removed upon user action.

Environment Variables
Create a .env.local file in the root directory and configure the following credentials:

Extrait de code
# AWS DynamoDB Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key

# Optional: Local DynamoDB Endpoint (For offline development)
DYNAMODB_ENDPOINT=[http://127.0.0.1:8000](http://127.0.0.1:8000)

# Table Names
DYNAMODB_PRODUCTS_TABLE=Products
DYNAMODB_CATEGORIES_TABLE=Categories
DYNAMODB_USERS_TABLE=Users
DYNAMODB_CART_TABLE=Carts
DYNAMODB_WISHLIST_TABLE=Wishlists
Getting Started
Prerequisites
Node.js (v18.x or later)

npm or yarn

Installation
Clone the repository:

Bash
git clone [https://github.com/manalmorsli-cyber/e-commerce-tynoc.git](https://github.com/manalmorsli-cyber/e-commerce-tynoc.git)
cd e-commerce-tynoc
Install project dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

## Screenshots
### Home page: <img width="1893" height="821" alt="image" src="https://github.com/user-attachments/assets/ae244811-bc9a-4f30-a11b-c038b42b4697" />
### Product Grid : <img width="1674" height="798" alt="image" src="https://github.com/user-attachments/assets/63c38cfd-286f-4f2c-9c63-4068d27532c8" />
### Product Details & Mobile View : <img width="1483" height="769" alt="image" src="https://github.com/user-attachments/assets/1e544df4-d6ec-4243-abf6-13bc930310c2" />
<img width="412" height="824" alt="image" src="https://github.com/user-attachments/assets/4f20504f-f38f-484a-992f-b130f4799e49" />






