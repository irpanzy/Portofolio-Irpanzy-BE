# 📚 Portfolio API Contract Documentation

**Version**: 2.0.0  
**Last Updated**: December 2024  
**Base Framework**: Express.js + TypeScript + MongoDB

---

## 🌐 Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-project.vercel.app/api`

---

## 🔐 Authentication

### **JWT Bearer Token**

Most admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### **Token Types**

- **Access Token**: Short-lived (7 days), used for API requests
- **Refresh Token**: Long-lived (30 days), used to get new access tokens

---

## 📊 Response Format

### **Success Response**

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {}
}
```

### **Error Response**

```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

---

## 🚦 Rate Limiting

| Endpoint Type      | Limit        | Window     |
| ------------------ | ------------ | ---------- |
| **General**        | 100 requests | 15 minutes |
| **Authentication** | 5 requests   | 15 minutes |
| **Chat**           | 10 requests  | 15 minutes |
| **Contact**        | 3 requests   | 15 minutes |

---

## 📋 API Endpoints

### **Endpoint Categories**

1. [🏠 Hero & About](#-hero--about) - Landing page data
2. [👤 Authentication](#-authentication) - Admin login system
3. [💼 Projects](#-projects) - Portfolio projects
4. [💻 Experiences](#-experiences) - Work experiences
5. [🎓 Education](#-education) - Education with attachments
6. [🛠️ Tech Stack](#️-tech-stack) - Multi-category technologies
7. [🚀 Services](#-services) - Services offered
8. [📞 Contact](#-contact) - Contact form
9. [🤖 AI Chat](#-ai-chat) - AI chatbot
10. [📁 File Upload](#-file-upload) - ImageKit integration

---

## 🏠 Hero & About

### **Hero API** (Landing Page Data)

#### **Get Hero Data**

```
GET /api/hero
```

**Description**: Get hero/landing page data (public endpoint)

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Hero data retrieved successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d0e",
    "avatarImage": "https://ik.imagekit.io/portfolio/avatar.png",
    "avatarImageFileId": "6748abc123def456",
    "greeting": "Hello! I'm Irfan Muria",
    "title": "Fullstack Web Developer Enthusiast",
    "description": "I build modern fullstack applications with React, Node.js, and cutting-edge technologies.",
    "resumeLink": "https://drive.google.com/file/d/your-resume-id",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Response Error (404)**:

```json
{
  "statusCode": 404,
  "message": "Hero data not found",
  "success": false
}
```

#### **Create Hero Data**

```
POST /api/hero
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "avatarImage": "https://ik.imagekit.io/portfolio/avatar.png",
  "avatarImageFileId": "6748abc123def456",
  "greeting": "Hello! I'm Irfan Muria",
  "title": "Fullstack Web Developer Enthusiast",
  "description": "I build modern fullstack applications with React, Node.js, and cutting-edge technologies.",
  "resumeLink": "https://drive.google.com/file/d/your-resume-id"
}
```

**Validation Rules**:

- `avatarImage`: Required string (min 1 character)
- `avatarImageFileId`: Optional string
- `greeting`: Optional string (default: "Hello! I'm Irfan Muria")
- `title`: Required string (min 1 character)
- `description`: Required string (min 1 character)
- `resumeLink`: Required string (must be valid URL)

**Response Success (201)**:

```json
{
  "statusCode": 201,
  "message": "Hero data created successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d0e",
    "avatarImage": "https://ik.imagekit.io/portfolio/avatar.png",
    "avatarImageFileId": "6748abc123def456",
    "greeting": "Hello! I'm Irfan Muria",
    "title": "Fullstack Web Developer Enthusiast",
    "description": "I build modern fullstack applications...",
    "resumeLink": "https://drive.google.com/file/d/your-resume-id",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

**Response Error (400)** - If hero already exists:

```json
{
  "statusCode": 400,
  "message": "Hero data already exists. Use PUT to update.",
  "success": false
}
```

#### **Update Hero Data**

```
PUT /api/hero
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body** (all fields optional):

```json
{
  "avatarImage": "https://ik.imagekit.io/portfolio/avatar-new.png",
  "avatarImageFileId": "new-file-id",
  "greeting": "Hi! I'm Irfan",
  "title": "Senior Fullstack Developer",
  "description": "Updated description...",
  "resumeLink": "https://drive.google.com/file/d/new-resume-id"
}
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Hero data updated successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d0e",
    "avatarImage": "https://ik.imagekit.io/portfolio/avatar-new.png",
    "greeting": "Hi! I'm Irfan",
    "title": "Senior Fullstack Developer",
    "description": "Updated description...",
    "resumeLink": "https://drive.google.com/file/d/new-resume-id",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T14:00:00.000Z"
  }
}
```

### **About API** (About Section Data)

#### **Get About Data**

```
GET /api/about
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "About data retrieved successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d0f",
    "bio": "I'm a passionate fullstack developer with 3+ years of experience in building modern web applications. I love learning new technologies and solving complex problems.",
    "summary": "Fullstack Developer | React & Node.js Enthusiast",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-01T10:00:00.000Z"
  }
}
```

#### **Create About Data**

```
POST /api/about
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "bio": "I'm a passionate fullstack developer with 3+ years of experience...",
  "summary": "Fullstack Developer | React & Node.js Enthusiast"
}
```

**Validation Rules**:

- `bio`: Required string (min 10 characters)
- `summary`: Optional string

#### **Update About Data**

```
PUT /api/about
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body** (all fields optional):

```json
{
  "bio": "Updated bio text...",
  "summary": "Updated summary"
}
```

---

## 👤 Authentication

### **Login**

```
POST /api/auth/login
Content-Type: application/json
```

**Request Body**:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "admin": {
      "_id": "674a1b2c3d4e5f6a7b8c9abc",
      "email": "admin@example.com",
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  }
}
```

**Response Error (401)**:

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "success": false
}
```

### **Refresh Token**

```
POST /api/auth/refresh
Content-Type: application/json
```

**Request Body**:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### **Logout**

```
POST /api/auth/logout
Authorization: Bearer <admin_token>
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Logout successful",
  "data": {}
}
```

---

## 💼 Projects

### **Get All Projects**

```
GET /api/projects
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d10",
      "title": "Portfolio Website",
      "description": "A responsive portfolio website built with Next.js and TypeScript.",
      "bgImage": "https://ik.imagekit.io/portfolio/project1.jpg",
      "bgImageFileId": "6748abc123def456",
      "demoLink": "https://portfolio.vercel.app",
      "githubLink": "https://github.com/user/portfolio",
      "techStack": ["Next.js", "TypeScript", "TailwindCSS"],
      "order": 1,
      "isVisible": true,
      "deletedAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Get Single Project**

```
GET /api/projects/:id
```

### **Create Project**

```
POST /api/projects
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "Portfolio Website",
  "description": "A responsive portfolio website built with Next.js and TypeScript.",
  "bgImage": "https://ik.imagekit.io/portfolio/project1.jpg",
  "bgImageFileId": "6748abc123def456",
  "demoLink": "https://portfolio.vercel.app",
  "githubLink": "https://github.com/user/portfolio",
  "techStack": ["Next.js", "TypeScript", "TailwindCSS"],
  "order": 1,
  "isVisible": true
}
```

**Validation Rules**:

- `title`: Required string (min 1 character)
- `description`: Required string (min 10 characters)
- `bgImage`: Required string (valid URL)
- `bgImageFileId`: Optional string
- `demoLink`: Optional string (valid URL)
- `githubLink`: Optional string (valid URL)
- `techStack`: Required array (min 1 item)
- `order`: Optional number (default: 0)
- `isVisible`: Optional boolean (default: true)

### **Update Project**

```
PUT /api/projects/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

### **Delete Project (Soft Delete)**

```
DELETE /api/projects/:id
Authorization: Bearer <admin_token>
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Project moved to trash",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d10",
    "title": "Portfolio Website",
    "deletedAt": "2024-12-01T15:00:00.000Z",
    "deletedBy": "674a1b2c3d4e5f6a7b8c9abc"
  }
}
```

### **Reorder Projects** 🆕

```
PATCH /api/projects/reorder
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "orders": [
    { "id": "674a1b2c3d4e5f6a7b8c9d10", "order": 1 },
    { "id": "674a1b2c3d4e5f6a7b8c9d11", "order": 2 },
    { "id": "674a1b2c3d4e5f6a7b8c9d12", "order": 3 }
  ]
}
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Projects reordered successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d10",
      "title": "Portfolio Website",
      "order": 1
    }
  ]
}
```

### **Trash Management**

#### **Get Trash**

```
GET /api/projects/trash
Authorization: Bearer <admin_token>
```

#### **Restore Project**

```
PATCH /api/projects/:id/restore
Authorization: Bearer <admin_token>
```

#### **Force Delete Project**

```
DELETE /api/projects/:id/force
Authorization: Bearer <admin_token>
```

---

## 💻 Experiences

### **Get All Experiences**

```
GET /api/experiences
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Experiences retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d20",
      "title": "Senior Frontend Developer",
      "company": "Tech Company Inc.",
      "location": "Jakarta, Indonesia",
      "startDate": "2023-01-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "description": "Leading frontend development team, architecting scalable React applications.",
      "logo": "https://ik.imagekit.io/portfolio/company-logo.png",
      "logoFileId": "6748abc123def789",
      "order": 1,
      "deletedAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Create Experience**

```
POST /api/experiences
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "Senior Frontend Developer",
  "company": "Tech Company Inc.",
  "location": "Jakarta, Indonesia",
  "startDate": "2023-01-01",
  "endDate": null,
  "current": true,
  "description": "Leading frontend development team, architecting scalable React applications.",
  "logo": "https://ik.imagekit.io/portfolio/company-logo.png",
  "logoFileId": "6748abc123def789",
  "order": 1
}
```

**Validation Rules**:

- `title`: Required string (min 1 character)
- `company`: Required string (min 1 character)
- `location`: Optional string
- `startDate`: Required string (ISO date format)
- `endDate`: Optional string (ISO date format)
- `current`: Optional boolean (default: false)
- `description`: Optional string
- `logo`: Optional string (valid URL)
- `logoFileId`: Optional string
- `order`: Optional number (default: 0)

### **Update Experience**

```
PUT /api/experiences/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

### **Delete Experience (Soft Delete)**

```
DELETE /api/experiences/:id
Authorization: Bearer <admin_token>
```

### **Reorder Experiences** 🆕

```
PATCH /api/experiences/reorder
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "orders": [
    { "id": "674a1b2c3d4e5f6a7b8c9d20", "order": 1 },
    { "id": "674a1b2c3d4e5f6a7b8c9d21", "order": 2 }
  ]
}
```

---

## 🎓 Education

### **Get All Educations**

```
GET /api/educations
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Educations retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d30",
      "institution": "Telkom University Purwokerto",
      "degree": "S1 Software Engineering",
      "location": "Jawa Tengah, Banyumas, Indonesia",
      "startDate": "2021-09-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "description": "Focus on software architecture, distributed systems, and modern web development.",
      "type": "formal",
      "logo": "https://ik.imagekit.io/portfolio/telkom-logo.png",
      "attachments": [
        {
          "title": "Certificate of Graduation",
          "url": "https://ik.imagekit.io/portfolio/certificate.jpg",
          "fileId": "6748abc123def456"
        },
        {
          "title": "Academic Transcript (GPA 3.85)",
          "url": "https://ik.imagekit.io/portfolio/transcript.jpg",
          "fileId": "6748abc123def457"
        }
      ],
      "order": 1,
      "isDeleted": false,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Create Education**

```
POST /api/educations
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "institution": "Telkom University Purwokerto",
  "degree": "S1 Software Engineering",
  "location": "Jawa Tengah, Banyumas, Indonesia",
  "startDate": "2021-09-01",
  "endDate": null,
  "current": true,
  "description": "Focus on software architecture, distributed systems, and modern web development.",
  "type": "formal",
  "logo": "https://ik.imagekit.io/portfolio/telkom-logo.png",
  "attachments": [
    {
      "title": "Certificate of Graduation",
      "url": "https://ik.imagekit.io/portfolio/certificate.jpg",
      "fileId": "6748abc123def456"
    },
    {
      "title": "Academic Transcript (GPA 3.85)",
      "url": "https://ik.imagekit.io/portfolio/transcript.jpg",
      "fileId": "6748abc123def457"
    }
  ],
  "order": 1
}
```

**Validation Rules**:

- `institution`: Required string (min 1 character)
- `degree`: Required string (min 1 character)
- `location`: Optional string
- `startDate`: Required string (ISO date format)
- `endDate`: Optional string (ISO date format)
- `current`: Optional boolean (default: false)
- `description`: Optional string
- `type`: Optional enum (`formal`, `bootcamp`, `certification`, `course`) - default: `formal`
- `logo`: Optional string (valid URL)
- `attachments`: Optional array of objects with `title`, `url`, `fileId`
- `order`: Optional number (default: 0)

### **Update Education**

```
PUT /api/educations/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body** (all fields optional):

```json
{
  "institution": "Updated University",
  "degree": "Updated Degree",
  "location": "Updated Location",
  "startDate": "2021-09-01",
  "endDate": "2025-06-30",
  "current": false,
  "description": "Updated description",
  "type": "formal",
  "logo": "https://...",
  "logoFileId": "abc123",
  "attachments": [
    {
      "title": "Updated Certificate Title", // ✅ CAN EDIT TITLE
      "url": "https://ik.imagekit.io/.../certificate.pdf",
      "fileId": "xyz789"
    }
  ],
  "order": 1
}
```

**Example: Update Document Title Only**

```json
{
  "attachments": [
    {
      "title": "Bachelor Degree Certificate", // ✅ Edit title here
      "url": "https://ik.imagekit.io/.../cert.pdf",
      "fileId": "abc123"
    },
    {
      "title": "Academic Transcript", // ✅ Multiple documents
      "url": "https://ik.imagekit.io/.../transcript.pdf",
      "fileId": "xyz789"
    }
  ]
}
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Education updated successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d30",
    "institution": "Updated University",
    "degree": "Updated Degree",
    "attachments": [
      {
        "title": "Bachelor Degree Certificate",
        "url": "https://...",
        "fileId": "abc123"
      }
    ]
  }
}
```

### **Delete Education (Soft Delete)**

```
DELETE /api/educations/:id
Authorization: Bearer <admin_token>
```

### **Reorder Educations** 🆕

```
PATCH /api/educations/reorder
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "orders": [
    { "id": "674a1b2c3d4e5f6a7b8c9d30", "order": 1 },
    { "id": "674a1b2c3d4e5f6a7b8c9d31", "order": 2 }
  ]
}
```

---

## 🛠️ Tech Stack

### **Get All Tech Stacks**

```
GET /api/techstacks
GET /api/techstacks?category=frontend
```

**Query Parameters**:

- `category`: Optional filter by category (returns tech stacks that include this category)
  - Valid values: `languages`, `frontend`, `backend`, `mobile`, `database`, `devops_cloud`, `tools`

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Tech stacks retrieved",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d40",
      "title": "Next.js",
      "icon": "https://ik.imagekit.io/portfolio/nextjs-universal.svg",
      "iconFileId": "6748abc123def456",
      "iconLight": "https://ik.imagekit.io/portfolio/nextjs-light.svg",
      "iconLightFileId": "6748abc123def457",
      "iconDark": "https://ik.imagekit.io/portfolio/nextjs-dark.svg",
      "iconDarkFileId": "6748abc123def458",
      "categories": ["frontend", "backend"],
      "proficiencyLevel": 4,
      "order": 1,
      "deletedAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    },
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d41",
      "title": "TypeScript",
      "icon": "https://ik.imagekit.io/portfolio/typescript-universal.svg",
      "iconFileId": "6748abc123def459",
      "iconLight": null,
      "iconLightFileId": null,
      "iconDark": null,
      "iconDarkFileId": null,
      "categories": ["languages"],
      "proficiencyLevel": 5,
      "order": 2,
      "deletedAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Create Tech Stack**

```
POST /api/techstacks
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "Next.js",
  "icon": "https://ik.imagekit.io/portfolio/nextjs-icon.svg",
  "iconFileId": "6748abc123def456",
  "categories": ["frontend", "backend"],
  "proficiencyLevel": 4,
  "order": 1
}
```

**Validation Rules**:

- `title`: Required string (min 1 character)
- `icon`: Optional string (valid URL)
- `iconFileId`: Optional string
- `categories`: Required array (min 1 item), each item must be valid category enum
- `proficiencyLevel`: Optional number (1-5)
- `order`: Optional number (default: 0)

**Available Categories**:

1. **languages** - Programming languages (JavaScript, TypeScript, Python, etc.)
2. **frontend** - Frontend frameworks/libraries (React, Vue, Angular, etc.)
3. **backend** - Backend frameworks (Express, NestJS, Django, etc.)
4. **mobile** - Mobile development (React Native, Flutter, Swift, etc.)
5. **database** - Databases (PostgreSQL, MongoDB, Redis, etc.)
6. **devops_cloud** - DevOps & Cloud (Docker, AWS, Kubernetes, etc.)
7. **tools** - Development tools (Git, VSCode, Postman, etc.)

### **Update Tech Stack** 🔄 (with Cascade Update & Theme Icons)

```
PUT /api/techstacks/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body** (all fields optional):

```json
{
  "title": "React.js",
  "icon": "https://ik.imagekit.io/portfolio/react-universal.svg",
  "iconLight": "https://ik.imagekit.io/portfolio/react-light.svg",
  "iconDark": "https://ik.imagekit.io/portfolio/react-dark.svg",
  "categories": ["frontend"],
  "proficiencyLevel": 5
}
```

**Theme Icon Support** 🎨:
All icon types (`icon`, `iconLight`, `iconDark`) support cascade update to projects.

**⚠️ Important**: When `title` or any icon field is updated, it automatically cascades to all projects using this tech stack (both string and object formats).

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Tech stack updated",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d40",
    "title": "React.js",
    "icon": "https://ik.imagekit.io/portfolio/react-new-icon.svg",
    "categories": ["frontend"],
    "proficiencyLevel": 5,
    "order": 1,
    "updatedAt": "2024-12-01T15:00:00.000Z"
  }
}
```

### **Delete Tech Stack (Soft Delete)**

```
DELETE /api/techstacks/:id
Authorization: Bearer <admin_token>
```

### **Reorder Tech Stacks** 🆕

```
PATCH /api/techstacks/reorder
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "orders": [
    { "id": "674a1b2c3d4e5f6a7b8c9d40", "order": 1 },
    { "id": "674a1b2c3d4e5f6a7b8c9d41", "order": 2 }
  ]
}
```

### **Multi-Category Support**

Tech stacks can now belong to multiple categories. Example use cases:

```json
{
  "title": "Next.js",
  "categories": ["frontend", "backend"]  // SSR capabilities
}

{
  "title": "TypeScript",
  "categories": ["languages", "frontend", "backend"]  // Used everywhere
}

{
  "title": "GraphQL",
  "categories": ["backend", "frontend"]  // API + Client
}
```

When querying `GET /api/techstacks?category=frontend`, all tech stacks containing "frontend" in their categories array will be returned.

---

## 🚀 Services

### **Get All Services**

```
GET /api/services
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Services retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d50",
      "title": "Full-Stack Web Development",
      "description": "Custom web applications built with modern technologies like React, Next.js, Node.js, and MongoDB.",
      "icon": "https://ik.imagekit.io/portfolio/web-dev-icon.svg",
      "iconFileId": "6748abc123def456",
      "features": [
        "Responsive Design",
        "SEO Optimization",
        "Performance Optimization",
        "API Integration"
      ],
      "price": "Starting from $500",
      "duration": "2-4 weeks",
      "order": 1,
      "isActive": true,
      "deletedAt": null,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "updatedAt": "2024-12-01T10:00:00.000Z"
    }
  ]
}
```

### **Create Service**

```
POST /api/services
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "Full-Stack Web Development",
  "description": "Custom web applications built with modern technologies...",
  "icon": "https://ik.imagekit.io/portfolio/web-dev-icon.svg",
  "iconFileId": "6748abc123def456",
  "features": [
    "Responsive Design",
    "SEO Optimization",
    "Performance Optimization",
    "API Integration"
  ],
  "price": "Starting from $500",
  "duration": "2-4 weeks",
  "order": 1,
  "isActive": true
}
```

**Validation Rules**:

- `title`: Required string (min 1 character)
- `description`: Required string (min 10 characters)
- `icon`: Optional string (valid URL)
- `iconFileId`: Optional string
- `features`: Optional array of strings
- `price`: Optional string
- `duration`: Optional string
- `order`: Optional number (default: 0)
- `isActive`: Optional boolean (default: true)

### **Update Service**

```
PUT /api/services/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
```

### **Delete Service (Soft Delete)**

```
DELETE /api/services/:id
Authorization: Bearer <admin_token>
```

---

## 📞 Contact

### **Submit Contact Form**

```
POST /api/contact
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hi, I'm interested in your web development services. Could we discuss my project requirements?"
}
```

**Validation Rules**:

- `name`: Required string (min 2, max 100 characters)
- `email`: Required string (valid email format)
- `subject`: Optional string (max 200 characters)
- `message`: Required string (min 10, max 1000 characters)

**Response Success (201)**:

```json
{
  "statusCode": 201,
  "message": "Contact message sent successfully",
  "data": {
    "_id": "674a1b2c3d4e5f6a7b8c9d60",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hi, I'm interested in your web development services...",
    "status": "unread",
    "createdAt": "2024-12-01T15:30:00.000Z"
  }
}
```

### **Get All Contact Messages** (Admin Only)

```
GET /api/contact
Authorization: Bearer <admin_token>
```

**Query Parameters**:

- `status`: Filter by status (`unread`, `read`, `replied`)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Contact messages retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d60",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "Hi, I'm interested in your web development services...",
      "status": "unread",
      "createdAt": "2024-12-01T15:30:00.000Z",
      "updatedAt": "2024-12-01T15:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10
  }
}
```

### **Update Contact Status**

```
PATCH /api/contact/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "status": "read"
}
```

### **Delete Contact Message**

```
DELETE /api/contact/:id
Authorization: Bearer <admin_token>
```

---

## 🤖 AI Chat

### **Send Chat Message**

```
POST /api/chat
Content-Type: application/json
```

**Request Body**:

```json
{
  "message": "What programming languages do you work with?",
  "sessionId": "optional-session-id"
}
```

**Validation Rules**:

- `message`: Required string (min 1, max 1000 characters)
- `sessionId`: Optional string (for conversation continuity)

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Chat response generated",
  "data": {
    "response": "I primarily work with JavaScript/TypeScript for both frontend and backend development. For frontend, I use React, Next.js, and Vue.js. On the backend, I work with Node.js, Express.js, and NestJS. I also have experience with Python for data processing and automation tasks.",
    "sessionId": "674a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    "timestamp": "2024-12-01T15:30:00.000Z"
  }
}
```

**Response Error (429) - Rate Limit**:

```json
{
  "statusCode": 429,
  "message": "Too many requests. Please wait before sending another message.",
  "success": false
}
```

### **Get Chat History** (Admin Only)

```
GET /api/chat/history
Authorization: Bearer <admin_token>
```

**Query Parameters**:

- `sessionId`: Filter by specific session
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "Chat history retrieved successfully",
  "data": [
    {
      "_id": "674a1b2c3d4e5f6a7b8c9d70",
      "sessionId": "674a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
      "userMessage": "What programming languages do you work with?",
      "aiResponse": "I primarily work with JavaScript/TypeScript...",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2024-12-01T15:30:00.000Z"
    }
  ]
}
```

### **Chat Features**

- **Session Management**: Maintains conversation context using sessionId
- **Rate Limiting**: 10 messages per 15 minutes per IP
- **Content Filtering**: Filters inappropriate content
- **Context Awareness**: AI has knowledge about the portfolio owner's skills and experience
- **History Tracking**: All conversations are logged for admin review

---

## 📁 File Upload (ImageKit Integration)

### **Upload File** (Images & PDF Documents) 📤

```
POST /api/upload/single
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Description**: Universal upload endpoint - supports both **images and PDF documents**. Perfect for photos, certificates, transcripts!

**Supported File Types**:

- **Images**: JPG, JPEG, PNG, WebP, SVG, GIF
- **Documents**: PDF, DOC, DOCX, TXT
- **Max Size**: 10MB per file

**Request Body (Form Data)**:

- `file`: File to upload (required)
- `folder`: Target folder in ImageKit (optional)
  - Options: `PROJECTS`, `EXPERIENCES`, `EDUCATIONS`, `ABOUT`, `TECHSTACKS`, `SERVICES`, `DOCUMENTS`, `GENERAL`

**cURL Examples**:

**Upload Image**:

```bash
curl -X POST \
  -H "Authorization: Bearer your_token" \
  -F "file=@/path/to/photo.jpg" \
  -F "folder=ABOUT" \
  https://your-domain.com/api/upload/single
```

**Upload PDF Certificate**:

```bash
curl -X POST \
  -H "Authorization: Bearer your_token" \
  -F "file=@/path/to/certificate.pdf" \
  -F "folder=EDUCATIONS" \
  https://your-domain.com/api/upload/single
```

**Response Success (201) - Image**:

```json
{
  "statusCode": 201,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://ik.imagekit.io/portfolio/about/profile-photo.jpg",
    "fileId": "abc123def456",
    "name": "profile-photo.jpg",
    "size": 245760,
    "folder": "/portfolio/about",
    "originalName": "profile-photo.jpg",
    "uploadedAt": "2024-12-01T10:00:00.000Z",
    "fileType": "image",
    "mimeType": "image/jpeg",
    "previewUrl": "https://ik.imagekit.io/portfolio/about/profile-photo.jpg",
    "isViewableInBrowser": true,
    "isPDF": false
  }
}
```

**Response Success (201) - PDF Document**:

```json
{
  "statusCode": 201,
  "message": "Document uploaded successfully (application/pdf)",
  "data": {
    "url": "https://ik.imagekit.io/portfolio/educations/graduation-certificate.pdf",
    "fileId": "xyz789ghi012",
    "name": "graduation-certificate.pdf",
    "size": 1245760,
    "folder": "/portfolio/educations",
    "originalName": "My Graduation Certificate.pdf",
    "uploadedAt": "2024-12-01T10:00:00.000Z",
    "fileType": "document",
    "mimeType": "application/pdf",
    "previewUrl": "https://ik.imagekit.io/portfolio/educations/graduation-certificate.pdf#view=FitH",
    "isViewableInBrowser": true,
    "isPDF": true
  }
}
```

**Supported File Types**:

- **Images**: JPG, JPEG, PNG, GIF, WebP, SVG (max 5MB each, 10MB for GIFs)
- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF (max 10MB for presentations/PDFs, 5MB for others)
- **Special Features**:
  - PDF documents get browser preview URL with `#view=FitH`
  - Images automatically get thumbnail versions
  - Documents include file type icons and descriptions
  - Viewable documents can be previewed directly in browser

### **Delete File**

```
DELETE /api/upload/:fileId
Authorization: Bearer <admin_token>
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "File deleted successfully",
  "data": {
    "fileId": "6748abc123def456",
    "deleted": true
  }
}
```

### **Get File Details**

```
GET /api/upload/:fileId
Authorization: Bearer <admin_token>
```

**Response Success (200)**:

```json
{
  "statusCode": 200,
  "message": "File details retrieved successfully",
  "data": {
    "fileId": "6748abc123def456",
    "name": "image.jpg",
    "url": "https://ik.imagekit.io/portfolio/projects/image.jpg",
    "filePath": "/projects/image.jpg",
    "size": 245760,
    "fileType": "image",
    "mime": "image/jpeg",
    "createdAt": "2024-12-01T10:00:00.000Z"
  }
}
```

### **Image Transformations**

ImageKit provides real-time image transformations via URL parameters:

```
# Resize to 300x300
https://ik.imagekit.io/portfolio/image.jpg?tr=w-300,h-300

# Create thumbnail with quality optimization
https://ik.imagekit.io/portfolio/image.jpg?tr=w-150,h-150,q-80

# Convert format and compress
https://ik.imagekit.io/portfolio/image.jpg?tr=f-webp,q-70
```

---

## 🧪 Testing Examples

### **Authentication Flow**

1. **Login**:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'
```

2. **Use Token**:

```bash
# Save token from login response
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# Use in subsequent requests
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

### **CRUD Operations Example (Projects)**

```bash
# 1. Create Project
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce built with Next.js and Node.js",
    "bgImage": "https://ik.imagekit.io/portfolio/ecommerce.jpg",
    "demoLink": "https://ecommerce-demo.vercel.app",
    "githubLink": "https://github.com/user/ecommerce",
    "techStack": ["Next.js", "Node.js", "MongoDB", "Stripe"],
    "order": 1,
    "isVisible": true
  }'

# 2. Get All Projects
curl -X GET http://localhost:3000/api/projects

# 3. Update Project
curl -X PUT http://localhost:3000/api/projects/674a1b2c3d4e5f6a7b8c9d10 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Platform v2",
    "description": "Updated description with new features"
  }'

# 4. Reorder Projects
curl -X PATCH http://localhost:3000/api/projects/reorder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orders": [
      { "id": "674a1b2c3d4e5f6a7b8c9d10", "order": 2 },
      { "id": "674a1b2c3d4e5f6a7b8c9d11", "order": 1 }
    ]
  }'

# 5. Delete Project (Soft Delete)
curl -X DELETE http://localhost:3000/api/projects/674a1b2c3d4e5f6a7b8c9d10 \
  -H "Authorization: Bearer $TOKEN"
```

### **Tech Stack with Multi-Category**

```bash
# Create tech stack with theme-specific icons
curl -X POST http://localhost:3000/api/techstacks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React",
    "icon": "https://ik.imagekit.io/portfolio/react-universal.svg",
    "iconLight": "https://ik.imagekit.io/portfolio/react-light.svg",
    "iconDark": "https://ik.imagekit.io/portfolio/react-dark.svg",
    "categories": ["frontend"],
    "proficiencyLevel": 5,
    "order": 1
  }'

# Create tech stack with universal icon only
curl -X POST http://localhost:3000/api/techstacks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Node.js",
    "icon": "https://ik.imagekit.io/portfolio/nodejs.svg",
    "categories": ["backend"],
    "proficiencyLevel": 4,
    "order": 2
  }'

# Filter by category
curl -X GET "http://localhost:3000/api/techstacks?category=frontend"
```

### **Contact Form Submission**

```bash
# Submit contact form (public endpoint)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hi, I would like to discuss a web development project with you."
  }'
```

### **Chat with AI**

```bash
# Send message to AI chatbot
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What technologies do you specialize in?",
    "sessionId": "optional-session-id"
  }'
```

### **File Upload**

```bash
# Upload education certificate (PDF)
curl -X POST http://localhost:3000/api/upload/education-document \
  -H "Authorization: Bearer $TOKEN" \
  -F "document=@./certificate.pdf"

# Upload education transcript (PDF)
curl -X POST http://localhost:3000/api/upload/education-document \
  -H "Authorization: Bearer $TOKEN" \
  -F "document=@./transcript.pdf"

# Upload general image file
curl -X POST http://localhost:3000/api/upload/single \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@./profile-image.jpg" \
  -F "folder=ABOUT"
```

---

## 🚀 Deployment & Environment

### **Environment Variables**

Create `.env` file with the following variables:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/portfolio
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# ImageKit (File Upload)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Google Gemini AI (Chat)
GEMINI_API_KEY=your_gemini_api_key

# Server
PORT=3000
NODE_ENV=production
```

### **Vercel Deployment**

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Deployment Steps**:

1. **Build the project**:

```bash
npm run build
```

2. **Deploy to Vercel**:

```bash
npx vercel
# or
vercel --prod
```

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env` file

### **Local Development**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📚 API Summary

### **Public Endpoints** (No Authentication Required)

- `GET /api/hero` - Get hero/landing page data
- `GET /api/about` - Get about section data
- `GET /api/projects` - Get all visible projects
- `GET /api/projects/:id` - Get single project
- `GET /api/experiences` - Get all experiences
- `GET /api/educations` - Get all educations
- `GET /api/techstacks` - Get all tech stacks
- `GET /api/services` - Get all active services
- `POST /api/contact` - Submit contact form
- `POST /api/chat` - Send message to AI chatbot

### **Admin Endpoints** (Authentication Required)

All CREATE, UPDATE, DELETE operations require JWT authentication:

- **Authentication**: `/api/auth/*`
- **Hero Management**: `POST/PUT /api/hero`
- **About Management**: `POST/PUT /api/about`
- **Project Management**: `POST/PUT/DELETE /api/projects/*`
- **Experience Management**: `POST/PUT/DELETE /api/experiences/*`
- **Education Management**: `POST/PUT/DELETE /api/educations/*`
- **Tech Stack Management**: `POST/PUT/DELETE /api/techstacks/*`
- **Service Management**: `POST/PUT/DELETE /api/services/*`
- **Contact Management**: `GET/PATCH/DELETE /api/contact/*`
- **File Management**: `POST/GET/DELETE /api/upload/*`
- **Chat History**: `GET /api/chat/history`
- **Reorder Endpoints**: `PATCH /api/{entity}/reorder`

### **Special Features** 🌟

1. **Multi-Category Tech Stack**: Tech stacks can belong to multiple categories
2. **Cascade Updates**: Tech stack title/icon changes auto-update all projects
3. **Soft Delete**: All delete operations are soft deletes with trash management
4. **Reorder Endpoints**: Drag-and-drop reordering for projects, experiences, etc.
5. **Education Attachments**: Support for certificates and documents
6. **Hero/About Separation**: Dedicated hero model for landing page data
7. **AI Chat Integration**: Smart chatbot with context awareness
8. **ImageKit Integration**: Advanced file upload with real-time transformations
9. **PDF Upload Support**: Upload photos AND PDF documents in one unified endpoint
10. **Rate Limiting**: Protection against abuse and spam
11. **Comprehensive Error Handling**: Detailed error messages and validation

---

## 📞 Support & Contact

For technical support or questions about this API:

- **Developer**: Irfan Muria
- **Email**: admin@example.com
- **Documentation**: [API Contract](./API_CONTRACT.md)
- **GitHub**: [Repository Link](https://github.com/your-username/portfolio-be)

---

**© 2024 Portfolio API - Built with Express.js & TypeScript**

---

## 🎨 Theme-Specific Icons Feature

Tech Stack now supports 3 types of icons for better theme compatibility:

### **Icon Types**

1. **Universal Icon** (`icon` + `iconFileId`)
   - Fallback icon that works on both light and dark themes
   - Required when creating tech stacks
   - Used when theme-specific icons are not available

2. **Light Mode Icon** (`iconLight` + `iconLightFileId`)
   - Optimized for light theme backgrounds
   - Optional field
   - Takes priority over universal icon in light mode

3. **Dark Mode Icon** (`iconDark` + `iconDarkFileId`)
   - Optimized for dark theme backgrounds
   - Optional field
   - Takes priority over universal icon in dark mode

### **Frontend Integration**

```javascript
function getTechStackIcon(tech, theme) {
  // Priority: theme-specific > universal > default
  if (theme === "light" && tech.iconLight) {
    return tech.iconLight;
  }
  if (theme === "dark" && tech.iconDark) {
    return tech.iconDark;
  }
  return tech.icon || "/default-tech-icon.svg";
}
```

### **API Examples**

```bash
# Create with all icon types
curl -X POST http://localhost:3000/api/techstacks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React",
    "icon": "https://ik.imagekit.io/portfolio/react-universal.svg",
    "iconLight": "https://ik.imagekit.io/portfolio/react-light.svg",
    "iconDark": "https://ik.imagekit.io/portfolio/react-dark.svg",
    "categories": ["frontend"]
  }'

# Update only dark mode icon
curl -X PUT http://localhost:3000/api/techstacks/:id \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "iconDark": "https://ik.imagekit.io/portfolio/react-new-dark.svg"
  }'
```

### **Cascade Update Support**

All icon types support cascade updates:

- When `icon`, `iconLight`, or `iconDark` is updated
- Changes automatically propagate to all projects using this tech stack
- Both string and object format project references are updated

This ensures consistency across the portfolio when tech stack visuals are updated! 🚀
