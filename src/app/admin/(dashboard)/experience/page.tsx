"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks";
import { TextInput, TextArea } from "@/components/admin/Field";
import type { ExperienceItem } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

export default function ExperiencePage() {
  const exp = useFirestoreCollection<ExperienceItem>("experience");

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Experience</h1>
          <p className="text-muted text-sm mt-1">Your career timeline.</p>
        </div>
        <button
          onClick={() =>
            exp.addItem({
              year: "2026 — Now",
              role: "New Role",
              company: "Company",
              description: "",
              order: exp.items.length,
            } as Omit<ExperienceItem, "id">)
          }
          className="flex items-center gap-2 bg-accent text-black rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {exp.items.map((item) => (
          <div key={item.id} className="border border-border rounded-2xl p-5 flex flex-col gap-3">
            <div className="grid md:grid-cols-[140px_1fr_1fr_auto] gap-3 items-center">
              <TextInput
                defaultValue={item.year}
                onBlur={(e) => exp.updateItem(item.id, { year: e.target.value })}
                placeholder="2024 — Now"
              />
              <TextInput
                defaultValue={item.role}
                onBlur={(e) => exp.updateItem(item.id, { role: e.target.value })}
                placeholder="Role"
              />
              <TextInput
                defaultValue={item.company}
                onBlur={(e) => exp.updateItem(item.id, { company: e.target.value })}
                placeholder="Company"
              />
              <button
                onClick={() => exp.deleteItem(item.id)}
                className="text-muted hover:text-red-400 p-2 justify-self-end"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <TextArea
              defaultValue={item.description}
              onBlur={(e) => exp.updateItem(item.id, { description: e.target.value })}
              placeholder="Description"
              rows={2}
            />
          </div>
        ))}
        {!exp.items.length && (
          <p className="text-muted text-sm">No experience entries yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
