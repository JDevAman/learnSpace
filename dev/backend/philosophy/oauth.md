# 🔐 OAuth Authentication

Allow users to securely log in to your app using third-party providers like Google or GitHub.

---

## 🔄 OAuth Flow Overview

```
User → [Your App] 
     → (Redirect to Google) 
     → Google Login → [Authorization Code]
     → [Your Server] ↔ (Exchange for Access Token)
     → [Fetch User Info] → [Issue Your JWT] → [Frontend]
```

---

## ✅ Google OAuth Setup Guide

### 1. Enable Required APIs

* Go to Google Cloud Console → APIs & Services → Library
* Enable the following API:

  * Google People API

---

### 2. Configure OAuth Consent Screen

* Go to OAuth Consent Screen in the Google Cloud Console
* Select "External" as the user type
* Fill in the following details:

  * App name, support email, developer contact info
  * Add scopes such as `email` and `profile`
* Add your test users (Google accounts)
* Save changes (no need to publish for development mode)

---

### 3. Create OAuth 2.0 Credentials

* Navigate to Credentials → Create Credentials → OAuth Client ID

* Choose Web Application as the application type

* Add your Authorized Redirect URI (for development):

  ```
  http://localhost:3000/auth/google/callback
  ```

* After creation, note down your:

  * `GOOGLE_CLIENT_ID`
  * `GOOGLE_CLIENT_SECRET`

---

### 📌 What Is a Redirect URI?

> The Redirect URI is the URL on your server where Google will send the user after authentication.
> Your backend must listen on this path to receive the authorization code.

✅ Example:

```
http://localhost:3000/auth/google/callback
```

---

## 🧩 Code Integration Steps

### 1. Redirect to Google for Login

Initiate the login process by redirecting the user to Google’s OAuth URL to request access permissions.

### 2. Handle Callback and Retrieve User Info

* After the user authorizes, Google will redirect to your backend with an authorization code
* Exchange this code for an access token
* Use the token to fetch the user's basic profile data (e.g., name, email, avatar)
* Generate your own JWT for the authenticated user and send it to the frontend for session management