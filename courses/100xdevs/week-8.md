# Week 8

## 📌 What is Tailwind CSS?

**Tailwind CSS** is a **utility-first CSS framework** that provides low-level utility classes to build designs directly in your HTML. It eliminates the need for custom CSS and offers maximum flexibility with no predefined UI design.

### 🔑 Key Features:

- **Utility-First:** Build components using atomic utility classes.
- **Highly Configurable:** Fully customizable via the `tailwind.config.js`.
- **No Preprocessor Required:** Uses plain CSS with PostCSS.

---

## 🧱 Core Essentials

Although CSS seems broad, mastering a few key concepts will allow you to efficiently handle real-world UI tasks:

---

### 1️⃣ Flexbox

**Purpose:** Arrange and align items easily in a row or column.

| Feature | Use Case                                        | Why It Matters               |
| ------- | ----------------------------------------------- | ---------------------------- |
| Flexbox | Navbars, centering content, side-by-side layout | Simplifies responsive layout |

**Tailwind Classes:**

```html
<div class="flex justify-between items-center">...</div>
```

---

### 2️⃣ Grid

**Purpose:** Build structured layouts with rows and columns.

| Feature | Use Case                               | Why It Matters              |
| ------- | -------------------------------------- | --------------------------- |
| Grid    | Complex layouts, dashboards, galleries | Precise control over layout |

**Tailwind Classes:**

```html
<div class="grid grid-cols-3 gap-4">...</div>
```

---

### 3️⃣ Responsiveness

**Purpose:** Make your app work well across all devices.

| Feature           | Use Case                  | Why It Matters        |
| ----------------- | ------------------------- | --------------------- |
| Responsive Design | Mobile to Desktop scaling | Ensures consistent UX |

**Tailwind Responsive Utilities:**

```html
<div class="text-base md:text-lg lg:text-xl">Responsive Text</div>
```

---

### 4️⃣ Colors & Hover Effects

**Purpose:** Visual styling and interactivity.

| Feature    | Example            | Tailwind Class                      |
| ---------- | ------------------ | ----------------------------------- |
| Background | `bg-blue-500`      | `<div class="bg-blue-500">`         |
| Text       | `text-green-600`   | `<p class="text-green-600">`        |
| Hover      | `hover:bg-red-700` | `<button class="hover:bg-red-700">` |

---

## 🧠 Deep Dive: CSS vs Tailwind

---

### ✅ Flexbox

**CSS:**

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
```

**Tailwind:**

```html
<div class="flex justify-between items-center">...</div>
```

---

### ✅ Grid

**CSS:**

```css
.container {
  display: grid;
  grid-template-rows: 100px auto 100px;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
}
```

**Tailwind:**

```html
<div class="grid grid-rows-3 grid-cols-3 gap-10">
  <div class="row-span-1 col-span-1">1</div>
  <div class="row-span-3 col-span-2">2</div>
</div>
```

---

### ✅ Media Queries & Responsiveness

**CSS:**

```css
@media screen and (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

**Tailwind:**

```html
<p class="text-base md:text-lg lg:text-xl">Responsive Text</p>
```

Breakpoints:

- `sm` → 640px
- `md` → 768px
- `lg` → 1024px
- `xl` → 1280px
- `2xl` → 1536px

---

## 📱 Mobile-First Approach in Tailwind

Tailwind is inherently mobile-first. You write base styles for mobile, and use breakpoints to enhance for larger screens.

**Example:**

```html
<div class="p-4 text-lg lg:text-xl">This is mobile-first text</div>
```

---

## 🎨 Styling Summary

| Style        | CSS                          | Tailwind           |
| ------------ | ---------------------------- | ------------------ |
| Background   | `background-color: #3498db;` | `bg-blue-500`      |
| Text Color   | `color: #2ecc71;`            | `text-green-600`   |
| Hover Effect | `:hover { bg: #c0392b }`     | `hover:bg-red-700` |

---

## ✅ Final Notes

- Flex and Grid build layout
- Responsiveness ensures compatibility
- Colors & Hover improve interactivity
- Tailwind’s utility-first and mobile-first philosophy promotes fast, consistent, maintainable UI development

## API Management

### Axios - HTTP Client

Popular promise-based HTTP client for browser and Node.js

#### Key Features
- Automatic JSON parsing
- Interceptors (for auth headers, error logging)
- Request & response transformation
- Better error handling
- Built-in timeout support

#### Basic Setup
```javascript
// Install
npm install axios

// Create API client
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

#### Usage
```javascript
// GET, POST, PUT, DELETE
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', userData);
const updated = await apiClient.put('/users/1', userData);
await apiClient.delete('/users/1');
```

### TanStack Query - Server State Management

Data-fetching and state management library for server-side data

#### Key Features
- Smart caching with automatic invalidation
- Background refetching
- Auto re-fetching on window focus
- Built-in loading/error states
- Request deduplication
- Pagination & infinite scroll support

#### Setup
```javascript
// Install
npm install @tanstack/react-query

// App setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

#### Queries (Data Fetching)
```javascript
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users').then(res => res.data)
  });
};

// Usage in component
function UserList() {
  const { data: users, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{users.map(user => <div key={user.id}>{user.name}</div>)}</div>;
}
```

#### Mutations (Data Modification)
```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => apiClient.post('/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

// Usage
function CreateUser() {
  const createUser = useCreateUser();
  
  const handleSubmit = (formData) => {
    createUser.mutate(formData);
  };
  
  return (
    <button onClick={() => handleSubmit(data)} disabled={createUser.isPending}>
      {createUser.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

### Perfect Combination

Custom API hooks combining both libraries:

```javascript
// hooks/useApi.js
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users').then(res => res.data),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => apiClient.post('/users', userData).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });
};
```

### Benefits
- **Axios**: Clean HTTP client with interceptors and error handling
- **TanStack Query**: Automatic caching, background updates, and loading states
- **Together**: Robust API management with minimal boilerplate code
  - State Management for server side data
  - A data-fetching and state management library