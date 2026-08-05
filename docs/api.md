# FreelanceFlow - API Documentation (v1)

## Base URL
`/api/v1`

---

## Authentication Endpoints (`/api/v1/auth`)

### 1. Register User
- **POST** `/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Tech Studio"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "FREELANCER"
    },
    "accessToken": "jwt_access_token"
  }
}
```

---

### 2. Login User
- **POST** `/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```
- **Response** (`200 OK`): Sets HTTP-only `refreshToken` cookie.
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "FREELANCER"
    },
    "accessToken": "jwt_access_token"
  }
}
```

---

### 3. Refresh Access Token
- **POST** `/auth/refresh`
- **Access**: Public (Cookie/Header)
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

---

### 4. Get Current User (`/auth/me`)
- **GET** `/auth/me`
- **Access**: Authenticated (`Bearer <accessToken>`)
- **Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "FREELANCER"
    }
  }
}
```

---

### 5. Logout User
- **POST** `/auth/logout`
- **Access**: Authenticated
- **Response** (`200 OK`): Clears `refreshToken` cookie.
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
