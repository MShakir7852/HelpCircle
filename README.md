<<<<<<< HEAD
# HelpCircle — Phase 2: Premium UI

Responsive React + Vite + Tailwind CSS v4 frontend for a community-help platform. Includes a landing page, responsive navbar/footer, category browsing, request cards, searchable/filterable Explore page, Create Request preview form, and Login/Register UI.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Routes

- `/` — Home / landing page
- `/explore` — Search, category, urgency, and neighbourhood filters (mock data)
- `/create-request` — Request form UI preview
- `/login` — Login UI preview
- `/register` — Registration UI preview

## Current scope

This phase uses sample data from `src/data.js`. Form submission, authentication, request persistence, verified helper matching, and blood donor workflows are not connected yet; those belong to later backend phases. Location labels in sample requests are illustrative, not live geolocation or actual nearby matches.

## Main structure

```text
frontend/src/
├── api/
├── components/
│   ├── CategoryCard.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── RequestCard.jsx
├── layouts/MainLayout.jsx
├── pages/
│   ├── Auth.jsx
│   ├── CreateRequest.jsx
│   ├── Explore.jsx
│   └── Home.jsx
├── App.jsx
├── data.js
├── index.css
└── main.jsx
```
=======
# HelpCircle — Local Community Help Platform

HelpCircle is a MERN application that connects people who need a service with nearby community service providers. A customer publishes a request with a service category and current coordinates; the API finds providers who offer that exact service and whose configured service radius covers the request.

## Implemented functionality

### Customer
- Register and log in with hashed passwords and JWT authentication.
- Browse live requests; search by title, description, service, category or neighbourhood.
- Filter by category, urgency and area.
- Create a help request using browser geolocation (GeoJSON `[longitude, latitude]`).
- See request status and assigned provider details.
- Cancel eligible requests and confirm completion after work is marked in progress.
- View a personal dashboard and request history.

### Service provider
- Register with a provider account type.
- Configure service types, service radius, availability, bio and current service location.
- Receive requests matched by service type and distance.
- Accept matched open requests and mark accepted work as in progress.
- View assigned/matched requests in the provider dashboard.

### Platform / API
- MongoDB persistence and geospatial `2dsphere` indexes.
- Nearby provider matching using `$near` and per-provider radius checks.
- Role-based authorization for customer/provider actions.
- Request lifecycle: `Open → Accepted → In progress → Completed`, with eligible cancellation.
- Input validation, centralized error handling, Helmet security headers, CORS and auth rate limiting.
- Health endpoint: `GET /api/health`.

## Tech stack

- Frontend: React 18, Vite, React Router, Tailwind CSS v4, Axios, Lucide, Sonner.
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs.

## Project structure

```text
HelpCircle/
├── backend/
│   ├── config/connectDb.js
│   ├── controllers/       # auth and request logic
│   ├── middleware/        # authentication and role checks
│   ├── models/            # User and HelpRequest
│   ├── routes/            # auth and request endpoints
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── src/api/           # Axios client and token attachment
    ├── src/context/       # Authentication state
    ├── src/components/
    ├── src/layouts/
    └── src/pages/         # Home, Explore, Auth, request, dashboard, provider profile
```

## Run locally

### Requirements
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env`, then set a strong private `JWT_SECRET` and your MongoDB URI:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/helpcircle
JWT_SECRET=use_a_long_random_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
MATCH_RADIUS_METERS=15000
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:3000`; test `http://localhost:3000/api/health`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start Vite:

```bash
npm run dev
```

Open `http://localhost:5173`.

## API reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create customer/provider account |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/me` | Authenticated | Current user |
| PATCH | `/api/auth/profile` | Authenticated | Update profile/provider setup |

Send authenticated requests with `Authorization: Bearer <token>`.

### Help requests

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/requests` | Public | Search/filter open requests; supports `q`, `category`, `urgency`, `area`, `status`, `page`, `limit` |
| GET | `/api/requests/:id` | Public | Request details |
| POST | `/api/requests` | Customer | Create a request and match nearby providers |
| GET | `/api/requests/mine` | Customer | Current user's requests |
| GET | `/api/requests/provider` | Provider | Matched/assigned requests |
| GET | `/api/requests/nearby-providers?lat=&lng=&serviceType=` | Public | Find nearby available providers |
| POST | `/api/requests/:id/accept` | Matched provider | Accept an open request |
| PATCH | `/api/requests/:id/status` | Owner/assigned provider | Start, complete or cancel eligible request |
| DELETE | `/api/requests/:id` | Owner/admin | Delete an open/cancelled request |

### Request payload example

```json
{
  "title": "Need an AC technician for a home visit",
  "category": "Home repairs",
  "serviceType": "AC repair",
  "description": "My AC is running but not cooling. Please inspect the unit.",
  "area": "Model Town",
  "urgency": "Today",
  "location": {
    "type": "Point",
    "coordinates": [74.3436, 31.4821]
  }
}
```

The browser asks the user for location permission on the create-request screen. Location is required for proximity matching. Use HTTPS in production; browsers generally restrict geolocation to secure origins (localhost is allowed for development).

## Important production checklist

This is a functional project baseline, not a fully audited production marketplace. Before public launch, add email/phone verification, password reset, refresh-token/session revocation, audit logs, provider identity verification, consent and location-retention controls, notification delivery (email/SMS/push), abuse reporting/moderation, pagination UI, automated tests, monitoring, backups and deployment-specific secrets. Do not use the included local `.env` values in production. A provider must configure services and location before they can be matched. The current app does not include real-time chat, online payments, reviews/ratings or a dedicated blood-donor verification workflow.

## Security and privacy notes

- Passwords are hashed with bcrypt before storage.
- JWT is required for private endpoints; role and ownership checks protect actions.
- The client stores the access token in local storage for this learning-project implementation. For a higher-security production deployment, consider secure, HttpOnly, SameSite cookies and a CSRF strategy.
- Precise coordinates are sensitive. Collect them only with clear consent, expose them only where needed, and define a deletion/retention policy before launch.
>>>>>>> e015e11 (first commit)
