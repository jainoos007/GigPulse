# Production Deployment Guide

## Architecture
- **Target Platform**: Oracle Cloud VPS / Ubuntu
- **Process Manager**: PM2
- **Web Server**: Nginx (Reverse Proxy & SSL Termination)
- **SSL**: Let's Encrypt / Certbot

## Environment Setup
1. Node.js (v18+) & NPM installed on server.
2. MySQL Server active & database created.
3. Configure `backend/.env` with production `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `CLIENT_ORIGIN`.

## Backend Build & Launch
```bash
cd backend
npm install
npx prisma migrate deploy
npm run build
pm2 start dist/server.js --name "freelanceflow-api"
```

## Frontend Build & Launch
```bash
cd frontend
npm install
npm run build
pm2 start npm --name "freelanceflow-web" -- start
```
