# Euphoria'26 — Freshers' Night Ticketing

Black + chrome, Poppins, mobile-first ticket booking with manual payment verification and QR check-in.

## Stack
Next.js 16 (App Router, client-rendered auth/data) · Firebase (Auth + Firestore) · Tailwind v4 · Framer Motion · `qrcode` · `html5-qrcode`

## 1. Firebase setup
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Build → Authentication → Get started → Sign-in method** → enable **Email/Password**.
3. **Build → Firestore Database → Create database** → start in production mode, pick a region.
4. **Project settings (gear icon) → General → Your apps → Add app → Web (`</>`)** → register the app, copy the config values.
5. Deploy the security rules and indexes in this repo, either:
   - Console: paste [`firestore.rules`](firestore.rules) into **Firestore → Rules** and publish. Composite indexes ([`firestore.indexes.json`](firestore.indexes.json)) will otherwise be created on-demand — the first time a query needs one, the browser console error contains a direct "create index" link.
   - Or CLI: `npm i -g firebase-tools`, `firebase login`, `firebase deploy --only firestore` (uses [`firebase.json`](firebase.json)).

## 2. Environment variables
Copy `.env.local.example` to `.env.local` and fill in the web app config from step 4 above:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These are safe to expose client-side — Firebase web apps are secured by Firestore Security Rules ([`firestore.rules`](firestore.rules)), not by hiding the config.

## 3. Payment QR
The real UPI payment QR lives at [`public/payment-qr.jpeg`](public/payment-qr.jpeg). Prices are set in [`src/components/EntryTypeSelector.tsx`](src/components/EntryTypeSelector.tsx).

## 4. Make yourself admin
Sign up once through the app (pick 1st year so your own account isn't gated), then in **Firestore → Data → profiles → `<your uid>`**, edit the `isAdmin` field to `true` (find your uid under **Authentication → Users**).

Admins get access to `/admin` (Transactions + Account Requests tabs) and `/admin/scan` (QR check-in scanner).

> Rules changed since first deploy (account-approval gating) — re-paste [`firestore.rules`](firestore.rules) into **Firestore → Rules → Publish** if you set this up before.

## 5. Run

```bash
npm install
npm run dev
```

## Flow
- **Guest**: `/event` (venue, timings, what's there) → sign up (name, USN, year, phone, email, password) → `/book` (scan QR, pick Stag/Couple, submit transaction ID, agree to terms) → `/ticket` (pending → verified QR / rejected), updates live.
- **Account approval**: 1st years are auto-approved. 2nd/3rd years are created as `pending` and blocked from booking until an admin approves them under `/admin` → **Account Requests** — enforced by Firestore rules, not just the UI.
- **Admin**: `/admin` → **Transactions** tab approves/rejects pending ticket payments, **Account Requests** tab approves/rejects pending 2nd/3rd year signups (both list everyone, with one-click actions on pending rows) → `/admin/scan` scans the QR at the door; check-in runs as a Firestore transaction (`verified → checked_in`), so a QR can't be reused once scanned, even with two scanners going at once.

## Deploy

### GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel
1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo.
2. Framework preset: Next.js (auto-detected).
3. Add the same six `NEXT_PUBLIC_FIREBASE_*` env vars from step 2 in the project's **Environment Variables** settings.
4. Deploy.
5. Back in Firebase console → **Authentication → Settings → Authorized domains** → add your `*.vercel.app` domain (and custom domain, if any) — otherwise sign-in will be blocked on the deployed site.

Free tiers (Firebase Spark + Vercel Hobby) comfortably cover an event of a few hundred guests.
