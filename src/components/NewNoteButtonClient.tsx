"use client";
import NewNoteButton from "./NewNoteButton";
import { useUser } from "@/providers/UserProvider";

export default function NewNoteButtonClient() {
  const { user } = useUser();
  return <NewNoteButton user={user} />;
} 