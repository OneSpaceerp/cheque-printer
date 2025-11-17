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

This application is designed to be easily deployable on platforms like Vercel (for the frontend) and Heroku or any Node.js hosting service (for the backend).

### Frontend (Vercel)

1.  Connect your Git repository to Vercel.
2.  Set the build command to `npm run build` and the output directory to `dist`.
3.  Add an environment variable for the backend API URL (e.g., `VITE_API_URL=https://your-backend-url.com`).

### Backend (Heroku)

1.  Create a new Heroku app.
2.  Connect your Git repository.
3.  Ensure your `package.json` has a `start` script: `"start": "node index.js"`.
4.  Deploy the `backend` directory.

## Enhancement Suggestions

*   **Multi-cheque batch printing:** Allow users to print multiple cheques at once.
*   **User accounts:** Implement user authentication to save cheque history and personal templates.
*   **Role permissions:** Create different user roles with varying levels of access.
*   **Export/import of templates:** Allow users to back up and share their custom templates.
