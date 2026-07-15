# Firebase Setup

The site's content (hero text, about, projects, skills, certifications, experience,
social links) lives in Firestore and is editable from `/admin`. Follow these steps once
to wire it up.

This project intentionally does **not** use Firebase Storage — Google now requires the
paid Blaze plan to create any Storage bucket. Instead, images/resume are plain URL fields
in the admin panel: host the file anywhere (GitHub, any free image host, etc.) and paste
the link in. Firestore and Authentication stay on the free Spark plan.

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com → **Add project** → name it (e.g. `mallikarjun-portfolio`).
2. Google Analytics is optional — skip it.

## 2. Enable the services this app uses

In the left sidebar:

- **Build > Firestore Database** → Create database → start in **production mode** → pick a region.
- **Build > Authentication** → Get started → **Sign-in method** tab → enable **Email/Password**.

## 3. Create your admin user

Still in **Authentication**, go to the **Users** tab → **Add user** → enter the email and
password you want to log into `/admin` with. This is the *only* account that will be able
to edit content — there's no public signup.

## 4. Get your Web app config (public keys)

**Project settings** (gear icon) → **General** → scroll to **Your apps** → click the web icon (`</>`)
to register a new web app (any nickname). Copy the `firebaseConfig` values into `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Also set:

```
NEXT_PUBLIC_ADMIN_EMAIL=the-email-you-created-in-step-3@example.com
```

## 5. Get your Admin SDK service account (secret keys)

**Project settings** → **Service accounts** → **Generate new private key** → downloads a JSON file.
From that file, copy into `.env.local`:

```
FIREBASE_ADMIN_PROJECT_ID=<project_id>
FIREBASE_ADMIN_CLIENT_EMAIL=<client_email>
FIREBASE_ADMIN_PRIVATE_KEY="<private_key, keep the \n escapes and quotes exactly as in the JSON>"
```

Start from `.env.local.example` in this repo — copy it to `.env.local` and fill in all the values above.
Delete the downloaded JSON file (or move it outside the repo) once copied — it's a live credential.

## 6. Lock down security rules

Open `firestore.rules` in this repo and replace `REPLACE_WITH_YOUR_ADMIN_EMAIL` with the same
email from step 3. Then in the Firebase console:

**Firestore Database > Rules** tab → paste the contents of `firestore.rules` → Publish.

(Or, if you have the Firebase CLI installed: `firebase deploy --only firestore:rules`.)

This is what actually protects your data — anyone can *read* the content (that's the point,
it's a public site), but only your admin email can *write* to it. The `/admin` login screen
is just a UI convenience on top of this.

## 7. Seed starter content

With `.env.local` fully filled in:

```
node --env-file=.env.local scripts/seed.mjs
```

This populates Firestore with starter content (your name, a sample project, sample cert, etc.)
so the site isn't empty and you have something to edit rather than starting from a blank form.
Safe to re-run — it skips collections that already have data.

## 8. Run it

```
npm run dev
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin/login — sign in with the email/password from step 3.

## Hosting images and your resume

Since there's no upload button, paste a direct URL into the Profile/Projects admin forms.
Easy free options: upload the file to a GitHub repo and use its raw URL, or use any free
image host (e.g. imgur.com). Just make sure the URL points directly at the file (ends in
`.jpg`/`.png`/`.pdf`, not a viewer page).

## Deploying to Vercel

Add every variable from `.env.local` to your Vercel project's **Settings > Environment Variables**
(both `NEXT_PUBLIC_*` and the `FIREBASE_ADMIN_*` secrets — Vercel keeps server-only env vars out
of the browser bundle automatically). No database setup needed on the Vercel side — Firestore is
already fully hosted.
