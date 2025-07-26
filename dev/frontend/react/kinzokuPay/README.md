# 🚀 KinzokuPay

A futuristic, production-grade fintech SaaS simulating cross-border and UPI-style digital payments — complete with a cyberpunk UI, modular architecture, and backend-first design. Built to impress NBFCs and scale to real-world use.

---

## 🎯 Overview

**KinzokuPay** is a next-gen payments platform prototype that allows:

- ✅ UPI-style transfers: Pay / Request / Check balance
- 🌍 Future-ready cross-border currency exchange flows
- 🔐 Secure, OAuth-powered user accounts
- 📱 Fully responsive UI with a high-trust visual theme

Designed with a portfolio-first mindset, but with enterprise-level extendability and clarity. Built for NBFC demo, SaaS potential, and fintech API integrations (Razorpay, PayPal, Wise, etc.).

---

## 🧱 Tech Stack

| Layer      | Tech Used                    |
| ---------- | ---------------------------- |
| Frontend   | React, TailwindCSS, GSAP     |
| Auth       | Custom + OAuth (Google, GitHub), JWT |
| Backend    | Node.js, Express, TypeScript |
| DB         | MongoDB (Atlas)              |
| Caching    | Redis (tokens/OTP, rate limit) |
| Infra      | AWS EC2 (Free Tier)          |
| Payments   | Simulated, Razorpay-ready    |
| Payout API | PayPal/Wise-compatible plan  |
| Icons      | Lucide-react / Heroicons     |

---

## 🔐 Features

### ✅ Core

- 🔐 Manual & OAuth sign-in (Google, GitHub)
- 💸 UPI-style transfer: send / request / balance
- 📜 Transaction history with filters
- ⚙️ Modular route/controllers with middleware

### 🎨 UI / UX

- 🌌 Cyberpunk dark theme + minimal UI
- ✨ Glowing neon cyan/blue elements
- 📱 Fully mobile-optimized layout
- ✅ GSAP animations (success checkmark pulse)

### 🔧 Dev Ready

- ⚙️ Custom Express auth middleware
- 🔒 Redis token/session storage
- 🧠 Role-based auth support (admin/user)
- 💰 Razorpay integration tested (sandbox)

---

## 🌍 SaaS + Currency Exchange Vision

This project is future-proofed for:

- 💱 INR → FX payout via PayPal/Wise API
- 🤝 White-labelable UI for NBFCs and payment companies
- 📃 KYC/AML compliance-ready structure
- 🧾 Admin dashboard (coming) for auditing/logs

---

## 🧩 App Pages

| Path           | Purpose                                 |
|----------------|------------------------------------------|
| `/`            | Marketing Landing Page (Hero, Features, CTA) |
| `/signin`      | Login (OAuth + manual)                   |
| `/signup`      | Register (OAuth + manual)                |
| `/dashboard`   | User balance + recent transactions       |
| `/payment`     | Pay, Request, Check Balance              |
| `/transactions`| All transactions (search, filter)        |
| `/about`       | Product & mission overview               |
| `/careers`     | Hiring, roles, and company info          |
| `/documents`   | Terms, privacy policy, compliance        |
| `/404`         | Friendly error page                      |

---

## 🧩 Folder Structure

```bash
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── models
│   └── utils
├── frontend
│   ├── components
│   │   ├── ui
│   │   ├── sections
│   │   ├── auth
│   │   └── dashboard
│   ├── pages
│   │   └── about.tsx, payment.tsx, ...
│   └── utils
├── shared
│   └── types
````

---

## 📈 Scalability

| Layer    | MVP Setup    | Future Ready                      |
| -------- | ------------ | --------------------------------- |
| Auth     | JWT + OAuth  | Add refresh tokens, external auth |
| DB       | MongoDB      | Switch to PostgreSQL for ledgers  |
| Infra    | EC2 (manual) | ECS / Kubernetes ready structure  |
| Payments | Simulated    | Razorpay, Wise, PayPal Payouts    |
| Logging  | Console      | Winston + Prometheus / Datadog    |
| Currency | Static       | CurrencyLayer/OpenExchangeRates   |

---

## 📸 Screenshots

> Will be uploaded after final polish 🎨

---

## 🧑‍💼 Pitch

> “KinzokuPay is more than a demo — it's a fintech-grade starter-kit built with the same attention to detail I’d use in a real SaaS product. Modular auth, payment simulations, scalable backend, and a glowing UI — everything NBFCs and fintech buyers want to see in a POC.”

---

## 🛠️ To Run Locally

```bash
# 1. Clone the project
git clone https://github.com/your-username/kinzoku-pay

# 2. Install dependencies
pnpm install

# 3. Start frontend
pnpm dev

# 4. Start backend
cd backend && pnpm dev
```

---

## 🤝 Feedback & Contributions

* Feel free to fork, open PRs, or suggest improvements
* Need a custom build or consulting? Drop a message

---

## 🧠 Inspired By

* Google Pay / PhonePe flow
* Blade Runner 2049 + Tron UI styles
* Stripe's clean component systems

---

## © 2025 KinzokuPay – Designed and Built by Aman
