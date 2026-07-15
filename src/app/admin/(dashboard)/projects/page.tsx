"use client";

import { useFirestoreCollection } from "@/lib/firebase/hooks";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import TagInput from "@/components/admin/TagInput";
import type { Project } from "@/lib/content-types";
import { Plus, Trash2 } from "lucide-react";

const gradients = [
  "linear-gradient(135deg, #7c5cff 0%, #cdff4c 100%)",
  "linear-gradient(135deg, #ff6b57 0%, #7c5cff 100%)",
  "linear-gradient(135deg, #35d0ba 0%, #0d0d11 100%)",
  "linear-gradient(135deg, #cdff4c 0%, #ff6b57 100%)",
  "linear-gradient(135deg, #7c5cff 0%, #35d0ba 100%)",
];

export default function ProjectsPage() {
  const projects = useFirestoreCollection<Project>("projects");

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl">Projects</h1>
          <p className="text-muted text-sm mt-1">Featured work shown on the site.</p>
        </div>
        <button
          onClick={() =>
            projects.addItem({
              title: "New Project",
              category: "",
              year: String(new Date().getFullYear()),
              description: "",
              imageUrl: "",
              gradient: gradients[projects.items.length % gradients.length],
              tags: [],
              link: "",
              order: projects.items.length,
              published: true,
            } as Omit<Project, "id">)
          }
          className="flex items-center gap-2 bg-accent text-black rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {projects.items.map((project) => (
          <div key={project.id} className="border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="grid sm:grid-cols-3 gap-3 flex-1">
                <TextInput
                  defaultValue={project.title}
                  onBlur={(e) => projects.updateItem(project.id, { title: e.target.value })}
                  placeholder="Title"
                />
                <TextInput
                  defaultValue={project.category}
                  onBlur={(e) => projects.updateItem(project.id, { category: e.target.value })}
                  placeholder="Category"
                />
                <TextInput
                  defaultValue={project.year}
                  onBlur={(e) => projects.updateItem(project.id, { year: e.target.value })}
                  placeholder="Year"
                />
              </div>
              <button
                onClick={() => projects.deleteItem(project.id)}
                className="text-muted hover:text-red-400 p-2 shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Field label="Description">
                <TextArea
                  defaultValue={project.description}
                  onBlur={(e) =>
                    projects.updateItem(project.id, { description: e.target.value })
                  }
                  rows={2}
                />
              </Field>

              <Field label="Cover image URL (used if set, otherwise the gradient below)">
                <TextInput
                  defaultValue={project.imageUrl}
                  onBlur={(e) => projects.updateItem(project.id, { imageUrl: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                />
              </Field>

              <Field label="Fallback gradient">
                <div className="flex gap-2">
                  {gradients.map((g) => (
                    <button
                      key={g}
                      onClick={() => projects.updateItem(project.id, { gradient: g })}
                      style={{ background: g }}
                      className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
                        project.gradient === g ? "border-fg" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Tags">
                <TagInput
                  value={project.tags}
                  onChange={(tags) => projects.updateItem(project.id, { tags })}
                />
              </Field>

              <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-center">
                <Field label="Link">
                  <TextInput
                    defaultValue={project.link}
                    onBlur={(e) => projects.updateItem(project.id, { link: e.target.value })}
                    placeholder="https://"
                  />
                </Field>
                <label className="flex items-center gap-2 text-sm mt-6">
                  <input
                    type="checkbox"
                    checked={project.published}
                    onChange={(e) =>
                      projects.updateItem(project.id, { published: e.target.checked })
                    }
                    className="accent-accent"
                  />
                  Published
                </label>
              </div>
            </div>
          </div>
        ))}
        {!projects.items.length && (
          <p className="text-muted text-sm">No projects yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
