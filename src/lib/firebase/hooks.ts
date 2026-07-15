"use client";

import { useCallback, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./client";

export function useFirestoreDoc<T extends object>(path: string, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    const [collectionName, id] = path.split("/");
    getDoc(doc(db, collectionName, id))
      .then((snap) => {
        if (!active) return;
        if (snap.exists()) {
          setData({ ...initial, ...snap.data() } as T);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const save = useCallback(
    async (next: T) => {
      setSaving(true);
      setSaved(false);
      const [collectionName, id] = path.split("/");
      await setDoc(doc(db, collectionName, id), next, { merge: true });
      setData(next);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
    [path]
  );

  return { data, setData, loading, saving, saved, save };
}

export function useFirestoreCollection<T extends { id: string; order: number }>(
  name: string
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, name), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as T));
      setLoading(false);
    });
    return unsub;
  }, [name]);

  const addItem = useCallback(
    async (item: Omit<T, "id">) => {
      await addDoc(collection(db, name), item);
    },
    [name]
  );

  const updateItem = useCallback(
    async (id: string, patch: Partial<T>) => {
      await updateDoc(doc(db, name, id), patch as { [x: string]: unknown });
    },
    [name]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, name, id));
    },
    [name]
  );

  return { items, loading, addItem, updateItem, deleteItem };
}
