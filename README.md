# 🌟 Portfolio Irfan Muria - Backend API

Backend API untuk portfolio Irfan Muria dengan fitur AI Chatbot, Hero/About Management, dan Multi-Category Tech Stack.

---

## 🚀 Tech Stack

### **Core Technologies**

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js 5.2+
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: ImageKit
- **AI Integration**: Google Gemini API

### **Authentication & Security**

- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod Schemas
- **Sanitization**: Custom MongoDB & XSS Sanitizers

### **Development & Build**

- **Language**: TypeScript 7.0+
- **Build Tool**: tsc (TypeScript Compiler)
- **Dev Server**: tsx + nodemon
- **Code Formatting**: Prettier

---

## 📦 Dependencies

### **Production Dependencies**

| Package                 | Version      | Purpose                   |
| ----------------------- | ------------ | ------------------------- |
| `express`               | ^5.2.1       | Web framework             |
| `mongoose`              | ^8.0.0       | MongoDB ODM               |
| `typescript`            | ^7.0.2       | TypeScript compiler       |
| `zod`                   | ^3.22.4      | Schema validation         |
| `jsonwebtoken`          | ^9.0.2       | JWT authentication        |
| `bcryptjs`              | ^2.4.3       | Password hashing          |
| `@google/generative-ai` | ^0.21.0      | Gemini AI integration     |
| `imagekit`              | ^5.0.0       | File storage & management |
| `cors`                  | ^2.8.6       | CORS middleware           |
| `helmet`                | ^8.3.0       | Security headers          |
| `express-rate-limit`    | ^7.1.5       | Rate limiting             |
| `morgan`                | ^1.11.0      | HTTP request logger       |
| `multer`                | ^1.4.5-lts.1 | File upload handling      |
| `uuid`                  | ^10.0.0      | UUID generation           |
| `dotenv`                | ^16.3.1      | Environment variables     |

### **Development Dependencies**

| Package    | Version | Purpose                     |
| ---------- | ------- | --------------------------- |
| `@types/*` | Latest  | TypeScript type definitions |
| `tsx`      | ^4.23.1 | TypeScript execution        |
| `nodemon`  | ^3.1.14 | Development auto-reload     |
| `prettier` | ^3.9.6  | Code formatting             |

---

## 📁 Project Structure

```
src/
├── 📂 config/           # Configuration modules
│   ├── database.ts      # MongoDB connection
│   ├── env.ts          # Environment variables
│   ├── imagekit.ts     # ImageKit configuration
│   ├── gemini.ts       # Google Gemini AI
│   └── index.ts        # Export all configs
├── 📂 controllers/      # Request handlers (10 controllers)
│   ├── auth.controller.ts
│   ├── hero.controller.ts       # 🆕 Landing page data
│   ├── about.controller.ts      # 🔄 Simplified
│   ├── project.controller.ts
│   ├── experience.controller.ts
│   ├── education.controller.ts  # 🆕 Education with attachments
│   ├── service.controller.ts
│   ├── techstack.controller.ts  # 🔄 Multi-category + cascade update
│   ├── contact.controller.ts
│   ├── chat.controller.ts
│   └── upload.controller.ts
├── 📂 middleware/       # Express middleware (9 modules)
│   ├── auth.middleware.ts
│   ├── cors.middleware.ts
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   ├── rateLimiter.middleware.ts
│   ├── sanitize.middleware.ts    # Custom MongoDB & XSS sanitizers
│   ├── upload.middleware.ts
│   └── validation.middleware.ts
├── 📂 models/           # Mongoose models (9 models)
│   ├── admin.model.ts
│   ├── hero.model.ts            # 🆕 Hero/Home section
│   ├── about.model.ts           # 🔄 Simplified (bio, summary)
│   ├── project.model.ts
│   ├── experience.model.ts
│   ├── education.model.ts       # 🆕 With attachments support
│   ├── service.model.ts
│   ├── techstack.model.ts       # 🔄 Multi-category support
│   ├── contact.model.ts
│   └── chatHistory.model.ts
├── 📂 routes/           # API routes (10 route files)
│   ├── auth.routes.ts
│   ├── hero.routes.ts           # 🆕 GET, POST, PUT endpoints
│   ├── about.routes.ts          # 🔄 Updated
│   ├── project.routes.ts        # 🔄 Added reorder endpoint
│   ├── experience.routes.ts     # 🔄 Added reorder endpoint
│   ├── education.routes.ts      # 🆕 Full CRUD + reorder
│   ├── service.routes.ts
│   ├── techstack.routes.ts      # 🔄 Added reorder endpoint
│   ├── contact.routes.ts
│   ├── chat.routes.ts
│   ├── upload.routes.ts
│   └── index.ts                 # Route aggregator
├── 📂 services/         # Business logic (4 services)
│   ├── auth.service.ts
│   ├── chat.service.ts          # 🔄 Updated for Hero model
│   ├── imagekit.service.ts
│   └── index.ts
├── 📂 types/            # TypeScript interfaces (10 types)
│   ├── auth.types.ts
│   ├── hero.types.ts            # 🆕 Hero interfaces
│   ├── about.types.ts           # 🔄 Simplified
│   ├── project.types.ts
│   ├── experience.types.ts
│   ├── education.types.ts       # 🆕 Education interfaces
│   ├── service.types.ts
│   ├── techstack.types.ts       # 🔄 Multi-category support
│   ├── contact.types.ts
│   ├── chat.types.ts
│   └── common.types.ts
├── 📂 utils/            # Utility functions
│   ├── ApiError.ts              # Error handling
│   ├── ApiResponse.ts           # Response formatting
│   └── asyncHandler.ts          # Async error wrapper
├── 📂 validations/      # Zod validation schemas (9 validations)
│   ├── auth.validation.ts
│   ├── hero.validation.ts       # 🆕 Hero validation
│   ├── about.validation.ts      # 🔄 Updated
│   ├── project.validation.ts
│   ├── experience.validation.ts
│   ├── education.validation.ts  # 🆕 Education validation
│   ├── service.validation.ts
│   ├── techstack.validation.ts  # 🔄 Multi-category validation
│   └── contact.validation.ts
├── 📂 seeds/            # Database seeders
│   └── admin.seed.ts            # Admin user seeder
└── app.ts               # Express app setup

api/
└── index.ts             # 🆕 Vercel serverless entry point

docs/
└── API_CONTRACT.md              # Complete API documentation
```

---

## 🎯 Key Features

### ✨ **New Features (Latest Update)**

#### 1. **Hero/About Separation**

- **Hero Model**: Landing page data (avatar, greeting, title, description, resumeLink)
- **About Model**: Simplified to bio and summary only
- **Endpoints**: Separate CRUD for better organization

#### 2. **Multi-Category Tech Stack**

- **Before**: Single category per tech stack
- **Now**: Multiple categories per tech stack (e.g., Next.js in both frontend & backend)
- **Categories**: languages, frontend, backend, mobile, database, devops_cloud, tools
- **Proficiency Level**: Optional 1-5 rating system

#### 3. **Cascade Update System**

- **Auto-sync**: When tech stack name/icon changes, all projects using it auto-update
- **Format Support**: Both string arrays and object arrays in projects
- **Performance**: Bulk MongoDB operations (not N+1 queries)

#### 4. **Education with Attachments**

- **Certificate Support**: Array of certificates/transcripts with ImageKit URLs
- **Types**: formal, bootcamp, certification, course
- **Attachments**: `{ title, url, fileId }` structure

#### 5. **Reorder Endpoints**

- **Entities**: Projects, Experiences, Tech Stacks, Educations
- **Method**: PATCH `/api/{entity}/reorder`
- **Implementation**: MongoDB bulkWrite for performance

#### 6. **Vercel Deployment Ready**

- **Serverless**: Configured for Vercel Functions
- **Build**: TypeScript to JavaScript compilation
- **Environment**: Production environment variables

### 🔄 **Enhanced Features**

#### **CRUD Operations**

- Full CRUD for Projects, Experiences, Services, Tech Stacks, Educations
- Create/Update for Hero and About (single document collections)
- Create/Read/Delete for Contact Messages

#### **Soft Delete (Recycle Bin)**

Available for: Projects, Experiences, Services, Tech Stacks

Each entity has 8 actions:

- **CRUD**: Create, Read, Update, Delete (soft)
- **Trash Management**: Get Trash, Restore, Force Delete (permanent)

#### **File Upload (ImageKit)**

- **Single & Multiple**: Upload endpoints with category organization
- **Folders**: Organized structure
  - `/portfolio/hero` - Avatar images
  - `/portfolio/projects` - Project images
  - `/portfolio/experiences` - Experience images
  - `/portfolio/services` - Service icons
  - `/portfolio/techstacks` - Tech stack logos
  - `/portfolio/about` - About images
  - `/portfolio/educations` - Education certificates

#### **AI Chatbot (Google Gemini)**

- **Context-Aware**: Uses portfolio data for intelligent responses
- **Session Management**: Chat history with expiration
- **Portfolio Context**: Auto-generated context from Hero, About, Projects, etc.

#### **Security & Performance**

- **JWT Authentication**: Access & refresh tokens
- **Password Security**: bcrypt hashing
- **Rate Limiting**: Different limits per endpoint type
- **CORS Protection**: Configurable allowed origins
- **Security Headers**: Helmet middleware
- **Input Sanitization**: Custom MongoDB injection & XSS protection

---

## ⚙️ Installation & Setup

### **1. Clone Repository**

```bash
git clone <repository-url>
cd portofolio-irpanzy-be
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

Copy `.env.example` to `.env` and configure:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio
# For production: mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id

# Google Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key

# CORS Configuration
CLIENT_URL=http://localhost:3001
# For production: https://your-frontend.vercel.app
```

### **4. Database Setup**

Start MongoDB locally or use MongoDB Atlas, then seed admin user:

```bash
# Create admin user
npm run seed

# Force recreate admin (if exists)
npm run seed:force
```

### **5. Development Server**

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Build & Production
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server (requires build)

# Database
npm run seed         # Create default admin user
npm run seed:force   # Force recreate admin user

# Code Quality
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Testing
npm test             # Run tests (placeholder)
```

---

## 📡 API Documentation

For complete API documentation including all endpoints, request/response examples, authentication, and testing guides, please see:

**➡️ [API Contract Documentation](docs/API_CONTRACT.md)**

### **Quick Reference**

- **Base URL**: `http://localhost:3000/api` (development) | `https://your-project.vercel.app/api` (production)
- **Authentication**: JWT Bearer token for admin endpoints
- **Response Format**: Standardized JSON with `statusCode`, `message`, and `data` fields

### **Main Endpoint Categories**

| Category              | Endpoints                 | Description                     |
| --------------------- | ------------------------- | ------------------------------- |
| **🏠 Hero & About**   | `/api/hero`, `/api/about` | Landing page and about data     |
| **👤 Authentication** | `/api/auth/*`             | Admin login, refresh, logout    |
| **💼 Projects**       | `/api/projects`           | Portfolio projects with reorder |
| **💻 Experiences**    | `/api/experiences`        | Work experiences with reorder   |
| **🎓 Education**      | `/api/educations`         | Education with attachments      |
| **🛠️ Tech Stack**     | `/api/techstacks`         | Multi-category tech stacks      |
| **🚀 Services**       | `/api/services`           | Services offered                |
| **📞 Contact**        | `/api/contact`            | Contact form submissions        |
| **🤖 AI Chat**        | `/api/chat`               | AI chatbot integration          |
| **📁 File Upload**    | `/api/upload`             | ImageKit file management        |

````

---

## 🧪 Quick Testing

### **Health Check**
```bash
curl http://localhost:3000/health
````

### **Get Hero Data**

```bash
curl http://localhost:3000/api/hero
```

### **Login & Get Token**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-password"}'
```

For complete testing examples and all endpoints, see the **[API Contract Documentation](docs/API_CONTRACT.md)**.

---

## 📚 Documentation

- **[API Contract](docs/API_CONTRACT.md)** - Complete API documentation with all endpoints, request/response examples, and testing guide

---

## 🔐 Database Models

| Model           | Description           | Key Features                                      |
| --------------- | --------------------- | ------------------------------------------------- |
| **Admin**       | Admin authentication  | JWT tokens, password hashing                      |
| **Hero**        | Landing page data     | Avatar, greeting, title, description, resume      |
| **About**       | About section         | Bio, summary                                      |
| **Project**     | Portfolio projects    | Tech stack arrays, soft delete, reorder           |
| **Experience**  | Work experiences      | Soft delete, reorder                              |
| **Education**   | Education history     | Attachments array, types, reorder                 |
| **Service**     | Services offered      | Soft delete                                       |
| **TechStack**   | Technologies & skills | Multi-category, proficiency, soft delete, reorder |
| **Contact**     | Contact messages      | Form submissions                                  |
| **ChatHistory** | AI conversations      | Session-based, auto-expiry                        |

---

## 🌐 Frontend Integration

### **Frontend Repository**

- **Location**: `D:\Coding\Next\Portofolio-Irpanzy`
- **Framework**: Next.js
- **Development**: `http://localhost:3001`
- **Production**: `https://irfanmuria.vercel.app`

### **API Integration Example**

```typescript
// lib/api/config.ts
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// lib/api/hero.ts
export async function getHero() {
  const res = await fetch(`${API_URL}/api/hero`);
  if (!res.ok) throw new Error("Failed to fetch hero data");
  return res.json();
}

// lib/api/techstack.ts
export async function getTechStacksByCategory(category: string) {
  const res = await fetch(`${API_URL}/api/techstacks?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch tech stacks");
  return res.json();
}
```

---

## 🔧 Development Notes

### **Code Standards**

- **ES Modules**: Using import/export (not CommonJS require)
- **Named Exports**: No default exports for consistency
- **TypeScript Strict**: Enabled for type safety
- **Prettier**: Code formatting with consistent style

### **Architecture Decisions**

- **Denormalized Tech Stack**: Store names in projects for performance (with cascade update)
- **Soft Delete**: Preserve data integrity with recycle bin functionality
- **Single Document Collections**: Hero and About are singleton models
- **Mixed Schema**: Project techStack supports both string and object arrays

### **Performance Optimizations**

- **Bulk Operations**: MongoDB bulkWrite for reorder operations
- **Indexed Queries**: Proper indexing for frequently queried fields
- **Connection Pooling**: Mongoose connection optimization
- **Rate Limiting**: Prevent API abuse

---

## 🚀 Deployment

### **Vercel**

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# - Connect GitHub repository
# - Configure environment variables
# - Deploy!

# 3. Production URL
https://your-project.vercel.app
```

**Complete deployment instructions available in the API Contract documentation.**

### **Environment Requirements**

- **Node.js**: 18+
- **MongoDB**: Atlas (recommended) or self-hosted
- **ImageKit**: Account for file storage
- **Google Gemini**: API key for AI features

---

## 📈 Performance & Monitoring

### **Built-in Monitoring**

- **Morgan Logging**: HTTP request logging
- **Error Handling**: Centralized error middleware
- **Health Check**: `/health` endpoint for uptime monitoring

### **Recommended Monitoring**

- **Vercel Analytics**: Built-in performance monitoring
- **MongoDB Atlas Monitoring**: Database performance
- **Uptime Monitoring**: External service (UptimeRobot, etc.)

---

## 🤝 Contributing

### **Code Style**

- Follow existing TypeScript patterns
- Use Prettier for formatting: `npm run format`
- Add proper type definitions
- Write descriptive commit messages

### **Adding New Features**

1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement feature with proper types and validation
3. Add documentation to `docs/`
4. Test endpoints with Postman/Thunder Client
5. Submit pull request

---

## 📄 License

**ISC License**

---

## 👤 Author

**Irfan Muria**

- **Portfolio**: [irfanmuria.vercel.app](https://irfanmuria.vercel.app)
- **GitHub**: [@irpanzy](https://github.com/irpanzy)
- **Email**: irfanmuria04@gmail.com

---

## 🎯 Project Status

- ✅ **Core API**: Complete
- ✅ **Authentication**: JWT implemented
- ✅ **File Upload**: ImageKit integration
- ✅ **AI Chat**: Gemini integration
- ✅ **Multi-Category Tech Stack**: Implemented
- ✅ **Cascade Update**: Implemented
- ✅ **Education API**: Implemented
- ✅ **Reorder Endpoints**: Implemented
- ✅ **Vercel Deployment**: Ready
- 🔄 **Frontend Integration**: In Progress
- 📝 **API Documentation**: Complete

---

**API Version**: 2.0.0  
**Last Updated**: December 2024  
**Node.js**: 18+  
**TypeScript**: 7.0+
