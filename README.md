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
