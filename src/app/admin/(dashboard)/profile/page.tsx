"use client";

import { useFirestoreDoc } from "@/lib/firebase/hooks";
import { defaultContent } from "@/lib/default-content";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import SaveBar from "@/components/admin/SaveBar";
import type { Profile } from "@/lib/content-types";

export default function ProfilePage() {
  const { data, setData, loading, saving, saved, save } = useFirestoreDoc<Profile>(
    "content/profile",
    defaultContent.profile
  );

  if (loading) return <p className="text-muted text-sm">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Profile</h1>
          <p className="text-muted text-sm mt-1">Your identity across the site.</p>
        </div>
        <SaveBar saving={saving} saved={saved} onSave={() => save(data)} />
      </div>

      <div className="flex flex-col gap-6">
        <Field label="Avatar URL">
          <TextInput
            value={data.avatarUrl}
            onChange={(e) => setData({ ...data, avatarUrl: e.target.value })}
            placeholder="https://example.com/photo.jpg"
          />
        </Field>

        <Field label="Resume / CV URL (PDF)">
          <TextInput
            value={data.resumeUrl}
            onChange={(e) => setData({ ...data, resumeUrl: e.target.value })}
            placeholder="https://example.com/resume.pdf"
          />
        </Field>

        <Field label="Full Name">
          <TextInput
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </Field>

        <Field label="Role / Title">
          <TextInput
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
        </Field>

        <Field label="Tagline">
          <TextInput
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
          />
        </Field>

        <Field label="Bio">
          <TextArea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            rows={5}
          />
        </Field>

        <Field label="Location">
          <TextInput
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </Field>

        <Field label="Contact Email">
          <TextInput
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
