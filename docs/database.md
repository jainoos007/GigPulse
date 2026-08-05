# Database Schema & Entity Documentation

## Database Engine
- **RDBMS**: MySQL
- **ORM**: Prisma ORM

## Entities

### `users`
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique, Indexed)
- `password_hash` (VARCHAR)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `company_name` (VARCHAR, Optional)
- `avatar_url` (VARCHAR, Optional)
- `role` (ENUM: `FREELANCER`, `ASSISTANT`)
- `is_active` (BOOLEAN, Default: true)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `refresh_tokens`
- `id` (UUID, Primary Key)
- `token` (VARCHAR(500), Unique, Indexed)
- `user_id` (UUID, Foreign Key -> `users.id`)
- `expires_at` (TIMESTAMP)
- `revoked` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMP)
