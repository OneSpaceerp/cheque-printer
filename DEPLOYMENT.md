# Deployment Guide

This guide provides step-by-step instructions for deploying the Cheque Printing Application.

## Quick Start - Docker Deployment

The fastest way to deploy the entire application:

```bash
# 1. Clone the repository
git clone <repository-url>
cd cheque-printer-feature-cheque-printing-app

# 2. Update API URL in docker-compose.yml (if deploying to a server)
# Edit docker-compose.yml and change VITE_API_URL to your backend URL

# 3. Build and start
docker-compose up -d

# 4. Check logs
docker-compose logs -f
```

The application will be available at:
- Frontend: http://localhost (or your server IP)
- Backend: http://localhost:3001

## Platform-Specific Guides

### Deploying to Vercel (Frontend) + Railway (Backend)

#### Backend on Railway

1. **Create Railway Account:**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service:**
   - Railway will auto-detect Node.js
   - Set root directory to `backend`
   - Railway automatically uses the `start` script
   - Note the generated URL (e.g., `https://your-app.railway.app`)

4. **Deploy:**
   - Railway will automatically deploy on every push to main
   - Check the logs to ensure deployment succeeded

#### Frontend on Vercel

1. **Create Vercel Account:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub

2. **Import Project:**
   - Click "Add New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Configure Build:**
   - Framework Preset: Vite
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

4. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-app.railway.app`
   - Make sure to add it for Production, Preview, and Development

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like `https://your-app.vercel.app`

### Deploying to Render

#### Backend on Render

1. **Create Render Account:**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service:**
   - Name: `cheque-printer-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free or Paid

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy
   - Note the URL (e.g., `https://cheque-printer-backend.onrender.com`)

#### Frontend on Render

1. **Create Static Site:**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure:**
   - Name: `cheque-printer-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

3. **Environment Variables:**
   - Add: `VITE_API_URL` = `https://cheque-printer-backend.onrender.com`

4. **Deploy:**
   - Click "Create Static Site"
   - Render will build and deploy

### Deploying to DigitalOcean App Platform

#### Backend

1. **Create App:**
   - Go to DigitalOcean App Platform
   - Click "Create App"
   - Connect GitHub repository

2. **Configure Backend:**
   - Add a Component → Web Service
   - Source Directory: `backend`
   - Build Command: `npm install`
   - Run Command: `npm start`
   - HTTP Port: `3001`

3. **Environment Variables:**
   - `PORT`: `3001` (or use the auto-assigned port)

#### Frontend

1. **Add Frontend Component:**
   - In the same app, add a Component → Static Site
   - Source Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`

2. **Environment Variables:**
   - `VITE_API_URL`: Use the backend component's URL

3. **Deploy:**
   - Click "Create Resources"
   - DigitalOcean will deploy both services

## Environment Variables Reference

### Backend
- `PORT`: Server port (default: 3001, auto-set by most platforms)

### Frontend
- `VITE_API_URL`: Backend API URL
  - Development: `http://localhost:3001`
  - Production: Your backend deployment URL (e.g., `https://api.yourdomain.com`)

## Post-Deployment Checklist

- [ ] Backend is accessible and responding
- [ ] Frontend can connect to backend (check browser console)
- [ ] Template images are loading correctly
- [ ] CORS is configured correctly (if using separate domains)
- [ ] HTTPS is enabled (most platforms do this automatically)
- [ ] Environment variables are set correctly
- [ ] Application is working end-to-end

## Troubleshooting

### Backend Issues

**Port already in use:**
- Change the `PORT` environment variable
- Or stop the service using that port

**Templates not found:**
- Ensure the `templates` directory is included in deployment
- Check file paths are correct

**CORS errors:**
- Update CORS configuration in `backend/index.js` to allow your frontend domain

### Frontend Issues

**Can't connect to backend:**
- Verify `VITE_API_URL` is set correctly
- Check backend is running and accessible
- Verify CORS settings allow your frontend domain

**Build fails:**
- Check Node.js version (needs v18+)
- Clear `node_modules` and reinstall
- Check for TypeScript/ESLint errors

**Images not loading:**
- Verify backend URL is correct
- Check backend is serving static files from `/templates`
- Verify template files exist in backend

## Production Best Practices

1. **Use Environment Variables:** Never hardcode URLs or secrets
2. **Enable HTTPS:** Always use HTTPS in production
3. **Configure CORS:** Restrict CORS to your frontend domain only
4. **Set up Monitoring:** Use platform monitoring or external services
5. **Enable Logging:** Keep logs for debugging production issues
6. **Backup Templates:** Regularly backup the templates directory
7. **Rate Limiting:** Consider adding rate limiting to API endpoints
8. **Error Handling:** Implement proper error handling and user feedback

## Scaling Considerations

- **Backend:** Most platforms auto-scale, but monitor resource usage
- **Frontend:** Static sites scale automatically on CDN
- **Templates:** Consider moving to cloud storage (S3, Cloudinary) for large deployments
- **Database:** If you add user features, consider a database instead of JSON files

