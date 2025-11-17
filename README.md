# Cheque Printing Application

This is a full-stack web application that allows users to print Egyptian bank cheques using image-based templates.

## Features

*   **Cheque Template System:** Load cheque images as backgrounds and place draggable, resizable text fields for all necessary information.
*   **Multilingual Interface:** Full support for English and Arabic with RTL handling.
*   **Automatic Amount-to-Arabic-Words Conversion:** Automatically converts numeric amounts into the correct Arabic cheque wording.
*   **Printing Accuracy / Calibration:** Fine-tune print alignment with X and Y offset adjustments.

## Technology Stack

*   **Frontend:** React (Vite)
*   **Backend:** Node.js / Express
*   **Drag-and-Drop:** dnd-kit
*   **Storage:** JSON files

## Project Structure

```
/
├── backend/
│   ├── templates/      # Cheque images and JSON layouts
│   ├── arabic-converter.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ # React components
    │   ├── contexts/   # Language context
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── ...
    └── ...
```

## Setup and Installation

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running in Development Mode

You will need to run two servers concurrently: the backend API and the frontend development server.

1.  **Start the backend server:**
    Open a terminal and navigate to the `backend` directory.
    ```bash
    cd backend
    node index.js
    ```
    The server will start on `http://localhost:3001`.

2.  **Start the frontend server:**
    Open a second terminal and navigate to the `frontend` directory.
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or the next available port).

## Deployment

This application can be deployed using various methods. Choose the option that best fits your needs.

### Option 1: Docker Deployment (Recommended for Production)

The easiest way to deploy the entire application is using Docker Compose.

#### Prerequisites
- Docker and Docker Compose installed on your server

#### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Update the API URL in docker-compose.yml:**
   Edit `docker-compose.yml` and set the `VITE_API_URL` build argument to your backend URL:
   ```yaml
   args:
     - VITE_API_URL=https://your-backend-url.com
   ```

3. **Build and start the containers:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: `http://your-server-ip`
   - Backend API: `http://your-server-ip:3001`

#### For Production with Custom Domain

1. Use a reverse proxy (nginx/traefik) in front of the containers
2. Set up SSL certificates (Let's Encrypt)
3. Update `VITE_API_URL` to use your domain

### Option 2: Separate Frontend and Backend Deployment

#### Frontend Deployment (Vercel/Netlify)

**Vercel:**
1. Connect your Git repository to Vercel
2. Set the root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com`

**Netlify:**
1. Connect your Git repository to Netlify
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com`

#### Backend Deployment

**Railway:**
1. Create a new project on Railway
2. Connect your Git repository
3. **Important:** Set the **Root Directory** to `backend` in Railway service settings
4. Railway will automatically detect Node.js and use the `start` script
5. The `PORT` environment variable is automatically set by Railway

**⚠️ Having issues?** If you see "Railpack could not determine how to build the app", see [RAILWAY_QUICK_FIX.md](./RAILWAY_QUICK_FIX.md) for the solution.

**Render:**
1. Create a new Web Service on Render
2. Connect your Git repository
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Render automatically sets the `PORT` environment variable

**Heroku:**
1. Create a new Heroku app
2. Connect your Git repository
3. Set the root directory to `backend`:
   ```bash
   heroku git:remote -a your-app-name
   git subtree push --prefix backend heroku main
   ```
4. The `start` script in `package.json` will be used automatically

**DigitalOcean App Platform:**
1. Create a new app from GitHub
2. Select the `backend` directory as the source
3. Build command: `npm install`
4. Run command: `npm start`

### Option 3: Traditional VPS Deployment

1. **Set up a VPS** (Ubuntu/Debian recommended)

2. **Install Node.js and npm:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 for process management:**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone and set up backend:**
   ```bash
   cd /var/www
   git clone <repository-url> cheque-printer
   cd cheque-printer/backend
   npm install --production
   ```

5. **Start backend with PM2:**
   ```bash
   PORT=3001 pm2 start index.js --name cheque-backend
   pm2 save
   pm2 startup
   ```

6. **Set up frontend:**
   ```bash
   cd ../frontend
   npm install
   VITE_API_URL=http://your-server-ip:3001 npm run build
   ```

7. **Install and configure Nginx:**
   ```bash
   sudo apt-get install nginx
   sudo cp -r dist/* /var/www/html/
   ```

8. **Configure Nginx** (optional, for better setup):
   Create `/etc/nginx/sites-available/cheque-printer`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/cheque-printer/frontend/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/cheque-printer /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Environment Variables

#### Backend
- `PORT` - Server port (default: 3001)

#### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

**Note:** For Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Security Considerations

1. **CORS:** The backend currently allows all origins. For production, update the CORS configuration in `backend/index.js` to only allow your frontend domain.

2. **File Uploads:** If you plan to allow users to upload cheque templates, implement proper file validation and size limits.

3. **Rate Limiting:** Consider adding rate limiting to the API endpoints to prevent abuse.

4. **HTTPS:** Always use HTTPS in production. Most hosting platforms provide this automatically.

### Troubleshooting

- **Frontend can't connect to backend:** Ensure `VITE_API_URL` is set correctly and the backend is accessible
- **CORS errors:** Update the CORS configuration in the backend to allow your frontend domain
- **Port conflicts:** Change the `PORT` environment variable if the default port is in use
- **Template images not loading:** Ensure the `templates` directory is properly deployed with the backend

## Enhancement Suggestions

*   **Multi-cheque batch printing:** Allow users to print multiple cheques at once.
*   **User accounts:** Implement user authentication to save cheque history and personal templates.
*   **Role permissions:** Create different user roles with varying levels of access.
*   **Export/import of templates:** Allow users to back up and share their custom templates.
