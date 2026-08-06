#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_DIR="/home/ubuntu/apps/GigPulse"

cd "$PROJECT_DIR"

echo "Deploying GigPulse..."

git pull --ff-only origin main

echo "Installing backend dependencies..."
(cd backend && npm ci)

echo "Installing frontend dependencies..."
(cd frontend && npm ci)

echo "Building backend..."
(cd backend && npm run build)

echo "Building frontend..."
(cd frontend && npm run build)

echo "Running Prisma migrations..."
(cd backend && npx prisma migrate deploy)

echo "Restarting backend..."
pm2 restart gigpulse-api

echo "Restarting frontend..."
pm2 restart gigpulse-web

pm2 save

sleep 2

echo "Checking backend..."
curl --fail http://127.0.0.1:5000/api/v1/health > /dev/null

echo "Checking frontend..."
curl --fail http://127.0.0.1:3003 > /dev/null

echo "Deployment completed."