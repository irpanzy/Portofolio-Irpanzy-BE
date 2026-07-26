# Portfolio API Contract Documentation

## Base URL

- **Development**: `http://localhost:8000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

Most admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Common Response Format

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

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Chat endpoints: 10 requests per 15 minutes
- Contact endpoints: 3 requests per 15 minutes

---

## 1. Authentication (`/api/auth`)

### 1.1 Login

**POST** `/api/auth/login`

Login admin user and get JWT token.

**Rate Limit**: 5 req/15min

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "admin@example.com",
      "name": "Admin"
    }
  }
}
```

**Errors:**

- `400`: Missing required fields
- `401`: Invalid credentials
- `429`: Too many requests

---

### 1.2 Refresh Token

**POST** `/api/auth/refresh`

Get new access token and refresh token using old refresh token.

**Rate Limit**: None (public endpoint, no auth middleware)

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "email": "admin@example.com"
    }
  }
}
```

**Errors:**

- `401`: Refresh token is required
- `401`: Invalid or expired refresh token
- `404`: Admin not found

---

### 1.3 Get Profile

**GET** `/api/auth/profile`

Get authenticated admin profile.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "name": "Admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 1.4 Update Password

**PUT** `/api/auth/password`

Update admin password.

**Authentication**: Required

**Request Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Password updated successfully",
  "data": null
}
```

---

## 2. Projects (`/api/projects`)

### 2.1 Get All Projects

**GET** `/api/projects`

Get all active projects (not deleted).

**Query Parameters:**

- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10
- `sort` (optional): Sort field, default "-createdAt"

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Projects retrieved successfully",
  "data": {
    "projects": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "E-Commerce Platform",
        "description": "Full-stack e-commerce solution",
        "techStack": ["React", "Node.js", "MongoDB"],
        "imageUrl": "https://ik.imagekit.io/...",
        "demoUrl": "https://demo.example.com",
        "githubUrl": "https://github.com/user/repo",
        "featured": true,
        "order": 1,
        "deletedAt": null,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 10,
      "page": 1,
      "pages": 1
    }
  }
}
```

---

### 2.2 Get Single Project

**GET** `/api/projects/:id`

Get project by ID.

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Project retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce solution",
    "techStack": ["React", "Node.js", "MongoDB"],
    "imageUrl": "https://ik.imagekit.io/...",
    "demoUrl": "https://demo.example.com",
    "githubUrl": "https://github.com/user/repo",
    "featured": true,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `404`: Project not found

---

### 2.3 Create Project

**POST** `/api/projects`

Create new project.

**Authentication**: Required

**Request Body:**

```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution",
  "techStack": ["React", "Node.js", "MongoDB"],
  "imageUrl": "https://ik.imagekit.io/...",
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true,
  "order": 1
}
```

**Response (201):**

```json
{
  "statusCode": 201,
  "message": "Project created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-Commerce Platform",
    ...
  }
}
```

---

### 2.4 Update Project

**PUT** `/api/projects/:id`

Update existing project.

**Authentication**: Required

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "techStack": ["React", "Node.js"],
  "featured": false
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Project updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    ...
  }
}
```

---

### 2.5 Delete Project (Soft Delete)

**DELETE** `/api/projects/:id`

Soft delete project (move to trash).

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Project deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "deletedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 2.6 Get Trash

**GET** `/api/projects/trash`

Get all deleted projects.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Trash retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Deleted Project",
      "deletedAt": "2024-01-01T00:00:00.000Z",
      "deletedBy": "admin@example.com"
    }
  ]
}
```

---

### 2.7 Restore Project

**PATCH** `/api/projects/:id/restore`

Restore deleted project from trash.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Project restored successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "deletedAt": null
  }
}
```

---

### 2.8 Force Delete Project

**DELETE** `/api/projects/:id/force`

Permanently delete project.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Project permanently deleted",
  "data": null
}
```

---

## 3. Experiences (`/api/experiences`)

### 3.1 Get All Experiences

**GET** `/api/experiences`

Get all active experiences.

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Experiences retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2020-01-01T00:00:00.000Z",
      "endDate": "2023-12-31T00:00:00.000Z",
      "current": false,
      "description": "Led development team...",
      "achievements": ["Increased performance by 50%"],
      "techStack": ["React", "Node.js"],
      "companyLogo": "https://ik.imagekit.io/...",
      "order": 1
    }
  ]
}
```

---

### 3.2 Get Single Experience

**GET** `/api/experiences/:id`

Get experience by ID.

---

### 3.3 Create Experience

**POST** `/api/experiences`

Create new experience.

**Authentication**: Required

**Request Body:**

```json
{
  "company": "Tech Corp",
  "position": "Senior Developer",
  "startDate": "2020-01-01",
  "endDate": "2023-12-31",
  "current": false,
  "description": "Led development team...",
  "achievements": ["Increased performance by 50%"],
  "techStack": ["React", "Node.js"],
  "companyLogo": "https://ik.imagekit.io/...",
  "order": 1
}
```

---

### 3.4 Update Experience

**PUT** `/api/experiences/:id`

Update experience.

**Authentication**: Required

---

### 3.5 Delete Experience

**DELETE** `/api/experiences/:id`

Soft delete experience.

**Authentication**: Required

---

### 3.6 Get Trash

**GET** `/api/experiences/trash`

Get deleted experiences.

**Authentication**: Required

---

### 3.7 Restore Experience

**PATCH** `/api/experiences/:id/restore`

Restore deleted experience.

**Authentication**: Required

---

### 3.8 Force Delete Experience

**DELETE** `/api/experiences/:id/force`

Permanently delete experience.

**Authentication**: Required

---

## 4. Services (`/api/services`)

### 4.1 Get All Services

**GET** `/api/services`

Get all active services.

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Services retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Web Development",
      "description": "Custom web application development",
      "icon": "https://ik.imagekit.io/...",
      "features": ["Responsive Design", "SEO Optimized"],
      "order": 1
    }
  ]
}
```

---

### 4.2 Create Service

**POST** `/api/services`

Create new service.

**Authentication**: Required

**Request Body:**

```json
{
  "title": "Web Development",
  "description": "Custom web application development",
  "icon": "https://ik.imagekit.io/...",
  "features": ["Responsive Design", "SEO Optimized"],
  "order": 1
}
```

---

### 4.3-4.8 Other Service Endpoints

Same CRUD + soft delete pattern as Projects.

---

## 5. Tech Stack (`/api/techstacks`)

### 5.1 Get All Tech Stacks

**GET** `/api/techstacks`

Get all active tech stacks.

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Tech stacks retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "React",
      "category": "Frontend",
      "proficiency": 90,
      "logoUrl": "https://ik.imagekit.io/...",
      "order": 1
    }
  ]
}
```

---

### 5.2 Create Tech Stack

**POST** `/api/techstacks`

Create new tech stack.

**Authentication**: Required

**Request Body:**

```json
{
  "name": "React",
  "category": "Frontend",
  "proficiency": 90,
  "logoUrl": "https://ik.imagekit.io/...",
  "order": 1
}
```

---

### 5.3-5.8 Other Tech Stack Endpoints

Same CRUD + soft delete pattern as Projects.

---

## 6. About (`/api/about`)

### 6.1 Get About

**GET** `/api/about`

Get about information (single document).

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "About retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "title": "Full Stack Developer",
    "bio": "Passionate developer...",
    "profileImage": "https://ik.imagekit.io/...",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "socialLinks": {
      "github": "https://github.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "resume": "https://ik.imagekit.io/...",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

---

### 6.2 Update About

**PUT** `/api/about`

Update about information.

**Authentication**: Required

**Request Body:** (all fields optional)

```json
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "bio": "Passionate developer...",
  "profileImage": "https://ik.imagekit.io/...",
  "email": "john@example.com",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "socialLinks": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  },
  "skills": ["JavaScript", "React"]
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "About updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    ...
  }
}
```

---

## 7. Contact (`/api/contact`)

### 7.1 Create Contact

**POST** `/api/contact`

Submit contact form (public endpoint).

**Rate Limit**: 3 req/15min

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Response (201):**

```json
{
  "statusCode": 201,
  "message": "Contact message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project...",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7.2 Get All Contacts

**GET** `/api/contact`

Get all contact messages (admin only).

**Authentication**: Required

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page
- `isRead` (optional): Filter by read status (true/false)

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Contacts retrieved successfully",
  "data": {
    "contacts": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "subject": "Project Inquiry",
        "message": "I would like to discuss...",
        "isRead": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 5,
      "page": 1,
      "pages": 1
    }
  }
}
```

---

### 7.3 Get Single Contact

**GET** `/api/contact/:id`

Get contact message by ID.

**Authentication**: Required

---

### 7.4 Mark as Read

**PATCH** `/api/contact/:id/read`

Mark contact message as read.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Contact marked as read",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isRead": true
  }
}
```

---

### 7.5 Delete Contact

**DELETE** `/api/contact/:id`

Delete contact message (permanent).

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Contact deleted successfully",
  "data": null
}
```

---

## 8. Chat (`/api/chat`)

### 8.1 Chat with AI

**POST** `/api/chat`

Send message to AI chatbot with portfolio context.

**Rate Limit**: 10 req/15min

**Request Body:**

```json
{
  "message": "What technologies do you use?",
  "sessionId": "optional-session-id"
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Chat response generated",
  "data": {
    "response": "I specialize in React, Node.js, and MongoDB...",
    "sessionId": "507f1f77bcf86cd799439011",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 8.2 Get Chat History

**GET** `/api/chat/history/:sessionId`

Get chat history for a session.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Chat history retrieved",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "abc123",
    "messages": [
      {
        "role": "user",
        "content": "What technologies do you use?",
        "timestamp": "2024-01-01T00:00:00.000Z"
      },
      {
        "role": "assistant",
        "content": "I specialize in React...",
        "timestamp": "2024-01-01T00:00:01.000Z"
      }
    ]
  }
}
```

---

### 8.3 Delete Chat History

**DELETE** `/api/chat/history/:sessionId`

Delete chat session history.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Chat history deleted successfully",
  "data": null
}
```

---

## 9. Upload (`/api/upload`)

### 9.1 Upload Single File

**POST** `/api/upload/single`

Upload single file to ImageKit.

**Authentication**: Required

**Content-Type**: `multipart/form-data`

**Form Data:**

- `file`: File to upload (required)
- `category`: Folder category (optional)
  - Values: `PROJECTS`, `EXPERIENCES`, `SERVICES`, `TECHSTACKS`, `ABOUT`
  - Default: `GENERAL`

**Response (201):**

```json
{
  "statusCode": 201,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://ik.imagekit.io/...",
    "fileId": "abc123",
    "name": "image.jpg",
    "size": 102400,
    "folder": "/portfolio/projects"
  }
}
```

**Example cURL:**

```bash
curl -X POST http://localhost:8000/api/upload/single \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg" \
  -F "category=PROJECTS"
```

---

### 9.2 Upload Multiple Files

**POST** `/api/upload/multiple`

Upload multiple files (max 10).

**Authentication**: Required

**Content-Type**: `multipart/form-data`

**Form Data:**

- `files`: Files to upload (required, max 10)
- `category`: Folder category (optional)

**Response (201):**

```json
{
  "statusCode": 201,
  "message": "Files uploaded successfully",
  "data": {
    "results": [
      {
        "url": "https://ik.imagekit.io/...",
        "fileId": "abc123",
        "name": "image1.jpg",
        "size": 102400
      },
      {
        "url": "https://ik.imagekit.io/...",
        "fileId": "def456",
        "name": "image2.jpg",
        "size": 204800
      }
    ],
    "folder": "/portfolio/projects"
  }
}
```

---

### 9.3 Delete File

**DELETE** `/api/upload/:fileId`

Delete file from ImageKit.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "File deleted successfully",
  "data": {
    "fileId": "abc123"
  }
}
```

---

### 9.4 Get Optimized URL

**GET** `/api/upload/optimize/:fileId`

Get optimized image URL with transformations.

**Authentication**: Required

**Query Parameters:**

- `width`: Image width
- `height`: Image height
- `quality`: Image quality (1-100)
- `format`: Output format (webp, avif, jpg, png)

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Optimized URL generated",
  "data": {
    "url": "https://ik.imagekit.io/.../tr:w-800,h-600,q-80,f-webp"
  }
}
```

---

### 9.5 Initialize Folders

**POST** `/api/upload/initialize-folders`

Create all portfolio folders in ImageKit.

**Authentication**: Required

**Response (200):**

```json
{
  "statusCode": 200,
  "message": "Portfolio folder structure initialized successfully",
  "data": {
    "folders": [
      "/portfolio/projects",
      "/portfolio/experiences",
      "/portfolio/services",
      "/portfolio/techstacks",
      "/portfolio/about",
      "/portfolio"
    ]
  }
}
```

---

## Error Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 200  | Success                                 |
| 201  | Created                                 |
| 400  | Bad Request - Invalid input             |
| 401  | Unauthorized - Invalid or missing token |
| 403  | Forbidden - Insufficient permissions    |
| 404  | Not Found - Resource doesn't exist      |
| 409  | Conflict - Duplicate resource           |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error                   |

---

## Validation Errors

When validation fails, the response includes detailed error information:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

---

## Notes

1. **Pagination**: All list endpoints support pagination with `page` and `limit` query parameters
2. **Soft Delete**: Projects, Experiences, Services, and Tech Stacks support soft delete (trash/restore)
3. **File Upload**: Max file size 5MB per file
4. **Rate Limiting**: Different limits for different endpoint categories
5. **CORS**: Configured for specific origins (localhost:5173 and production frontend)
6. **Security**: All inputs are sanitized against NoSQL injection and XSS attacks using custom sanitizers (Express 5 compatible)

---

## Postman Collection

Import this base URL as environment variable:

```
BASE_URL=http://localhost:8000/api
```

For production:

```
BASE_URL=https://your-domain.com/api
```

---

**Last Updated**: July 26, 2026  
**API Version**: 1.0.0
