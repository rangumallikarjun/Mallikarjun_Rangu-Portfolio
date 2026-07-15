"use client";

import { useFirestoreDoc, useFirestoreCollection } from "@/lib/firebase/hooks";
import { defaultContent } from "@/lib/default-content";
import { Field } from "@/components/admin/Field";
import SaveBar from "@/components/admin/SaveBar";
import TagInput from "@/components/admin/TagInput";
import type { SkillGroup } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

export default function SkillsPage() {
  const marquee = useFirestoreDoc<{ items: string[] }>("content/marquee", {
    items: defaultContent.marqueeSkills,
  });
  const groups = useFirestoreCollection<SkillGroup>("skillGroups");

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl mb-2">Skills</h1>
      <p className="text-muted text-sm mb-10">Marquee ticker and capability groups.</p>

      <section className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg">Marquee Skills</h2>
          <SaveBar
            saving={marquee.saving}
            saved={marquee.saved}
            onSave={() => marquee.save(marquee.data)}
          />
        </div>
        <Field label="Skills shown in the scrolling ticker">
          <TagInput
            value={marquee.data.items}
            onChange={(items) => marquee.setData({ items })}
          />
        </Field>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg">Capability Groups</h2>
          <button
            onClick={() =>
              groups.addItem({
                title: "New Group",
                items: [],
                order: groups.items.length,
              } as Omit<SkillGroup, "id">)
            }
            className="flex items-center gap-1 text-xs text-accent hover:underline"
          >
            <Plus size={13} /> Add group
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {groups.items.map((group) => (
            <div key={group.id} className="border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <input
                  defaultValue={group.title}
                  onBlur={(e) => groups.updateItem(group.id, { title: e.target.value })}
                  className="flex-1 bg-transparent font-display text-lg outline-none border-b border-transparent focus:border-accent transition-colors"
                />
                <button
                  onClick={() => groups.deleteItem(group.id)}
                  className="text-muted hover:text-red-400 p-2 shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <TagInput
                value={group.items}
                onChange={(items) => groups.updateItem(group.id, { items })}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
