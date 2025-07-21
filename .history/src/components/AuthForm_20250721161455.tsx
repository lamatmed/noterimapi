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


type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();
  const { toast } = useToast();

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
          console.log("URL de la requête:", url);
          console.log("Payload:", { email, password });
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          console.log("Réponse brute:", response);
        } else {
          // Pour l'inscription, on envoie uniquement les champs attendus
          const user = {
            nom: nom || "",
            email,
            password,
          };
          const url = "/api/proxy/users/users/register";
          console.log("URL de la requête:", url);
          console.log("Payload:", user);
          response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          console.log("Réponse brute:", response);
        }
        if (!response.ok) {
          let data;
          try {
            data = await response.json();
          } catch (e) {
            data = await response.text();
          }
          console.log("Réponse non OK:", data);
          errorMessage = (data && data.message) || "Erreur lors de l'authentification.";
        } else {
          const data = await response.json();
          console.log("Réponse OK:", data);
          if (isLoginForm) {
            // Stocke l'id utilisateur dans un cookie après login
            if (data && (data.id || (data.user && data.user.id))) {
              const userId = data.id || data.user.id;
              document.cookie = `userId=${userId}; path=/;`;
              // Stocke toutes les données utilisateur dans le localStorage
              localStorage.setItem("user", JSON.stringify(data));
              setTimeout(() => window.location.reload(), 100);
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
      } catch (e: any) {
        console.error("Erreur attrapée dans le catch:", e);
        errorMessage = e.message || "Erreur réseau.";
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
    <form action={handleSubmit} >
      <CardContent className="grid w-full items-center gap-4">
        {!isLoginForm && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              name="nom"
              placeholder="Entrez votre nom"
              type="text"
              required
              disabled={isPending}
            />
          </div>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            placeholder="Entrez votre e-mail"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Se connecter"
          ) : (
            "S'inscrire"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Vous n'avez pas encore de compte ?"
            : "Vous avez déjà un compte ?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "S'inscrire" : "Se connecter"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
