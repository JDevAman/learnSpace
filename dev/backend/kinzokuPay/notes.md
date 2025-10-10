# KinzokuPay – Backend

## Features

| Feature            | Status |
| ------------------ | ------ |
| Request Money      | ✅ Done |
| Add Money          | ✅ Done |
| Cookie-Based Auth  | ✅ Done |
| OAuth              | ✅ Done |
| DB Record Locking  | ✅ Done |
| Role-Based Access  | ⏳ WIP  |
| Refund             | ⏳ WIP  |
| Email Notification | ⏳ WIP  |

**Notes:**

* DB locking is ACID-safe using MongoDB sessions.
* OAuth flow: `User → App → Google → Auth Code → Server → Access Token → JWT → Frontend`.

---

## Schemas

**User**

```ts
{ firstName, lastName, userName, password, createdAt, updatedAt }
```

**Account**

```ts
{ userId, balance, createdAt, updatedAt }
```

**Transaction**

```ts
{
  from: ObjectId | null,
  to: ObjectId,
  amount,
  type: "transfer" | "request" | "add" | "refund",
  description?,
  status: "pending" | "success" | "rejected" | "failed",
  expiresAt?, finalizedAt?, relatedTransaction?, initiatedBy?,
  createdAt, updatedAt
}
```

---

## APIs

1. **Add Money** – `POST /api/accounts/add` → `{ amount, description }` → `direction: "incoming"`
2. **Transfer Money** – `POST /api/accounts/transfer` → `{ recipient, amount, note }` → `direction: "outgoing"` for sender
3. **Request Money** – `POST /api/accounts/request` → `{ recipient, amount, note }` → `status: "pending"`, `direction: "outgoing"`
4. **Accept/Reject/Cancel Request** – `POST /api/accounts/request/:id/accept|reject|cancel` → updated transaction
5. **Fetch Transactions** – `GET /api/transactions?filter=&search=&limit=&skip=` → array of transactions with `direction`

---

## Direction Logic

```ts
const direction =
  t.type === "request" ? (t.to === userId ? "incoming" : "outgoing") :
  t.type === "transfer" ? (t.from === userId ? "outgoing" : "incoming") :
  "incoming"; // add money & fallback
```

* **incoming** → money received
* **outgoing** → money sent
* **pending** → for requests

---

✅ Single transaction schema ensures **consistent API payloads** for UI.

