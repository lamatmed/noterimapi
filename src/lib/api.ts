import type { Note } from "@/app/types/note";

export async function createTask(task: Omit<Note, "id" | "creetdAt" | "updatedAt">) {
  const res = await fetch("/api/proxy/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function updateTask(id: string, updates: Partial<Note>) {
  const res = await fetch(`/api/proxy/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}

export async function getTask(id: string) {
  const res = await fetch(`/api/proxy/tasks/${id}`);
  if (!res.ok) throw new Error("Erreur lors du chargement");
  return res.json();
}

export async function getAllTasks() {
  const res = await fetch("/api/proxy/tasks");
  if (!res.ok) throw new Error("Erreur lors du chargement");
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`/api/proxy/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return res;
} 