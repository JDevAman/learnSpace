# KinzokuPay

## Features

| Feature                                     | Status        |
| ------------------------------------------- | ------------- |
| 🔄 **Request Money**                         | ✅ Done        |
| ➕ **Add Money**                             | ✅ Done        |
| 🍪 **Cookie-Based Authentication**           | ✅ Done        |
| 🔐 **OAuth Support**                         | ⏳ Working     |
| 🧱 **DB Record Locking** (e.g. A → B, C → A) | ✅ Done        |

- For DB Record Locking: 
  - ACID - Safe: Session are being used.
  - MongoDB provides document locking when write operation. 

- For OAuth:

Flow - 
User → [Your App] 
     → (Redirect to Google) 
     → Google Login → [Authorization Code]
     → [Your Server] ↔ (Exchange for access token)
     → [Get user info] → [Issue your JWT] → [Frontend]