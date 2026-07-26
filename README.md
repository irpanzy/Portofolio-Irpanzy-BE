# Portfolio Irpanzy - Backend API

Backend API untuk portfolio Irfan Muria dengan fitur AI Chatbot terintegrasi.

## 🚀 Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: ImageKit
- **AI**: Google Gemini API
- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **Validation**: Zod
- **Security**: Helmet, CORS, Custom Sanitizers (MongoDB & XSS)
- **Rate Limiting**: Express-rate-limit
- **File Upload**: Multer
- **Logging**: Morgan

## 📁 Project Structure

```
src/
├── config/          # Konfigurasi (env, database, imagekit, gemini)
├── controllers/     # Request handlers (9 controllers)
├── middleware/      # Express middleware (8 modules)
├── models/          # Mongoose models (8 models)
├── routes/          # API routes (9 route files)
├── services/        # Business logic (3 services)
├── types/           # TypeScript interfaces (9 types)
├── utils/           # Utilities (ApiError, ApiResponse, asyncHandler)
├── validations/     # Zod schemas (8 validations)
├── seeds/           # Database seeders
└── app.ts           # Express app setup

docs/
├── API_CONTRACT.md           # Dokumentasi lengkap API
├── postman_collection.json   # Postman collection
└── README.md                 # Dokumentasi docs folder
```

## ⚙️ Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd portofolio-irpanzy-be
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Buat file `.env` di root project:

```env
# Server
NODE_ENV=development
PORT=8000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRES_IN=30d

# ImageKit
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@irpanzy.com
ADMIN_PASSWORD=Admin123!

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://irpanzy.vercel.app
```

4. **Run development server**

```bash
npm run dev
```

Server akan berjalan di `http://localhost:8000`

5. **Seed database (First time only)**

Buat admin user dari kredensial di `.env`:

```bash
npm run seed
```

Admin credentials diambil dari environment variables:

- **ADMIN_EMAIL** dari `.env`
- **ADMIN_PASSWORD** dari `.env`

⚠️ **PENTING: Ganti password setelah login pertama kali!**

Custom credentials (override env):

```bash
npm run seed -- --email custom@email.com --password CustomPass123
```

Force recreate admin:

```bash
npm run seed:force
```

Lihat `src/seeds/README.md` untuk opsi lainnya.

## 📝 Available Scripts

```bash
npm run dev          # Run development server dengan hot reload
npm run build        # Build TypeScript ke JavaScript
npm start            # Run production server
npm run seed         # Run database seeder (create default admin)
npm run seed:admin   # Run admin seeder only
npm run seed:force   # Force recreate admin if exists
npm run format       # Format code dengan Prettier
npm run format:check # Check code formatting
```

## 🔐 Authentication

API menggunakan JWT untuk authentication. Untuk mengakses endpoint admin, include token di header:

```
Authorization: Bearer <your_jwt_token>
```

## 📚 API Documentation

Dokumentasi lengkap tersedia di `docs/API_CONTRACT.md` atau import Postman collection dari `docs/postman_collection.json`.

### Base URL

- **Development**: `http://localhost:8000/api`
- **Production**: `https://your-domain.com/api`

### Endpoint Categories

**Public Endpoints:**

- `GET /api/projects` - Daftar projects
- `GET /api/experiences` - Daftar pengalaman
- `GET /api/services` - Daftar layanan
- `GET /api/techstacks` - Daftar tech stack
- `GET /api/about` - Informasi about
- `POST /api/contact` - Submit contact form
- `POST /api/chat` - Chat dengan AI

**Admin Endpoints (Auth Required):**

- `/api/auth/*` - Authentication
- `/api/projects/*` - CRUD Projects + Soft Delete
- `/api/experiences/*` - CRUD Experiences + Soft Delete
- `/api/services/*` - CRUD Services + Soft Delete
- `/api/techstacks/*` - CRUD Tech Stacks + Soft Delete
- `/api/about/*` - Update About
- `/api/contact/*` - Manage Contact Messages
- `/api/chat/history/*` - Manage Chat History
- `/api/upload/*` - File Upload Management

## 🗂️ Features

### ✅ CRUD Operations

- Full CRUD untuk Projects, Experiences, Services, Tech Stacks
- Read/Update untuk About (single document)
- Create/Read/Delete untuk Contact Messages

### ✅ Soft Delete (Recycle Bin)

Soft delete tersedia untuk:

- Projects
- Experiences
- Services
- Tech Stacks

Setiap entity memiliki 8 actions:

- Create, Read, Update, Delete (soft)
- Get Trash, Restore, Force Delete (permanent)

### ✅ File Upload (ImageKit)

- Single file upload
- Multiple files upload (max 10)
- Organized folder structure:
  - `/portfolio/projects` - Gambar projects
  - `/portfolio/experiences` - Gambar experiences
  - `/portfolio/services` - Icon services
  - `/portfolio/techstacks` - Logo tech stack
  - `/portfolio/about` - Foto profile

### ✅ AI Chatbot

- Powered by Google Gemini API
- Portfolio context-aware responses
- Chat history management
- Session-based conversations

### ✅ Security

- JWT Authentication
- Password hashing (bcrypt)
- Rate limiting (berbeda per endpoint)
- CORS protection
- Helmet security headers
- Custom XSS sanitizer (replaces xss-clean)
- Custom MongoDB injection sanitizer (replaces express-mongo-sanitize, Express 5 compatible)
- Input sanitization

### ✅ Rate Limiting

- General: 100 req/15min
- Auth: 5 req/15min
- Chat: 10 req/15min
- Contact: 3 req/15min

## 🔄 Response Format

### Success Response

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {}
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": []
}
```

## 🧪 Testing dengan Postman

1. Import collection dari `docs/postman_collection.json`
2. Set environment variable `baseUrl` ke `http://localhost:8000/api`
3. Run "Login" request untuk mendapatkan token
4. Token akan otomatis tersimpan dan digunakan untuk request lainnya

## 🌐 Frontend Integration

- **Frontend Repo**: `D:\Coding\Next\Portofolio-Irpanzy`
- **Development**: `http://localhost:5173`
- **Production**: `https://irpanzy.vercel.app`

CORS sudah dikonfigurasi untuk kedua URL di atas.

## 📦 Database Models

1. **Admin** - Admin user dengan authentication
2. **Project** - Portfolio projects dengan soft delete
3. **Experience** - Work experiences dengan soft delete
4. **Service** - Services offered dengan soft delete
5. **TechStack** - Technologies & skills dengan soft delete
6. **About** - About information (single document)
7. **Contact** - Contact form submissions
8. **ChatHistory** - AI chat conversation history

## 🔧 Development Notes

- Menggunakan **ES Modules** (bukan CommonJS)
- Semua exports menggunakan **named exports** (tidak ada default export)
- TypeScript strict mode enabled
- Prettier untuk code formatting
- Nodemon untuk auto-reload development

## 📄 License

ISC

## 👤 Author

**Irfan Muria**

---

**API Version**: 1.0.0
**Last Updated**: July 26, 2026
