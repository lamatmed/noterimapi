import { getUser } from "@/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";
import { Note } from "@/app/types/note";

async function AppSidebar() {
  const user = await getUser();

  let notes: Note[] = [];

  if (user) {
   
  }

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
          {user && <SidebarGroupContent notes={notes} />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
