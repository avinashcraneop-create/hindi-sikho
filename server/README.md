# Hindi Sikho Backend

Node.js + Express + PostgreSQL API for Hindi Sikho.

## Railway variables

Set these on the backend service:

- `DATABASE_URL=${{hindi-sikho-db.DATABASE_URL}}`
- `JWT_SECRET=<long-random-secret>`

The PostgreSQL service should expose `DATABASE_URL`.

## Endpoints

GET `/health`
POST `/api/auth/signup`
POST `/api/auth/login`
GET `/api/me`
PATCH `/api/me`
GET `/api/progress`
POST `/api/progress`
