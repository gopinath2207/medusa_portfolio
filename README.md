# Medusa — Artist Portfolio & Commission Platform

A full-stack MERN application for Gopika Sureshkumar (alias **Medusa**).  
Dark-mode, minimalist, and production-ready.

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install

# Copy env and fill in your credentials
copy .env.example .env
# Edit .env with your MongoDB URI, Cloudinary keys, and admin credentials

# Seed admin account (run once)
npm run seed

# Start dev server
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Open in browser
- **App**: http://localhost:5173
- **API**: http://localhost:5000/api/health
- **Admin**: http://localhost:5173/admin

## .env Variables (server/.env)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Random secret for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | From cloudinary.com/console |
| `CLOUDINARY_API_KEY` | From cloudinary.com/console |
| `CLOUDINARY_API_SECRET` | From cloudinary.com/console |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + React Query + React Router v6
- **Backend**: Node.js + Express.js + Mongoose
- **Database**: MongoDB Atlas
- **Images**: Cloudinary (Multer → Cloudinary → URL stored in MongoDB)
- **Auth**: JWT (admin only)
- **Toasts**: react-hot-toast
