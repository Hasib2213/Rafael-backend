# Curio / Rafael Backend - Django REST Framework & Supabase PostgreSQL

A production-grade Python Django & Django REST Framework (DRF) backend for the Curio AI video briefing platform, connected directly to a Supabase PostgreSQL database.

---

## 🚀 Tech Stack

- **Framework**: Django 6.1+ & Django REST Framework (DRF)
- **Database**: Supabase PostgreSQL 17.6 (Seoul Region `ap-northeast-2`)
- **Authentication**: JWT (JSON Web Tokens) via `djangorestframework-simplejwt`
- **CORS**: `django-cors-headers` (Configured for Next.js frontend on port 3000)
- **Database Connector**: `psycopg2-binary` & `dj-database-url`

---

## 📂 Project Structure

```
Rafael-backend/
├── apps/
│   ├── accounts/             # Custom User model, JWT Auth, Profile, Admin User Management
│   ├── creators/             # YouTube Creators, Follow/Unfollow, Channel Discovery
│   ├── briefings/            # AI Video Briefings (Daily & Weekly), Summaries, Takeaways
│   ├── library/              # Saved / Bookmarked Briefings with Sorting (A-Z, Oldest, etc.)
│   ├── feedback/             # 1-5 Star Ratings, Feedback Tags, Improve Requests, Reviews
│   ├── subscriptions/        # Plans (Free, Pro, Enterprise), Checkout, Billing Transactions
│   ├── platform_settings/    # Site Contact Info, Social Links, Terms of Use, Privacy Policy
│   └── analytics/            # Admin Metrics, Revenue Stats, Customer Growth, Activity Audit
├── core/
│   ├── settings.py           # Django settings with Supabase integration & CORS
│   ├── urls.py               # Master API routing
│   └── wsgi.py
├── .env                      # Supabase connection string & environment variables
├── manage.py
└── requirements.txt
```

---

## 🔑 Default Credentials (Pre-seeded in Supabase)

| Role | Email | Password | Plan |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@curio.ai` | `admin123456` | Enterprise |
| **Demo User** | `abir07@gmail.com` | `user123456` | Pro |

---

## 🌐 API Endpoints Reference

### 1. Authentication & Profiles (`/api/auth/`)
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login with email & password (returns JWT access & refresh tokens)
- `POST /api/auth/refresh/` - Refresh JWT access token
- `GET /api/auth/profile/` - Get current user profile
- `PATCH /api/auth/profile/` - Update profile (first name, last name, phone, address, company, position, avatar)
- `POST /api/auth/change-password/` - Change user password
- `POST /api/auth/forgot-password/` - Request 6-digit OTP code to email
- `POST /api/auth/verify-otp/` - Verify 6-digit OTP code
- `POST /api/auth/reset-password/` - Reset user password with verified OTP
- `GET /api/auth/notifications/` - List notifications (for user + global)
- `POST /api/auth/notifications/<id>/read/` - Mark notification as read
- `POST /api/auth/notifications/mark-all-read/` - Mark all notifications as read

### 2. Creators & Following (`/api/creators/`)
- `GET /api/creators/` - List all creators (supports `?search=` and `?sort=recently|oldest|a-z|z-a`)
- `GET /api/creators/following/` - List creators followed by the authenticated user
- `POST /api/creators/add/` - Add and auto-follow creator by YouTube channel/video URL
- `POST /api/creators/<id>/toggle-follow/` - Follow / Unfollow a creator
- `GET /api/creators/<id_or_handle>/` - Get creator profile & channel details

### 3. AI Briefings (`/api/briefings/`)
- `GET /api/briefings/` - List briefings (supports `?timeframe=daily|weekly`, `?search=`, `?category=`)
- `GET /api/briefings/<id>/` - Get briefing full summary and key takeaways
- `POST /api/briefings/<id>/listen/` - Record listen/play count

### 4. Saved Library (`/api/library/`)
- `GET /api/library/` - Get user's saved briefings (supports `?sort=recently|oldest|a-z|z-a` and `?search=`)
- `POST /api/library/toggle/<briefing_id>/` - Bookmark or remove briefing from library
- `DELETE /api/library/<saved_item_id>/` - Delete saved item

### 5. Feedback & Reviews (`/api/feedback/`)
- `GET /api/feedback/my-feedback/` - Get all feedback submitted by current user
- `POST /api/feedback/submit/` - Submit rating (1-5), useful feedback tag, thoughts, or request improved version
- `GET /api/feedback/admin/reviews/` - List all reviews (supports `?featured=true|false` and `?search=`)
- `POST /api/feedback/admin/reviews/<id>/toggle-feature/` - Toggle featured review badge
- `DELETE /api/feedback/admin/reviews/<id>/` - Delete review

### 6. Subscriptions & Billing (`/api/subscriptions/`)
- `GET /api/subscriptions/plans/` - List active subscription plans (Free, Pro, Enterprise)
- `GET /api/subscriptions/my-status/` - Get authenticated user's active subscription status
- `POST /api/subscriptions/checkout/` - Process subscription checkout and billing information
- `GET /api/subscriptions/transactions/` - List user billing transactions / purchase history (Admin supports `?user_id=`)
- `PATCH /api/subscriptions/plans/<slug_or_id>/` - (Admin) Update plan pricing, facilities, and free trial days

### 7. Platform Settings (`/api/settings/`)
- `GET /api/settings/` - Get site contact info, social handles, Terms of Use, Privacy Policy
- `PATCH /api/settings/` - (Admin) Update platform settings and legal terms
- `POST /api/settings/contact/` - Submit contact inquiry message (Name, Email, Subject, Message)
- `GET /api/settings/admin/contact-messages/` - (Admin) List all submitted contact inquiries

### 8. Analytics & Admin Dashboard (`/api/analytics/`)
- `GET /api/analytics/dashboard/` - Admin dashboard telemetry (Total Users, Revenue, Videos Processed, AI Summaries, Revenue Stats chart, Customer Growth)
- `GET /api/analytics/audit-logs/` - Live user activity audit table (supports `?plan=Free|Pro|Enterprise` and `?search=`)
- `GET /api/auth/admin/users/` - Admin user list with search, plan filter, and suspended status
- `GET /api/auth/admin/users/<id>/` - Admin user details with following count, library count, feedback count & purchase history
- `POST /api/auth/admin/users/<id>/suspend/` - Toggle user suspension


---

## 🛠️ How to Run Locally

1. **Activate Virtual Environment**:
   ```bash
   .\venv\Scripts\activate
   ```

2. **Run Migrations (already applied to Supabase)**:
   ```bash
   python manage.py migrate
   ```

3. **Re-seed Initial Data (if needed)**:
   ```bash
   python manage.py seed_data
   ```

4. **Start Development Server**:
   ```bash
   python manage.py runserver
   ```
   Server will automatically run at `http://127.0.0.1:8055/` (configured via `PORT=8055` in `.env`).

