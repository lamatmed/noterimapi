"use client";
import { useState, useEffect } from "react";
import type { Note } from "@/app/types/note";
import { getAllTasks, getTask } from "@/lib/api";
import NoteFormClient from "@/components/NoteFormClient";
import HomeToast from "@/components/HomeToast";
import AppSidebar from "@/components/AppSidebar";
import { useUser } from "@/providers/UserProvider";

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { user } = useUser();

  useEffect(() => {
    getAllTasks().then(setNotes);
  }, []);

  const handleSelectNote = async (noteId: string) => {
    const note = await getTask(noteId);
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    setSelectedNote({
      id: "",
      name: "",
      description: "",
      done: false,
      creetdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  const handleSave = () => {
    setSelectedNote(null);
    getAllTasks().then(setNotes);
  };

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        {user ? (
          <button onClick={handleNewNote} className="btn btn-primary">Nouvelle note</button>
        ) : (
          <div className="text-muted-foreground text-sm p-2">
            Connectez-vous pour créer et gérer vos notes.
          </div>
        )}
      </div>
      <div className="flex w-full max-w-4xl">
        <AppSidebar notes={notes} onSelectNote={handleSelectNote} />
        <div className="flex-1">
          {selectedNote && (
            <NoteFormClient note={selectedNote} onSave={handleSave} />
          )}
        </div>
      </div>
      <HomeToast />
    </div>
  );
}
