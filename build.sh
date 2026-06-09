#!/bin/bash

# ================================================
# Railway Deploy Script for SIM Inventaris Laravel
# ================================================

set -e

echo "🚀 Starting deployment..."

# Install PHP dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies & build assets
echo "📦 Installing Node dependencies..."
npm ci

echo "🏗️ Building frontend assets..."
npm run build

# Setup environment
echo "⚙️ Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
fi

php artisan key:generate --force

# Storage & cache
echo "🔗 Setting up storage..."
php artisan storage:link --force

# Optimize
echo "⚡ Optimizing application..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Build completed successfully!"
