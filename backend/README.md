# Signup API

## Local Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure
3. Run: `npm run dev`

## Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` (first time will link project)
3. Add environment variables in Vercel dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
4. Deploy: `vercel --prod`

Or use Vercel dashboard:
1. Import your GitHub repo
2. Set environment variables
3. Deploy

## API Endpoint
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
