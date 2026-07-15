"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks";
import { TextInput } from "@/components/admin/Field";
import type { Certification } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

export default function CertificationsPage() {
  const certs = useFirestoreCollection<Certification>("certifications");

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Certifications</h1>
          <p className="text-muted text-sm mt-1">Security certifications and credentials.</p>
        </div>
        <button
          onClick={() =>
            certs.addItem({
              name: "New Certification",
              issuer: "",
              year: "",
              credentialUrl: "",
              order: certs.items.length,
            } as Omit<Certification, "id">)
          }
          className="flex items-center gap-2 bg-accent text-black rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {certs.items.map((cert) => (
          <div
            key={cert.id}
            className="border border-border rounded-2xl p-5 grid md:grid-cols-[1fr_1fr_90px_1fr_auto] gap-3 items-center"
          >
            <TextInput
              defaultValue={cert.name}
              onBlur={(e) => certs.updateItem(cert.id, { name: e.target.value })}
              placeholder="Certification name"
            />
            <TextInput
              defaultValue={cert.issuer}
              onBlur={(e) => certs.updateItem(cert.id, { issuer: e.target.value })}
              placeholder="Issuer"
            />
            <TextInput
              defaultValue={cert.year}
              onBlur={(e) => certs.updateItem(cert.id, { year: e.target.value })}
              placeholder="Year"
            />
            <TextInput
              defaultValue={cert.credentialUrl}
              onBlur={(e) => certs.updateItem(cert.id, { credentialUrl: e.target.value })}
              placeholder="Credential URL"
            />
            <button
              onClick={() => certs.deleteItem(cert.id)}
              className="text-muted hover:text-red-400 p-2 justify-self-end"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {!certs.items.length && (
          <p className="text-muted text-sm">No certifications yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
