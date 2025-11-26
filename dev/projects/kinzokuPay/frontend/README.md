# 🚀 KinzokuPay

A futuristic, production-grade fintech SaaS simulating **cross-border** and **UPI-style** digital payments — complete with a cyberpunk UI, modular architecture, and backend-first design.

📌 Built as a **portfolio-grade project** to demonstrate full-stack engineering skills, scalability mindset, and real-world fintech flows.

---

## 🎯 Overview

**KinzokuPay** is a next-gen payments platform prototype that supports:

* ✅ UPI-style transfers: Pay / Request / Check balance
* 🌍 Cross-border currency exchange flows (planned)
* 🔐 Secure, OAuth-powered user accounts (Google, GitHub)
* 📱 Fully responsive UI with a high-trust cyberpunk theme

This project was designed to **look and feel like a real SaaS product**, while keeping the implementation lean enough for recruiters and technical reviewers to evaluate quickly.

---

## 🧱 Tech Stack

| Layer      | Tech Used                                      |
| ---------- | ---------------------------------------------- |
| Frontend   | React, TailwindCSS, (planned: GSAP animations) |
| Auth       | Custom + OAuth (Google, GitHub), JWT           |
| Backend    | Node.js, Express, TypeScript                   |
| DB         | MongoDB (Atlas)                                |
| State Mgmt | Redux Toolkit (RTK Query planned)              |
| Caching    | Redis (future: OTP, sessions, rate limit)      |
| Infra      | AWS EC2 (Free Tier)                            |
| Payments   | Simulated (Razorpay-ready)                     |
| Payout API | Planned: PayPal / Wise                         |
| Icons      | Lucide-react / Heroicons                       |

---

## ✨ Key Design Choices

1. **Central Router Navigation**

   * Keeps navigation logic consistent, easier to scale if new routes are added (mirrors backend route modularity).

2. **Redux Toolkit (vs plain Axios/Context)**

   * Centralizes API calls and caching.
   * Cleaner slice-based store makes feature scaling easier.

3. **SEO Strategy**

   * Even though it’s a React SPA, SSR or pre-rendering (Next.js or Vite plugins) is considered for production.

4. **Folder Structure**

   * Clean separation of `components`, `pages`, `utils`, and `shared/types` → industry-standard maintainability.

---

## 🔐 Features

### ✅ Core

* Manual + OAuth sign-in (Google, GitHub)
* Pay / Request / Balance check flows
* Transaction history with search & filters
* Secure middleware & modular backend routes

### 🎨 UI / UX

* Cyberpunk dark theme with glowing accents
* Fully mobile-optimized design
* Planned: GSAP animations (payment success pulses, hero interactions)

### 🔧 Developer Ready

* Custom Express middleware for auth
* JWT-based session handling
* Planned: Redis for token/session caching
* Razorpay sandbox-ready integration

---

## 🛣️ Roadmap

This MVP is production-style but lightweight. Future planned upgrades:

* 🎨 **Animations** → GSAP-based micro-interactions.
* ⚡ **Caching Layer** → Redis for OTP/session storage + rate limiting.
* 🔄 **Real-time Updates** → WebSockets for instant transaction/balance refresh.
* 📨 **Event-driven Architecture** → Kafka for async payment pipelines.
* 🔐 **Role-based Access** → Different dashboards for Users vs Admins.

---

## 🧩 App Pages

| Path            | Purpose                                |
| --------------- | -------------------------------------- |
| `/`             | Landing Page (Hero, Features, CTA)     |
| `/signin`       | User login (OAuth + manual)            |
| `/signup`       | User registration                      |
| `/dashboard`    | Balance + quick actions                |
| `/payment`      | Pay / Request / Balance check          |
| `/transactions` | Transaction history (search, filter)   |
| `/about`        | Product overview                       |
| `/careers`      | Careers & roles (demo only)            |
| `/documents`    | Terms, privacy policy, compliance info |
| `/404`          | Friendly error page                    |

---

## 📈 Scalability Plan

| Layer    | MVP Setup         | Future Ready                    |
| -------- | ----------------- | ------------------------------- |
| Auth     | JWT + OAuth       | Add refresh tokens, RBAC        |
| DB       | MongoDB           | PostgreSQL for ledger accuracy  |
| Infra    | AWS EC2 (manual)  | ECS / Kubernetes                |
| Payments | Simulated         | Razorpay, Wise, PayPal          |
| Logging  | Console.log       | Winston + Prometheus            |
| Currency | Static mock rates | API-driven (CurrencyLayer, OXR) |

---

## 📸 Screenshots

> Screenshots will be added after final polish 🎨

---

## 🧑‍💼 Pitch

> “KinzokuPay is more than just a demo — it’s a fintech-grade **starter-kit** designed with modular auth, scalable backend, and a glowing SaaS-ready UI. It reflects the same design and architecture practices I’d use in a real-world production fintech system.”

---

## 🛠️ Run Locally

```bash
# Clone
git clone https://github.com/your-username/kinzoku-pay

# Install deps
pnpm install

# Start frontend
pnpm dev

# Start backend
cd backend && pnpm dev
```

---

## 🤝 Feedback & Contributions

* Fork, PRs, and issues welcome
* Suggestions for production scaling are appreciated

---

## 🧠 Inspired By

* Google Pay / PhonePe UX flows
* Tron & Blade Runner UI styles
* Stripe’s component-driven simplicity

---

## © 2025 KinzokuPay – Designed and Built by Aman

---

NOTE:

Always send money in rupee format.
Backend will handle - receive and send in rupee format
Queries:

- Why clsx and cn?
- RTK, backend, etc
- OAuth - window.location,href?
- Memo and callback on Auth Page
- How to send mail?
- Why need toast in provider?
- How and why rbac
- Upload Avatar to S3 and get url to save in mongoDB
- Deploy projects on AWS.
- Requests and Add Money UI


RBAC:

## **Roles & Permissions**

| Role           | Permissions / Access                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| **User**       | View own transactions, make payments, request money, dashboard, profile           |
| **Admin**      | All User permissions + refund/update transactions, manage content, view analytics |
| **SuperAdmin** | All Admin permissions + create admins, manage platform settings, assign roles     |

---

## **Pages by Role**

| Page/Feature                 | User | Admin | SuperAdmin |
| ---------------------------- | ---- | ----- | ---------- |
| Dashboard                    | ✅    | ✅     | ✅          |
| Transactions                 | ✅    | ✅     | ✅          |
| Transaction Details          | ✅    | ✅     | ✅          |
| Payment / Request Money      | ✅    | ❌     | ❌          |
| Refund / Reverse Transaction | ❌    | ✅     | ✅          |
| Analytics / Stats            | ❌    | ✅     | ✅          |
| User / Admin Management      | ❌    | ❌     | ✅          |
| Platform Settings            | ❌    | ❌     | ✅          |

---

## **Implementation Tips**

* Store role in Redux: `user.role = "user" | "admin" | "superadmin"`
* Route guarding: show/hide pages based on role
* Conditional UI: buttons/actions based on role
* Backend must enforce permissions for security


Today's Agenda:

- Fix Transaction Details
- Fix Accept/Reject/Cancel Request

After that:
- Mail Notifications for SignIn/SignUp Mail, Reset password, Request Money.??
- Role Based Access: USer, Admin, SuperAdmin. SuperAdmin can only create admin.
- Transaction Schema -> Admin Can Initiate Refund for other transaction.
   Will both Transaction exists??
   What will be visible to user vs admin vs superadmin.

MongoDB - populate, lean