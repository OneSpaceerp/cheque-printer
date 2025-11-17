# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

- [ ] Backend is deployed and accessible (Railway, Render, etc.)
- [ ] Backend URL is noted (e.g., `https://your-app.railway.app`)
- [ ] Backend CORS is configured (or ready to configure)
- [ ] GitHub repository is ready
- [ ] Vercel account is created

## Backend Deployment

- [ ] Backend deployed to Railway/Render/other platform
- [ ] Backend URL is accessible (test in browser)
- [ ] Backend `/api/templates/CIB01` endpoint works
- [ ] Backend serves `/templates/*.png` files correctly
- [ ] Backend `ALLOWED_ORIGINS` env var is set (or ready to set)

## Frontend Deployment on Vercel

### Step 1: Import Project
- [ ] Signed in to Vercel
- [ ] Clicked "Add New Project"
- [ ] Selected GitHub repository
- [ ] Granted Vercel access to repo (if private)

### Step 2: Configure Project
- [ ] **Root Directory**: Set to `frontend` ⚠️ **CRITICAL**
- [ ] **Framework Preset**: Vite (auto-detected)
- [ ] **Build Command**: `npm run build` (auto-detected)
- [ ] **Output Directory**: `dist` (auto-detected)
- [ ] **Install Command**: `npm install` (auto-detected)

### Step 3: Environment Variables
- [ ] Added `VITE_API_URL` environment variable
- [ ] Value set to backend URL (e.g., `https://your-app.railway.app`)
- [ ] Variable enabled for Production
- [ ] Variable enabled for Preview (optional but recommended)
- [ ] Variable enabled for Development (optional)

### Step 4: Deploy
- [ ] Clicked "Deploy"
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] Deployment URL is accessible

## Post-Deployment

### Backend Configuration
- [ ] Updated `ALLOWED_ORIGINS` on backend to include Vercel URL
- [ ] Backend redeployed with new CORS settings
- [ ] Backend URL format: `https://your-project.vercel.app`

### Testing
- [ ] Frontend loads at Vercel URL
- [ ] No console errors in browser DevTools
- [ ] Template images load correctly
- [ ] No CORS errors in console
- [ ] Application functionality works
- [ ] Tested on different browsers
- [ ] Tested on mobile devices (optional)

### Optional: Custom Domain
- [ ] Custom domain added in Vercel settings
- [ ] DNS records configured correctly
- [ ] SSL certificate issued (automatic)
- [ ] Custom domain works
- [ ] Updated `VITE_API_URL` if needed
- [ ] Updated backend `ALLOWED_ORIGINS` to include custom domain

## Troubleshooting Checklist

If something doesn't work:

- [ ] Checked Vercel build logs for errors
- [ ] Verified `VITE_API_URL` is set correctly
- [ ] Tested backend URL directly in browser
- [ ] Checked browser console for errors
- [ ] Verified CORS configuration on backend
- [ ] Checked Network tab for failed requests
- [ ] Verified root directory is `frontend`
- [ ] Rebuilt after changing environment variables

## Common Issues & Solutions

### ❌ Build Fails
- **Check**: Root directory is `frontend`
- **Check**: Node.js version (needs 18+)
- **Check**: Build logs for specific errors

### ❌ Environment Variable Not Working
- **Check**: Variable name starts with `VITE_`
- **Check**: Rebuild after adding variable
- **Check**: Variable enabled for correct environment

### ❌ CORS Errors
- **Fix**: Add Vercel URL to backend `ALLOWED_ORIGINS`
- **Fix**: Include both `*.vercel.app` and custom domain
- **Fix**: Redeploy backend after CORS changes

### ❌ Images Not Loading
- **Check**: `VITE_API_URL` points to correct backend
- **Check**: Backend serves `/templates` route
- **Check**: Template files exist in backend

### ❌ 404 on Refresh
- **Check**: `vercel.json` exists in `frontend` directory
- **Check**: Rewrite rule is configured

## Success Criteria

✅ Frontend is live on Vercel  
✅ Backend is accessible  
✅ No CORS errors  
✅ Images load correctly  
✅ Application works end-to-end  
✅ Custom domain works (if configured)  

## Next Steps After Deployment

- [ ] Set up monitoring/analytics
- [ ] Configure custom domain (if needed)
- [ ] Set up preview deployments for PRs
- [ ] Document deployment process for team
- [ ] Set up automated backups (if needed)

---

**Need Help?** Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

