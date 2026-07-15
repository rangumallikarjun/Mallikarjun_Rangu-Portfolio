"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({
  value,
  onChange,
  placeholder = "Add and press Enter",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  };

  return (
    <div className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 flex flex-wrap gap-2 items-center focus-within:border-accent transition-colors">
      {value.map((tag, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 bg-bg border border-border rounded-full px-3 py-1 text-xs"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-muted hover:text-fg"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={addTag}
        placeholder={placeholder}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
      />
    </div>
  );
}
