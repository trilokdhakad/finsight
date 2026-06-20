# FinSight – Personal Finance Tracker

A full-stack personal finance management platform that helps users track expenses, manage categories, analyze spending patterns, and gain actionable financial insights through interactive dashboards and analytics.

## Live Demo

Frontend: https://finsight-two-omega.vercel.app

Backend API: https://finsight-4hud.onrender.com

---

## Features

### Authentication & Security

* JWT-based authentication
* Refresh token mechanism
* Protected API routes
* Secure password hashing using bcrypt
* Rate limiting and security middleware

### Transaction Management

* Create, update, delete transactions
* Track income and expenses
* Categorize financial activities
* Multiple payment methods support
* User-specific financial records

### Category Management

* Create custom categories
* Income and expense category separation
* Category statistics and summaries

### Financial Analytics

* Income vs Expense analysis
* Savings rate calculation
* Monthly financial summaries
* Spending insights
* Category-wise expenditure breakdown
* Top spending category identification

### Dashboard

* Financial overview
* Current balance tracking
* Recent transaction history
* Interactive charts and visualizations
* Real-time statistics

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* React Query
* Recharts
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod Validation

### Infrastructure

* Vercel (Frontend Deployment)
* Render (Backend Deployment)
* Neon PostgreSQL (Cloud Database)

---

## Architecture

Frontend (React + TypeScript)
↓
REST API
↓
Express Backend
↓
Prisma ORM
↓
PostgreSQL (Neon)

---

## API Highlights

### Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

### Categories

GET /api/categories

POST /api/categories

DELETE /api/categories/:id

### Transactions

GET /api/transactions

POST /api/transactions

PUT /api/transactions/:id

DELETE /api/transactions/:id

### Analytics

GET /api/analytics/summary

GET /api/analytics/monthly

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/trilokdhakad/finsight.git
cd finsight
```

### Backend

```bash
cd backend

npm install

npm run build

npm start
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Backend:

```env
DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

CLIENT_URL=
```

Frontend:

```env
VITE_API_URL=
```

---

## Key Learnings

* Full-stack application architecture
* JWT authentication workflows
* Cloud database integration with PostgreSQL
* Prisma ORM and schema management
* Production deployment on Vercel and Render
* Financial analytics and dashboard visualization
* Type-safe API development with TypeScript

---

## Future Enhancements

* Budget planning
* Goal tracking
* Recurring transactions
* CSV import/export
* AI-powered spending insights
* Email reports
* Multi-currency support
