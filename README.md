# Laxman Tarihalkar — Full-Stack Developer Portfolio

A premium, cinematic personal portfolio for **Laxman Tarihalkar**, Full-Stack Developer from Belagavi, India. Built as a complete full-stack application: a React frontend backed by a Node.js/Express REST API and MongoDB.

> _"Building Digital Experiences Through Code."_

---

## ✨ Features

- **Cinematic hero** with full-screen autoplay/loop/muted video, burnt-orange gradient overlays, animated name reveal, and graceful fallback.
- **Editorial sections** — About (cream), Experience timeline (sand), Skills, Projects (charcoal), Contact (charcoal).
- **Dynamic projects** fetched live from MongoDB via the backend API (no hardcoded mock data).
- **Working contact form** with client + server validation, rate limiting, and MongoDB persistence. Optional email notifications via SMTP.
- **Secure admin dashboard** at `/admin` with JWT auth, bcrypt, HTTP-only cookies, project CRUD, and message management.
- **Security hardening** — Helmet, restricted CORS, rate limiting, input validation/sanitization, protected routes.
- **Animations** with Framer Motion (scroll-triggered, hero entrance, timeline, hover micro-interactions, scroll progress, back-to-top) with `prefers-reduced-motion` respected.
- **Fully responsive** — designed mobile-first, not just a shrunk desktop layout.
- **SEO** — semantic HTML, Open Graph metadata, favicon, lazy-loaded images.

---

## 🧱 Tech Stack

| Layer        | Tech                                                          |
| ------------ | ------------------------------------------------------------- |
| Frontend     | React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, Lucide |
| Backend      | Node.js, Express, REST APIs                                   |
| Database     | MongoDB Atlas (or local MongoDB), Mongoose                   |
| Auth         | JWT, bcrypt, HTTP-only cookies, role-based authorization       |
| Security     | Helmet, CORS, express-rate-limit, express-validator           |
| Email        | Nodemailer (optional SMTP)                                    |
| Deployment   | Frontend → Vercel, Backend → Render, DB → MongoDB Atlas        |

---

## 📁 Project Structure

```
My-Port-Folio/
├── client/                  # React + Vite frontend
│   ├── public/
│   │   ├── videos/hero-video.mp4
│   │   ├── images/           # profile, hero poster, project covers, OG, favicon
│   │   └── resume/resume.pdf
│   └── src/
│       ├── components/       # Navbar, Footer, ScrollProgress, BackToTop, SectionHeading
│       ├── sections/         # Hero, About, Experience, Skills, Projects, Contact
│       ├── pages/            # Home, NotFound
│       ├── admin/            # AdminLogin, AdminDashboard, ProtectedRoute, managers
│       ├── services/api.js   # centralized Axios client + endpoint helpers
│       ├── context/AuthContext.jsx
│       ├── hooks/            # useScrollSpy, useScrollProgress, useProjects
│       ├── data/portfolio.js # static editorial content
│       ├── App.jsx
│       └── main.jsx
├── server/                  # Express backend
│   ├── config/db.js
│   ├── controllers/          # auth, project, contact
│   ├── models/              # Admin, Project, Contact (Mongoose)
│   ├── routes/              # auth, project, contact
│   ├── middleware/          # auth, validate, errorHandler, rateLimiter
│   ├── validators/          # auth, project, contact
│   ├── utils/               # ApiError, apiResponse, sendEmail
│   ├── scripts/             # initAdmin, seedProjects
│   ├── app.js
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ (built and tested on Node 22)
- MongoDB — a local instance or a free MongoDB Atlas cluster

### 1. Backend setup
```bash
cd server
npm install
cp .env.example .env      # then edit the values
```

Edit `server/.env`:

| Variable           | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `PORT`             | Backend port (default 5000)                            |
| `MONGODB_URI`      | MongoDB connection string (local or Atlas)             |
| `JWT_SECRET`       | Long random string for signing tokens                  |
| `JWT_EXPIRES_IN`   | Token lifetime (e.g. `7d`)                             |
| `CLIENT_URL`       | Frontend origin for CORS (e.g. `http://localhost:5173`)|
| `ADMIN_EMAIL`      | Admin login email (used by init script)                |
| `ADMIN_PASSWORD`   | Admin login password (used by init script)             |
| `SMTP_*` / `EMAIL_FROM` | Optional SMTP for email notifications            |

Generate a JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Initialize the admin account and seed the initial projects:
```bash
npm run init-admin     # creates/updates the single admin from env vars
npm run seed           # inserts the 3 starter projects (idempotent)
```

Start the backend:
```bash
npm run dev            # nodemon, http://localhost:5000
```

### 2. Frontend setup
```bash
cd client
npm install
cp .env.example .env
```

`client/.env` (optional for local dev — Vite proxies `/api` to the backend):
```
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev           # http://localhost:5173
```

Open **http://localhost:5173** to view the site. The admin dashboard is at **http://localhost:5173/admin**.

---

## 🔐 Admin Access

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`.
2. Run `npm run init-admin` (in `server/`).
3. Go to `/admin` and log in with those credentials.

The dashboard (`/admin/dashboard`, protected) provides:
- **Overview** — total projects, featured projects, total messages, unread messages.
- **Projects** — create, edit, delete, manage tech tags, GitHub/live URLs, featured flag, display order.
- **Messages** — view, read, reply (via mailto), delete, automatic "mark as read" on open.

There is **no public admin registration**. The only way to create an admin is the one-time `init-admin` script, which hashes the password with bcrypt.

---

## 📡 API Reference

### Auth
| Method | Route              | Access | Description              |
| ------ | ----------------- | ------ | ------------------------ |
| POST   | `/api/auth/login`  | Public | Login, sets HTTP-only cookie |
| POST   | `/api/auth/logout` | Public | Clears the auth cookie    |
| GET    | `/api/auth/me`     | Admin  | Current session info       |

### Projects
| Method | Route               | Access | Description          |
| ------ | ------------------ | ------ | ------------------- |
| GET    | `/api/projects`     | Public | List all projects    |
| GET    | `/api/projects/:id` | Public | Get one (id or slug) |
| POST   | `/api/projects`     | Admin  | Create               |
| PUT    | `/api/projects/:id` | Admin  | Update               |
| DELETE | `/api/projects/:id` | Admin  | Delete               |

### Contact
| Method | Route                | Access | Description            |
| ------ | ------------------- | ------ | --------------------- |
| POST   | `/api/contact`       | Public | Submit a message (rate-limited) |
| GET    | `/api/contact`       | Admin  | List messages          |
| GET    | `/api/contact/:id`   | Admin  | Get one message        |
| PATCH  | `/api/contact/:id`   | Admin  | Update status          |
| DELETE | `/api/contact/:id`   | Admin  | Delete message         |

All admin routes require a valid JWT cookie; unauthenticated requests get `401`.

---

## 🌐 Deployment

### Frontend → Vercel
1. Import the repo, set the **Root Directory** to `client`.
2. Build command: `npm run build` · Output: `dist`.
3. Add env var `VITE_API_URL` = your Render backend URL (e.g. `https://your-api.onrender.com`).

### Backend → Render
1. New Web Service from the repo, Root Directory `server`.
2. Build: `npm install` · Start: `npm start`.
3. Add env vars: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (your Vercel URL), `NODE_ENV=production`, `ADMIN_*`, and optional `SMTP_*`.
4. After first deploy, run the `init-admin` and `seed` scripts once (Render shell or locally pointing at the Atlas URI).

### Database → MongoDB Atlas
1. Create a free cluster, add a database user, and whitelist IPs.
2. Copy the connection string into `MONGODB_URI`.

**Cookie note for production:** cookies use `secure` + `sameSite=none` when `NODE_ENV=production`, which requires HTTPS on both ends (Vercel + Render are HTTPS by default).

---

## 🖼️ Assets

| Asset            | Path                              | Status |
| ---------------- | --------------------------------- | ------ |
| Hero video       | `client/public/videos/hero-video.mp4` | ✅ In place (the uploaded cinematic video) |
| Resume           | `client/public/resume/resume.pdf`  | ⚠️ Placeholder — replace with the actual resume PDF |
| Portrait         | `client/public/images/profile.svg` | ⚠️ Placeholder — replace with the actual photo (use `profile.jpg`) |
| LinkedIn URL      | `client/src/data/portfolio.js`     | ⚠️ Empty placeholder — add the real profile URL |
| Project links    | Managed via admin dashboard       | ⚠️ Add real GitHub / live demo URLs per project |

To replace the resume: drop the real PDF at `client/public/resume/resume.pdf` (keep the filename). To replace the portrait: add a photo at `client/public/images/profile.jpg` and update the `<img src>` in `src/sections/About.jsx`.

---

## ✅ Verification

The application was tested end-to-end against a live MongoDB:

- Frontend production build succeeds (`npm run build`).
- API health check, public projects, contact submission, contact validation, admin login, HTTP-only cookie, session restore, wrong-password rejection, message listing, project create/update/delete, and logout — **16/16 API tests pass**.
- Vite dev proxy correctly forwards `/api` to the backend (projects load live from MongoDB).
- Static assets (hero video, resume PDF, profile image) all served with correct content types.

---

## 📝 Notes & Manual Configuration

- **No fabricated data:** professional experience, education, and skills use only the supplied resume content. Project GitHub/live URLs use clear placeholders until the real links are provided.
- **RentRide DB note:** the resume lists both MongoDB and Supabase. The project card displays the technologies as provided; verify the actual repository's primary database and adjust via the admin dashboard if needed.
- **Email:** SMTP is optional. With `SMTP_HOST` empty, contact messages still save to MongoDB — only the email notification is skipped.
- **Environment files are gitignored.** Never commit `.env`.
