"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks";
import { TextInput } from "@/components/admin/Field";
import type { SocialLink } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

export default function SocialPage() {
  const links = useFirestoreCollection<SocialLink>("socialLinks");

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Social Links</h1>
          <p className="text-muted text-sm mt-1">Shown in the contact section.</p>
        </div>
        <button
          onClick={() =>
            links.addItem({
              label: "New Link",
              url: "https://",
              order: links.items.length,
            } as Omit<SocialLink, "id">)
          }
          className="flex items-center gap-2 bg-accent text-black rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {links.items.map((link) => (
          <div
            key={link.id}
            className="border border-border rounded-2xl p-4 grid grid-cols-[140px_1fr_auto] gap-3 items-center"
          >
            <TextInput
              defaultValue={link.label}
              onBlur={(e) => links.updateItem(link.id, { label: e.target.value })}
              placeholder="Label"
            />
            <TextInput
              defaultValue={link.url}
              onBlur={(e) => links.updateItem(link.id, { url: e.target.value })}
              placeholder="https://"
            />
            <button
              onClick={() => links.deleteItem(link.id)}
              className="text-muted hover:text-red-400 p-2 justify-self-end"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {!links.items.length && (
          <p className="text-muted text-sm">No social links yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
