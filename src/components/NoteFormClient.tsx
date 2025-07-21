"use client";
import { useState } from "react";
import NoteTextInput from "./NoteTextInput";
import type { Note } from "@/app/types/note";
import { createTask, updateTask } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type Props = {
  note: Note;
  onSave?: () => void;
};

export default function NoteFormClient({ note, onSave }: Props) {
  const [currentNote, setCurrentNote] = useState<Note>(note);
  const { toast } = useToast();

  return (
    <NoteTextInput
      note={currentNote}
      onSave={async (note) => {
        // Nettoyage des champs pour éviter null
        const safeNote = {
          ...note,
          name: note.name || "",
          description: note.description || "",
        };
        try {
          if (safeNote.id) {
            await updateTask(safeNote.id, safeNote);
            toast({
              title: "Note mise à jour",
              description: "La note a bien été modifiée.",
              variant: "success",
            });
          } else {
            await createTask(safeNote);
            toast({
              title: "Note créée",
              description: "La note a bien été ajoutée.",
              variant: "success",
            });
          }
          setCurrentNote(safeNote);
          if (onSave) onSave();
        } catch (e) {
          toast({
            title: "Erreur",
            description: "Erreur lors de la sauvegarde de la note.",
            variant: "destructive",
          });
        }
      }}
    />
  );
} 