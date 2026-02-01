# Caravan Rental Web (MVP)

A simple and efficient reservation system for a caravan rental business. Built as a Minimum Viable Product (MVP) with a decoupled architecture using **Laravel** for the backend API and **Next.js** for the static frontend.

## 🚀 Tech Stack

- **Backend**: Laravel 11.x (PHP 8.2+)
- **Frontend**: Next.js 16.x (App Router, Static Export)
- **Database**: MySQL
- **Styling**: Tailwind CSS 3.4
- **UI Components**: React Calendar, Lucide React

## 🛠️ Installation & Setup

### Backend (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Configure environment:
   ```bash
   cp .env.example .env
   # Update DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
   ```
4. Generate app key and migrate:
   ```bash
   php artisan key:generate
   php artisan migrate
   ```
5. Serve the API:
   ```bash
   php artisan serve
   ```
   API will run at `http://127.0.0.1:8000`.

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
   App will run at `http://localhost:3000`.

## 🔌 API Endpoints

- `GET /api/availability` - Returns list of booked dates.
- `POST /api/reservations` - Creates a new reservation (validates collisions).

## 📄 License
MIT
