# Portfolio Irpanzy - Backend API

Backend RESTful API modern untuk portfolio **Irfan Muria** yang dibangun menggunakan Express.js, TypeScript, MongoDB, dan terintegrasi dengan Google Gemini AI Chatbot serta ImageKit cloud storage.

---

## 🌟 Key Features

- 🤖 **AI Chatbot**: Asisten virtual portfolio interaktif berbasis **Google Gemini API** dengan kontekstual knowledge & chat history management.
- 🦸 **Hero & About Separation**: Pemisahan data landing page (Hero/Greeting/Avatar) dan profil naratif (About/Bio/Summary) untuk fleksibilitas frontend.
- 🎓 **Educations & Attachments**: Manajemen riwayat pendidikan lengkap (Formal, Bootcamp, Certification, Course) dengan lampiran dokumen (sertifikat, ijazah, transkrip) via ImageKit.
- 💼 **Projects & Experience**: Portofolio proyek dan pengalaman kerja dengan dukungan soft-delete, tagging teknologi, dan visual showcase.
- 🗂️ **Tech Stack Categorized**: 7 kategori teknologi (`languages`, `frontend`, `backend`, `mobile`, `database`, `devops_cloud`, `tools`).
- 🔄 **Reordering System**: Dukungan drag-and-drop ordering untuk Projects, Educations, Experiences, dan Tech Stacks.
- 🗑️ **Soft Delete & Trash Recovery**: Semua resource utama dilengkapi sistem Recycle Bin (trash, restore, dan force permanent delete).
- 🖼️ **ImageKit Cloud Storage**: Upload gambar tunggal dan banyak gambar dengan manajemen auto fileId & deletion.
- 🔐 **Secure JWT Authentication**: Akses token & refresh token mechanism, Bcrypt password hashing, dan rate-limited auth endpoints.
- 🛡️ **Enterprise-Grade Security**: Sanitasi NoSQL injection, XSS protection, Helmet security headers, CORS origin whitelisting, dan Zod schema validation.

---

## 🚀 Tech Stack

| Kategori                 | Teknologi                                              |
| ------------------------ | ------------------------------------------------------ |
| **Runtime & Language**   | Node.js (v20+ / v22+), TypeScript                      |
| **Web Framework**        | Express.js (v5)                                        |
| **Database & ODM**       | MongoDB Atlas, Mongoose                                |
| **AI Engine**            | Google Generative AI (Gemini Pro)                      |
| **File Storage**         | ImageKit SDK                                           |
| **Authentication**       | JWT (`jsonwebtoken`), `bcryptjs`                       |
| **Request Validation**   | Zod                                                    |
| **Security & Utilities** | Helmet, CORS, Express Rate Limit, Morgan, Multer, UUID |

---

## 📁 Project Structure

```
portofolio-irpanzy-be/
├── api/
│   └── index.ts                  # Entry point untuk Vercel Serverless Functions
├── src/
│   ├── config/                   # Konfigurasi aplikasi & database
│   │   ├── database.ts           # Koneksi MongoDB Mongoose
│   │   ├── env.ts                # Validasi environment variables dengan Zod
│   │   ├── gemini.ts             # Inisialisasi Google Gemini AI
│   │   ├── imagekit.ts           # Inisialisasi ImageKit client
│   │   └── index.ts
│   ├── controllers/              # Controller layer (11 controllers)
│   │   ├── about.controller.ts
│   │   ├── auth.controller.ts
│   │   ├── chat.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── education.controller.ts
│   │   ├── experience.controller.ts
│   │   ├── hero.controller.ts
│   │   ├── project.controller.ts
│   │   ├── service.controller.ts
│   │   ├── techstack.controller.ts
│   │   └── upload.controller.ts
│   ├── middleware/               # Middleware layer (auth, error, upload, security, dll.)
│   ├── models/                   # Mongoose schemas & models (11 models)
│   │   ├── about.model.ts
│   │   ├── admin.model.ts
│   │   ├── chatHistory.model.ts
│   │   ├── contact.model.ts
│   │   ├── education.model.ts
│   │   ├── experience.model.ts
│   │   ├── hero.model.ts
│   │   ├── project.model.ts
│   │   ├── service.model.ts
│   │   └── techstack.model.ts
│   ├── routes/                   # Routing layer (11 route modules)
│   ├── seeds/                    # Admin database seeder
│   │   └── admin.seed.ts
│   ├── services/                 # Business logic services (Auth, Chat, ImageKit)
│   ├── types/                    # TypeScript interfaces & types
│   ├── utils/                    # ApiError, ApiResponse, asyncHandler helpers
│   ├── validations/              # Zod validation schemas
│   └── app.ts                    # Express app initialization
├── docs/                         # Dokumentasi API & Deployment
│   ├── ABOUT_SETUP_GUIDE.md
│   ├── API_CONTRACT.md
│   ├── BACKEND_RESTRUCTURE_V2.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   ├── EDUCATION_API.md
│   ├── REORDER_API.md
│   └── VERCEL_DEPLOYMENT.md
├── vercel.json                   # Konfigurasi Vercel Zero-Config deployment
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/irpanzy/Portofolio-Irpanzy-BE.git
cd portofolio-irpanzy-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Buat file `.env` di root project dan sesuaikan nilainya:

```env
# Server
PORT=8000
NODE_ENV=development

# Database (MongoDB Atlas / Local)
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# ImageKit Storage
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
MAX_FILE_SIZE=5242880 # 5 MB dalam bytes

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_20_chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_20_chars
JWT_REFRESH_EXPIRES_IN=30d

# Default Admin (digunakan saat database seeding)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourStrongAdminPassword123

# CORS Allowed Origins (pisahkan dengan koma)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-frontend.vercel.app
```

### 4. Database Seeding

Jalankan seeder untuk membuat akun Administrator awal dari konfigurasi `.env`:

```bash
npm run seed
```

Jika ingin memaksa overwrite admin yang sudah ada:

```bash
npm run seed:force
```

### 5. Run Development Server

```bash
npm run dev
```

Server akan aktif di: `http://localhost:8000` (Health check: `http://localhost:8000/health`)

---

## 📝 Available Scripts

| Command                | Keterangan                                                            |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run dev`          | Menjalankan server development dengan auto-reload (tsx + nodemon)     |
| `npm run build`        | Menjalankan TypeScript compiler (`tsc`) ke folder `dist/`             |
| `npm start`            | Menjalankan build JavaScript di lingkungan production (`dist/app.js`) |
| `npm run seed`         | Membuat user admin awal ke database                                   |
| `npm run seed:force`   | Menghapus dan membuat ulang user admin                                |
| `npm run format`       | Melakukan formatting kode ke seluruh file dengan Prettier             |
| `npm run format:check` | Memeriksa formatting kode tanpa mengubah file                         |

---

## 📡 API Endpoints Overview

Semua route API diawali dengan prefix `/api`.

### 1. Public Endpoints

- **Hero**: `GET /api/hero`
- **About**: `GET /api/about`
- **Educations**: `GET /api/educations`, `GET /api/educations/:id`
- **Experiences**: `GET /api/experiences`, `GET /api/experiences/:id`
- **Projects**: `GET /api/projects`, `GET /api/projects/:id`
- **Services**: `GET /api/services`, `GET /api/services/:id`
- **Tech Stacks**: `GET /api/techstacks` _(support query filter: `?category=frontend`)_, `GET /api/techstacks/:id`
- **Contact Form**: `POST /api/contact`
- **AI Chatbot**: `POST /api/chat`
- **Health Check**: `GET /health`

### 2. Authentication (`/api/auth`)

- `POST /api/auth/login` - Login admin & mendapatkan accessToken + refreshToken
- `POST /api/auth/refresh` - Refresh access token yang kadaluarsa
- `GET /api/auth/profile` - Ambil profil admin _(Auth Required)_
- `PUT /api/auth/password` - Ganti password admin _(Auth Required)_

### 3. Protected / Admin Endpoints _(Bearer Token Required)_

- **Hero & About**:
  - `POST /api/hero`, `PUT /api/hero`
  - `POST /api/about`, `PUT /api/about`
- **CRUD & Soft Delete** (`/projects`, `/experiences`, `/educations`, `/services`, `/techstacks`):
  - `POST /api/<module>` - Tambah data baru
  - `PUT /api/<module>/:id` - Update data
  - `DELETE /api/<module>/:id` - Pindahkan data ke Trash (Soft Delete)
  - `GET /api/<module>/trash/all` - Lihat data di Trash
  - `PATCH /api/<module>/:id/restore` - Pulihkan data dari Trash
  - `DELETE /api/<module>/:id/force` - Hapus permanen
- **Reordering** (`PATCH /api/<module>/reorder`):
  - `PATCH /api/projects/reorder`
  - `PATCH /api/educations/reorder`
  - `PATCH /api/experiences/reorder`
  - `PATCH /api/techstacks/reorder`
- **Media Upload** (`/api/upload`):
  - `POST /api/upload/single` - Upload 1 gambar ke ImageKit
  - `POST /api/upload/multiple` - Upload banyak gambar sekaligus
  - `DELETE /api/upload/:fileId` - Hapus gambar dari ImageKit
- **Contact & Chat Management**:
  - `GET /api/contact`, `GET /api/contact/:id`, `DELETE /api/contact/:id`
  - `GET /api/chat/history`, `GET /api/chat/history/:id`, `DELETE /api/chat/history/:id`, `DELETE /api/chat/history`

---

## 🚀 Deployment to Vercel

Backend ini sudah dikonfigurasi untuk berjalan mulus di **Vercel Serverless Functions**:

1. Pastikan file [vercel.json](file:///d:/Coding/Express/portofolio-irpanzy-be/vercel.json) menggunakan format Zero-Config:
   ```json
   {
     "version": 2,
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/api"
       }
     ],
     "functions": {
       "api/index.ts": {
         "maxDuration": 30
       }
     }
   }
   ```
2. Hubungkan repository ke dashboard Vercel.
3. Masukkan seluruh environment variables yang dibutuhkan di **Project Settings** > **Environment Variables**.
4. Deploy!

Panduan langkah demi langkah lengkap dapat dilihat di [docs/VERCEL_DEPLOYMENT.md](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/VERCEL_DEPLOYMENT.md).

---

## 📚 Complete Documentation

Detail kontrak request/response dan panduan teknis tersedia di folder `docs/`:

- 📖 [API Contract Documentation](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/API_CONTRACT.md)
- 🚀 [Vercel Deployment Guide](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/VERCEL_DEPLOYMENT.md)
- 🎓 [Education & Attachments API](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/EDUCATION_API.md)
- 🔄 [Drag & Drop Reorder API](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/REORDER_API.md)
- 🛠️ [Backend Restructure V2 Guide](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/BACKEND_RESTRUCTURE_V2.md)
- 📋 [Pre-Deployment Checklist](file:///d:/Coding/Express/portofolio-irpanzy-be/docs/DEPLOYMENT_CHECKLIST.md)

---

## 👤 Author

**Irfan Muria (Irpanzy)**

- **API Version**: 1.0.0
- **License**: ISC
- **Last Updated**: 31 Agustus 2026
