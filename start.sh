#!/bin/bash

# ================================================
# Railway Start Script for SIM Inventaris Laravel
# ================================================

set -e

echo "🚀 Starting SIM Inventaris..."

# Create SQLite database file if not exists
echo "🗄️ Setting up SQLite database..."
mkdir -p database
touch database/database.sqlite

# Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Seed database with initial data (only if empty)
echo "🌱 Seeding database..."
php artisan db:seed --force

# Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ App is ready!"

# Start PHP built-in server (Railway will use PORT env variable)
php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
