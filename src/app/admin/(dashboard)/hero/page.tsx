"use client";

import { useFirestoreDoc } from "@/lib/firebase/hooks";
import { defaultContent } from "@/lib/default-content";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import SaveBar from "@/components/admin/SaveBar";
import type { HeroContent } from "@/lib/content-types";

export default function HeroPage() {
  const { data, setData, loading, saving, saved, save } = useFirestoreDoc<HeroContent>(
    "content/hero",
    defaultContent.hero
  );

  if (loading) return <p className="text-muted text-sm">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Hero Section</h1>
          <p className="text-muted text-sm mt-1">The first thing visitors see.</p>
        </div>
        <SaveBar saving={saving} saved={saved} onSave={() => save(data)} />
      </div>

      <div className="flex flex-col gap-6">
        <Field label="Eyebrow text">
          <TextInput
            value={data.eyebrow}
            onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
          />
        </Field>

        <Field label="Heading — line 1">
          <TextInput
            value={data.headingLine1}
            onChange={(e) => setData({ ...data, headingLine1: e.target.value })}
          />
        </Field>

        <Field label="Heading — line 2">
          <TextInput
            value={data.headingLine2}
            onChange={(e) => setData({ ...data, headingLine2: e.target.value })}
          />
        </Field>

        <Field label="Subtext">
          <TextArea
            value={data.subtext}
            onChange={(e) => setData({ ...data, subtext: e.target.value })}
            rows={3}
          />
        </Field>

        <Field label="Button label">
          <TextInput
            value={data.ctaLabel}
            onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
