# Deploying to Vercel

This guide covers deploying the Cheque Printing Application to Vercel. Since Vercel is optimized for frontend and serverless functions, we'll deploy the frontend on Vercel and the backend on a separate platform (or convert it to serverless functions).

## Option 1: Frontend on Vercel + Backend on Separate Platform (Recommended)

This is the easiest approach - deploy the frontend on Vercel and the backend on Railway, Render, or another Node.js hosting service.

### Step 1: Deploy Backend First

Deploy your backend to one of these platforms:

**Railway (Recommended):**
1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add a new service → Select your repo
5. Set **Root Directory** to `backend`
6. Railway will auto-detect Node.js and use the `start` script
7. Note the generated URL (e.g., `https://your-app.railway.app`)

**Render:**
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Name**: `cheque-printer-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Note the URL (e.g., `https://cheque-printer-backend.onrender.com`)

**Other Options:**
- DigitalOcean App Platform
- Heroku
- Fly.io
- Any Node.js hosting service

### Step 2: Deploy Frontend to Vercel

#### Method A: Using Vercel Dashboard (Easiest)

1. **Sign in to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - If the repo is private, grant Vercel access

3. **Configure Project:**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `frontend` ⚠️ **Important!**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variables:**
   - Click "Environment Variables"
   - Add a new variable:
     - **Name**: `VITE_API_URL`
     - **Value**: Your backend URL (e.g., `https://your-app.railway.app`)
     - **Environments**: Select all (Production, Preview, Development)
   - Click "Save"

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Method B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

4. **Deploy:**
   ```bash
   vercel
   ```

5. **Set Environment Variable:**
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL when prompted
   ```

6. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Step 3: Configure CORS on Backend

Update your backend's CORS configuration to allow your Vercel domain:

**If using Railway:**
1. Go to your Railway project
2. Add environment variable:
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-project.vercel.app,https://your-project-git-main.vercel.app`
3. Redeploy

**If using Render:**
1. Go to your Render service
2. Add environment variable:
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-project.vercel.app`
3. Redeploy

The backend code already supports this via the `ALLOWED_ORIGINS` environment variable.

### Step 4: Verify Deployment

1. Visit your Vercel URL
2. Open browser DevTools → Console
3. Check for any CORS errors
4. Verify template images load correctly
5. Test the application functionality

## Option 2: Full Stack on Vercel (Serverless Functions)

If you want everything on Vercel, you'll need to convert the backend Express server to Vercel serverless functions. This requires more changes but keeps everything in one place.

### Converting Backend to Serverless Functions

This approach converts your Express routes to Vercel serverless functions. Here's how:

1. **Create API directory structure:**
   ```
   frontend/
   ├── api/
   │   ├── convert/
   │   │   └── index.js
   │   ├── templates/
   │   │   └── [templateId].js
   │   └── templates-static/
   │       └── [...path].js
   ```

2. **Convert each endpoint to a serverless function**

3. **Handle static file serving for templates**

This is more complex and requires significant code changes. If you want this approach, I can help you convert the backend to serverless functions.

## Vercel Configuration

The `frontend/vercel.json` file is already configured with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration:
- ✅ Builds the Vite app correctly
- ✅ Handles React Router (if you add routing later)
- ✅ Serves the built files from `dist`

## Environment Variables

### Required for Frontend:
- `VITE_API_URL` - Your backend API URL

### Optional for Backend (if using separate platform):
- `PORT` - Server port (auto-set by most platforms)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `NODE_ENV` - Set to `production`

## Custom Domain

To use a custom domain on Vercel:

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. Update `VITE_API_URL` if needed
6. Update backend `ALLOWED_ORIGINS` to include your custom domain

## Troubleshooting

### Build Fails
- **Issue**: Build command fails
- **Solution**: Check that `frontend` is set as root directory
- **Solution**: Ensure Node.js version is 18+ (Vercel auto-detects)

### Environment Variables Not Working
- **Issue**: `VITE_API_URL` is undefined
- **Solution**: Ensure variable name starts with `VITE_`
- **Solution**: Rebuild after adding environment variables
- **Solution**: Check variable is set for the correct environment (Production/Preview/Development)

### CORS Errors
- **Issue**: Browser shows CORS errors
- **Solution**: Add your Vercel URL to backend `ALLOWED_ORIGINS`
- **Solution**: Include both `*.vercel.app` and custom domain if used
- **Solution**: Check backend CORS configuration

### Images Not Loading
- **Issue**: Template images return 404
- **Solution**: Verify `VITE_API_URL` points to correct backend
- **Solution**: Check backend serves `/templates` route correctly
- **Solution**: Verify template files exist in backend `templates/` directory

### 404 on Page Refresh
- **Issue**: Direct URL access returns 404
- **Solution**: The `vercel.json` rewrite rule should handle this
- **Solution**: Verify `vercel.json` is in the `frontend` directory

## Continuous Deployment

Vercel automatically deploys on every push to your main branch:

1. Push to `main` branch
2. Vercel detects the push
3. Builds and deploys automatically
4. Creates preview deployments for pull requests

## Preview Deployments

Every pull request gets its own preview URL:
- Format: `https://your-project-git-branch-name.vercel.app`
- Great for testing before merging
- Share with team for review

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Image optimization (if using Vercel Image component)
- ✅ Automatic compression

## Cost

- **Hobby Plan (Free)**: Perfect for personal projects
  - Unlimited deployments
  - 100GB bandwidth/month
  - Custom domains
- **Pro Plan**: For production apps
  - More bandwidth
  - Team collaboration
  - Advanced analytics

## Next Steps

1. ✅ Deploy backend to Railway/Render
2. ✅ Deploy frontend to Vercel
3. ✅ Set `VITE_API_URL` environment variable
4. ✅ Configure CORS on backend
5. ✅ Test the deployed application
6. ✅ Set up custom domain (optional)
7. ✅ Enable analytics (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Vite + Vercel: https://vercel.com/guides/deploying-vite

