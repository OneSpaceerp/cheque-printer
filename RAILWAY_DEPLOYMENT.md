# Railway Deployment Guide

This guide will help you deploy the backend to Railway.

## The Issue

If you see this error:
```
⚠ Script start.sh not found
✖ Railpack could not determine how to build the app.
```

It means Railway is analyzing the root directory instead of the `backend` directory.

## Solution: Set Root Directory in Railway

### Method 1: Using Railway Dashboard (Recommended)

1. **Go to your Railway project:**
   - Open your project on [railway.app](https://railway.app)
   - Click on your service (or create a new service if you haven't)

2. **Set the Root Directory:**
   - Click on your service
   - Go to **Settings** tab
   - Scroll down to **Root Directory**
   - Enter: `backend`
   - Click **Save**

3. **Redeploy:**
   - Railway will automatically detect the change
   - It should now find `package.json` in the `backend` directory
   - The build should start automatically

### Method 2: Using Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Link your project:**
   ```bash
   railway link
   ```

4. **Set root directory:**
   ```bash
   railway variables set RAILWAY_ROOT_DIRECTORY=backend
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

## Step-by-Step Deployment

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

### Step 2: Configure Service

1. Railway will create a service automatically
2. Click on the service
3. Go to **Settings** tab
4. Set **Root Directory** to: `backend`
5. Railway will auto-detect:
   - **Language**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (from package.json)

### Step 3: Environment Variables (Optional)

Add these environment variables if needed:

- `PORT` - Railway sets this automatically, but you can override
- `NODE_ENV` - Set to `production`
- `ALLOWED_ORIGINS` - For CORS (comma-separated URLs)

To add environment variables:
1. Go to your service
2. Click **Variables** tab
3. Add variables as needed

### Step 4: Deploy

1. Railway will automatically deploy when you:
   - Push to your main branch (if connected to GitHub)
   - Or manually trigger a deployment

2. **Check deployment:**
   - Go to **Deployments** tab
   - Watch the build logs
   - Wait for "Deploy Succeeded"

3. **Get your URL:**
   - Go to **Settings** tab
   - Under **Domains**, you'll see your Railway URL
   - Example: `https://your-app.railway.app`

## Verification

After deployment, verify it's working:

1. **Check the URL:**
   - Visit: `https://your-app.railway.app/api/templates/CIB01`
   - Should return JSON data

2. **Check template images:**
   - Visit: `https://your-app.railway.app/templates/CIB01.png`
   - Should display the image

3. **Check logs:**
   - Go to **Deployments** tab
   - Click on latest deployment
   - Check for any errors

## Troubleshooting

### Issue: "Railpack could not determine how to build the app"

**Solution:**
- Make sure **Root Directory** is set to `backend` in Railway settings
- Verify `backend/package.json` exists
- Check that `backend/index.js` exists

### Issue: Build fails

**Check:**
- Node.js version (needs 18+)
- All dependencies are in `package.json`
- Build logs for specific errors

### Issue: Service won't start

**Check:**
- `package.json` has `"start": "node index.js"` script
- `index.js` file exists in backend directory
- Port is set correctly (Railway sets `PORT` automatically)

### Issue: Templates not found

**Check:**
- `templates/` directory exists in `backend/`
- Template files are committed to Git
- File paths are correct

## Project Structure Railway Expects

When Root Directory is set to `backend`, Railway sees:

```
backend/
├── package.json      ✅ Railway detects Node.js
├── index.js          ✅ Entry point
├── templates/        ✅ Static files
└── ...
```

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | Auto-set | Server port (Railway sets this) |
| `NODE_ENV` | No | - | Set to `production` |
| `ALLOWED_ORIGINS` | No | - | CORS allowed origins (comma-separated) |

## Next Steps

After backend is deployed:

1. ✅ Note your Railway URL
2. ✅ Deploy frontend to Vercel (see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md))
3. ✅ Set `VITE_API_URL` in frontend to your Railway URL
4. ✅ Configure CORS on backend with `ALLOWED_ORIGINS`

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

