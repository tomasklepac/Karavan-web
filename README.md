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

## 🌐 Production Deployment

### Backend Deployment

1. **Upload files** to your server (e.g., via FTP/SFTP)
2. **Configure `.env`** with production values:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-domain.com
   
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your-email@gmail.com
   MAIL_FROM_NAME="Karavan Panýrek"
   
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ```
3. **Run migrations**:
   ```bash
   php artisan migrate --force
   ```
4. **Optimize for production**:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Frontend Deployment

1. **Build static export**:
   ```bash
   cd frontend
   npm run build
   ```
2. **Upload `out/` folder** to your web server
3. **Configure web server** to serve static files

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_ENV` | Application environment | `production` |
| `APP_DEBUG` | Debug mode (disable in production) | `false` |
| `APP_URL` | Your website URL | `https://karavan-panyrek.cz` |
| `DB_DATABASE` | MySQL database name | `karavan_db` |
| `DB_USERNAME` | Database username | `root` |
| `DB_PASSWORD` | Database password | `your-password` |
| `MAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `MAIL_USERNAME` | Email address | `info@example.com` |
| `MAIL_PASSWORD` | Email app password | `xxxx xxxx xxxx xxxx` |
| `ADMIN_USERNAME` | Admin panel username | `admin` |
| `ADMIN_PASSWORD` | Admin panel password | `secure-password` |
| `ADMIN_EMAIL` | Email for new reservation notifications | `klient@firma.cz` |

### Frontend

Update `frontend/src/services/api.ts` with your production API URL:
```typescript
const API_BASE_URL = 'https://your-domain.com/api';
```

## 📋 Features

- ✅ **Minimum reservation length**: 3 nights (7 nights June-September)
- ✅ **Same-day handover**: Reservations can end/start on the same day
- ✅ **Email notifications**: Automatic emails for new reservations and confirmations
- ✅ **Admin panel**: Manage reservations, view calendar, confirm/cancel bookings
- ✅ **SEO optimized**: Meta tags, Open Graph, sitemap.xml, robots.txt
- ✅ **Mobile responsive**: Works on all devices

## 🔌 API Endpoints

- `GET /api/availability` - Returns list of booked dates
- `POST /api/reservations` - Creates a new reservation (validates collisions)
- `GET /admin/dashboard` - Admin panel (requires authentication)
- `GET /admin/calendar` - Calendar view of reservations

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "SQLSTATE[HY000] [2002] Connection refused"
- **Solution**: Check database credentials in `.env`, ensure MySQL is running

**Problem**: Emails not sending
- **Solution**: 
  - For Gmail: Enable 2FA and create an App Password
  - Check MAIL_* variables in `.env`
  - Test with: `php artisan tinker` → `Mail::raw('Test', fn($m) => $m->to('test@example.com')->subject('Test'));`

**Problem**: Admin login not working
- **Solution**: Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`

### Frontend Issues

**Problem**: API calls failing (CORS errors)
- **Solution**: Update `config/cors.php` in backend to allow your frontend domain

**Problem**: Build fails
- **Solution**: Delete `node_modules` and `.next`, then run `npm install` and `npm run build`

**Problem**: Dates showing incorrectly
- **Solution**: Dates are stored at noon (12:00) to prevent timezone issues. Existing reservations may need to be recreated.

## 📞 Support

For issues or questions, contact: info@karavan-panyrek.cz

## 📄 License
MIT
