"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/providers/UserProvider";


type Props = {
  type: "login" | "sign-up";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUser();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const nom = formData.get("nom") as string | undefined;
      let errorMessage;
      try {
        let response;
        if (isLoginForm) {
          const url = "/api/proxy/users/users/login";
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
        } else {
          const user = { nom: nom || "", email, password };
          const url = "/api/proxy/users/users/register";
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
        }
        if (!response.ok) {
          let data;
          try {
            data = await response.json();
          } catch (e) {
            data = await response.text();
          }
          if (data?.error?.issues?.[0]?.message === "Email déjà utilisé") {
            errorMessage = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
          } else {
            errorMessage = (data && data.message) || "Erreur lors de l'authentification.";
          }
        } else {
          const data = await response.json();
          if (isLoginForm) {
            if (data && data.user && data.user.id) {
              const userId = data.user.id;
              document.cookie = `userId=${userId}; path=/;`;
              localStorage.setItem("user", JSON.stringify(data.user));
              setUser(data.user);
            }
          }
          if (!isLoginForm && Array.isArray(data) && data.length > 0) {
            const userCreated = data[0];
            toast({
              title: "Inscription réussie",
              description: `Bienvenue ${userCreated.nom} !`,
            });
            router.replace(`/?toastType=${type}`);
            return;
          }
        }
      } catch (e) {
        const error = e as Error;
        errorMessage = error.message || "Erreur réseau.";
      }
      if (!errorMessage) {
        router.replace(`/?toastType=${type}`);
      } else {
        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isLoginForm ? "Connexion" : "Inscription"}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required />
        </div>
        {!isLoginForm && (
          <div className="mb-4">
            <Label htmlFor="nom">Nom</Label>
            <Input type="text" id="nom" name="nom" required />
          </div>
        )}
        <div className="mb-4">
          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" id="password" name="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            isLoginForm ? "Se connecter" : "S'inscrire"
          )}
        </Button>
      </form>
      <p className="text-center mt-4">
        {isLoginForm ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
        <Link href={isLoginForm ? "/sign-p" : "/login"} className="ml-2 text-blue-500 hover:underline">
          {isLoginForm ? "Inscrivez-vous" : "Connectez-vous"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;