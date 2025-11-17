# Quick Start Deployment Guide

## 🐳 Docker Deployment (Easiest)

```bash
# 1. Clone and navigate
git clone <repository-url>
cd cheque-printer-feature-cheque-printing-app

# 2. Update API URL in docker-compose.yml (line 26)
# Change: VITE_API_URL=http://localhost:3001
# To: VITE_API_URL=https://your-backend-url.com

# 3. Deploy
docker-compose up -d

# 4. Check status
docker-compose ps
docker-compose logs -f
```

**Access:**
- Frontend: http://localhost
- Backend: http://localhost:3001

## ☁️ Cloud Deployment (Recommended)

### Option A: Vercel (Frontend) + Railway (Backend) ⭐ Easiest

**Quick Steps:**
1. Deploy backend to Railway:
   - New Project → Deploy from GitHub
   - **Set Root Directory to `backend`** ⚠️ Important!
   - See [RAILWAY_QUICK_FIX.md](./RAILWAY_QUICK_FIX.md) if you get build errors
2. Deploy frontend to Vercel:
   - Import GitHub repo
   - Root directory: `frontend`
   - Add env: `VITE_API_URL` = your Railway URL
   - Deploy!

**Detailed Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step instructions.

### Option B: Render (Both)

**Backend:**
1. New Web Service
2. Root: `backend`
3. Build: `npm install`
4. Start: `npm start`

**Frontend:**
1. New Static Site
2. Root: `frontend`
3. Build: `npm install && npm run build`
4. Publish: `dist`
5. Env: `VITE_API_URL` = backend URL

## 🔧 Environment Variables

**Backend:**
- `PORT` - Server port (auto-set by platforms)
- `ALLOWED_ORIGINS` - CORS origins (comma-separated)
- `NODE_ENV` - Set to `production` for production

**Frontend:**
- `VITE_API_URL` - Backend API URL

## ✅ Post-Deployment Checklist

- [ ] Backend responds at `/api/templates/CIB01`
- [ ] Frontend loads and connects to backend
- [ ] Template images display correctly
- [ ] No CORS errors in browser console
- [ ] HTTPS enabled (automatic on most platforms)

## 🆘 Common Issues

**Railway: "Railpack could not determine how to build the app":**
- Set Root Directory to `backend` in Railway service settings
- See [RAILWAY_QUICK_FIX.md](./RAILWAY_QUICK_FIX.md) for step-by-step fix

**CORS Error:**
- Set `ALLOWED_ORIGINS` env var in backend
- Format: `https://frontend-domain.com,https://www.frontend-domain.com`

**Images Not Loading:**
- Verify `VITE_API_URL` points to backend
- Check backend serves `/templates` correctly

**Build Fails:**
- Ensure Node.js 18+ is used
- Check all dependencies are in package.json

## 📚 Full Documentation

- **Railway Quick Fix**: [RAILWAY_QUICK_FIX.md](./RAILWAY_QUICK_FIX.md) - Fix Railway build errors
- **Railway Deployment**: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Complete Railway guide
- **Vercel Deployment**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Complete Vercel guide
- **Vercel Checklist**: [VERCEL_CHECKLIST.md](./VERCEL_CHECKLIST.md) - Step-by-step checklist
- **General Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md) - All deployment options

