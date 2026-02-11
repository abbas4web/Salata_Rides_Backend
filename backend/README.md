# Signup API

## Local Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure
3. Run: `npm run dev`

## Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
4. Deploy

## API Endpoints

Base URL (Production): `https://salata-rides-backend.vercel.app`

### Test Connection
GET `/` or GET `/api`

### Signup
POST `/api/auth/signup`

Request body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",
  "gender": "Male",
  "age": "1990-01-01",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "+1234567890"
  }
}
```
