# HAN Education Website

## Setup Instructions

### 1. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration (MongoDB Atlas)
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/han-education?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Optional: Cloudinary Configuration (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. MongoDB Atlas Setup (Free Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username and password
5. Get your connection string
6. Replace the MONGODB_URI in your .env.local file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Access the Application

- Main website: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Admin login: username: `admin`, password: `admin123`

## Features

- Student registration form
- Admin dashboard
- Multi-language support (Mongolian/English)
- Professional hover effects
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB (Atlas)
- NextAuth.js
- Framer Motion 