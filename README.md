# Salata Rides Backend API

## Project Structure (Vercel-Ready)
```
/
├── api/
│   └── index.js          # Vercel serverless entry point
├── lib/
│   ├── db.js             # MongoDB connection
│   ├── models/
│   │   └── User.js       # User model
│   ├── routes/
│   │   └── auth.js       # Auth routes
│   └── middleware/
│       └── validation.js # Request validation
├── backend/              # Local development (optional)
├── vercel.json           # Vercel configuration
├── package.json
└── .env                  # Environment variables

```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env` file in root:
```env
MONGODB_URI=mongodb+srv://plantiqx_db_user:nuuAUM5CYPiImPKD@salatrides.r2gdla9.mongodb.net/salatarides?retryWrites=true&w=majority&appName=salatrides
JWT_SECRET=signup_jwt_secret_key_2024_secure
NODE_ENV=production
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

Or connect GitHub repo in Vercel dashboard and add environment variables.

## API Endpoints

Base URL: `https://salata-rides-backend.vercel.app`

### Root
```
GET /
```
Response:
```json
{
  "success": true,
  "message": "Salata Rides API is running",
  "status": "ok",
  "endpoints": {
    "signup": "/api/auth/signup",
    "test": "/api/auth/test"
  }
}
```

### Test Auth Route
```
GET /api/auth/test
```

### Signup
```
POST /api/auth/signup
```

Request Body:
```json
{
  "fullName": "Abbas Shaikh",
  "email": "abbas@example.com",
  "mobileNumber": "+919876543210",
  "gender": "Male",
  "age": "1995-05-15",
  "password": "Test@123",
  "confirmPassword": "Test@123"
}
```

Success Response (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Abbas Shaikh",
    "email": "abbas@example.com",
    "mobileNumber": "+919876543210"
  }
}
```

Error Response (400):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Testing with cURL

```bash
curl -X POST https://salata-rides-backend.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"mobileNumber\":\"+919876543210\",\"gender\":\"Male\",\"age\":\"1995-05-15\",\"password\":\"Test@123\",\"confirmPassword\":\"Test@123\"}"
```
