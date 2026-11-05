# Student CRUD Frontend (Vite + React + Tailwind)

A modern, responsive Single Page Application (SPA) with no modals, featuring split-view inline CRUD operations and live filtering for the Student Management API.

Repository: [https://github.com/senju-jeymz/student_crud](https://github.com/senju-jeymz/student_crud)

---

## Deploy to Render.com (Static Site)

### Quick 1-Click / Blueprint Deployment
This repository includes a `render.yaml` configuration. When creating a Blueprint on Render, it will auto-configure the build command and publish directory.

### Manual Step-by-Step Deployment on Render:

1. **Log in to Render**:
   - Open [dashboard.render.com](https://dashboard.render.com/).

2. **Create New Static Site**:
   - Click **New +** at the top right and select **Static Site**.
   - Connect your GitHub repository: `https://github.com/senju-jeymz/student_crud`.

3. **Configure Settings**:
   - **Name**: `student-crud-frontend` (or any name)
   - **Branch**: `main`
   - **Root Directory**: *(Leave empty)*
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   Under **Environment Variables**, add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your deployed backend URL (e.g., `https://student-backend.onrender.com`).
     *(If testing locally with the Vite proxy, leave this variable blank).*

5. **Redirects / Rewrites (SPA Routing)**:
   Under **Redirects/Rewrites**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

6. **Deploy**:
   - Click **Create Static Site**.
   - Render will automatically run the build and publish your site at `https://<your-subdomain>.onrender.com`.

---

## Local Development

```powershell
# Install dependencies
npm install

# Start local dev server (proxies /infante to http://localhost:8080)
npm run dev

# Build for production
npm run build
```
