## Overview

This project is a Simple Orders Management App with a React frontend and Node.js backend. Users can select products, manage quantities, and place orders. The backend uses MongoDB for data storage.

## Tech Stack

- Node.js + Express + TypeScript
- React + Vite + TypeScript
- MongoDB
- Docker & Docker Compose

## Architecture

API service for CRUD news and Post News

Controllers
Controllers handle HTTP requests and responses
Call services to perform business logic
Handle validation with Zod and authentication with middleware
Errors are passed to a global errorHandler middleware
Example:
createProductController → calls createProductService
createOrderController → calls createOrderService

Service
Services contain business logic, independent of Express
Examples:
createProductService → create a new product
MongoDB transactions can be handled via sessions

Model
Mongoose models define schemas and types:
UserModel → email, password, name
ProductModel → name, price, stock, createdBy
OrderModel → user, totalAmount
DetailOrderModel → order, product, quantity, price
Pre-save hooks can be used (e.g., hash password before saving)

Validation
Zod is used for request validation and transformation
Frontend also uses Zod + React Hook Form for type-safe validation

## Clone Project

```bash
git clone https://github.com/adibfuadi/order
cd cd orders-app
```

## build & start all services

```bash
docker compose up --build
```

## How to Test

```bash
http://localhost:5173/
User: adibfuadi@gmail.com
Password: 123123
```
