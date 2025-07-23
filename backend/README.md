# APH Store Backend API

This is the backend API for the APH Store e-commerce application. It provides endpoints for managing products, users, orders, and authentication.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory: `cd aph-store-react/backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
5. Start the development server: `npm run dev`

### Database Seeding

To seed the database with sample data:

- Import data: `npm run data:import`
- Destroy data: `npm run data:destroy`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Create product review (protected)
- `GET /api/products/top` - Get top rated products
- `GET /api/products/category/:category` - Get products by category

### Orders

- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get logged in user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Default Users

After seeding the database, you can use these accounts:

- Admin: admin@example.com / 123456
- Customer: john@example.com / 123456
- Customer: jane@example.com / 123456