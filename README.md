# Tynoc E-Commerce - Full-Stack Application

A production-grade, full-stack e-commerce web application designed and developed as part of the Software Engineering Internship project. The application features a modular architecture, clean UI/UX design, custom REST API route handlers, authentication flow, cart/wishlist management, and persistent data operations using **AWS DynamoDB**.

---

## Project Links

* **GitHub Repository**: [https://github.com/manalmorsli-cyber/e-commerce-tynoc](https://github.com/manalmorsli-cyber/e-commerce-tynoc)
* **Live Deployment (Vercel)**: [https://e-commerce-tynoc.vercel.app](https://e-commerce-tynoc.vercel.app) *(Replace with your exact Vercel link if different)*

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