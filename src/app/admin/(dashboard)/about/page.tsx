"use client";

import { useFirestoreDoc } from "@/lib/firebase/hooks";
import { defaultContent } from "@/lib/default-content";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import SaveBar from "@/components/admin/SaveBar";
import type { AboutContent } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

export default function AboutPage() {
  const { data, setData, loading, saving, saved, save } = useFirestoreDoc<AboutContent>(
    "content/about",
    defaultContent.about
  );

  if (loading) return <p className="text-muted text-sm">Loading…</p>;

  const updateStat = (i: number, patch: Partial<AboutContent["stats"][number]>) => {
    const stats = data.stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    setData({ ...data, stats });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">About Section</h1>
          <p className="text-muted text-sm mt-1">Your story and headline stats.</p>
        </div>
        <SaveBar saving={saving} saved={saved} onSave={() => save(data)} />
      </div>

      <div className="flex flex-col gap-6">
        <Field label="About paragraph">
          <TextArea
            value={data.paragraph}
            onChange={(e) => setData({ ...data, paragraph: e.target.value })}
            rows={6}
          />
        </Field>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-widest text-muted">Stats</label>
            <button
              onClick={() =>
                setData({
                  ...data,
                  stats: [...data.stats, { label: "New stat", value: 0, suffix: "" }],
                })
              }
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <Plus size={13} /> Add stat
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_90px_70px_auto] gap-2 items-center border border-border rounded-lg p-3"
              >
                <TextInput
                  value={stat.label}
                  onChange={(e) => updateStat(i, { label: e.target.value })}
                  placeholder="Label"
                />
                <TextInput
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(i, { value: Number(e.target.value) })}
                  placeholder="Value"
                />
                <TextInput
                  value={stat.suffix}
                  onChange={(e) => updateStat(i, { suffix: e.target.value })}
                  placeholder="+"
                />
                <button
                  onClick={() =>
                    setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })
                  }
                  className="text-muted hover:text-red-400 p-2"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
