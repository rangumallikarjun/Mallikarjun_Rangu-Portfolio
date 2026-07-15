import { Check, Loader2 } from "lucide-react";

export default function SaveBar({
  saving,
  saved,
  onSave,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 bg-accent text-black rounded-full px-6 py-2.5 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saving ? "Saving…" : "Save Changes"}
      </button>
      {saved && (
        <span className="flex items-center gap-1.5 text-sm text-accent">
          <Check size={14} /> Saved
        </span>
      )}
    </div>
  );
}
