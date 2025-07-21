"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";


function LogOutButton() {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    localStorage.removeItem("user");
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null); // Met à jour le contexte, donc le header se met à jour sans refresh
    router.push(`/?toastType=logOut`);
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
       {loading ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <>
          <LogOut className="w-4 h-4 text-red-700" />
         
        </>
      )}
    </Button>
  );
}

export default LogOutButton;

