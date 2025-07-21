"use client";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";
import { Note } from "@/app/types/note";
import { getAllTasks } from "@/lib/api";

type Props = {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
};

export default function AppSidebar({ notes, onSelectNote }: Props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 mt-2 text-lg">
            {user ? (
              "Vos notes"
            ) : (
              <p>
                <Link href="/login" className="underline">
                  Se connecter
                </Link>{" "}
                pour voir vos notes
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContent notes={notes} onSelectNote={onSelectNote} />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
