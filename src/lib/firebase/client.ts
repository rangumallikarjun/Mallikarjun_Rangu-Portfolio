"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase client SDKs must only initialize in the browser. Next.js still
// evaluates "use client" modules once during server-side prerendering, where
// `window` is undefined and env vars may be absent/invalid — initializing
// there throws and fails the build. Skip init in that pass; by the time any
// of these are actually called (inside effects/handlers), we're in the
// browser and this module has been re-evaluated there for real.
function initBrowserApp(): FirebaseApp | undefined {
  if (typeof window === "undefined") return undefined;
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

const app = initBrowserApp();

export const firebaseApp = app;
export const auth = (app ? getAuth(app) : undefined) as Auth;
export const db = (app ? getFirestore(app) : undefined) as Firestore;
