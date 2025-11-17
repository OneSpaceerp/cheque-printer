# Railway Quick Fix

## Problem
```
⚠ Script start.sh not found
✖ Railpack could not determine how to build the app.
```

## Solution (2 minutes)

### Step 1: Set Root Directory in Railway

1. Go to your Railway project: https://railway.app
2. Click on your **service** (the service that's failing)
3. Click the **Settings** tab
4. Scroll down to **Root Directory**
5. Enter: `backend`
6. Click **Save**

### Step 2: Redeploy

Railway will automatically detect the change and redeploy. The build should now work because Railway will:
- Find `backend/package.json` ✅
- Detect Node.js ✅
- Run `npm install` ✅
- Run `npm start` ✅

## That's it!

Your backend should now deploy successfully. 

**Need more help?** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

