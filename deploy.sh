#!/bin/bash

# Deployment script for Cheque Printing Application
# This script helps deploy the application using Docker Compose

set -e

echo "🚀 Cheque Printing Application Deployment Script"
echo "================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Ask for backend URL
read -p "Enter your backend URL (or press Enter for http://localhost:3001): " BACKEND_URL
BACKEND_URL=${BACKEND_URL:-http://localhost:3001}

echo ""
echo "📦 Building and starting containers..."
echo "Backend URL: $BACKEND_URL"
echo ""

# Update docker-compose.yml with the backend URL
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|VITE_API_URL=.*|VITE_API_URL=$BACKEND_URL|" docker-compose.yml
else
    # Linux
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=$BACKEND_URL|" docker-compose.yml
fi

# Build and start containers
docker-compose up -d --build

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📍 Application URLs:"
echo "   Frontend: http://localhost"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📊 To view logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop:"
echo "   docker-compose down"
echo ""

