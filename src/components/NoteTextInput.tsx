"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Note } from "@/app/types/note";

type Props = {
  note: Note;
  onSave?: (note: Note) => void; // callback pour sauvegarder la note
};

export default function NoteTextInput({ note, onSave }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const [form, setForm] = useState<Note>(note);

  useEffect(() => {
    if (noteIdParam === note.id) {
      setForm(note);
    }
  }, [note, noteIdParam]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
    // Ici tu peux aussi faire un appel API ou autre
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-4xl">
      <div>
        <label className="block font-medium mb-1" htmlFor="name">Titre</label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Titre de la note"
        />
      </div>
      <div>
        <label className="block font-medium mb-1" htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Écrivez vos notes ici..."
          className="custom-scrollbar resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="done"
          name="done"
          type="checkbox"
          checked={form.done}
          onChange={handleChange}
        />
        <label htmlFor="done">Terminé</label>
      </div>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
