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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className={`p-6 ${isLoginForm ? "bg-green-600" : "bg-blue-600"} text-white`}>
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center">
              {isLoginForm ? "Connexion à votre compte" : "Créer un compte"}
            </h1>
            <p className="text-center text-indigo-100 mt-2">
              {isLoginForm ? "Entrez vos informations pour continuer" : "Commencez votre expérience en quelques secondes"}
            </p>
          </div>
          
          <CardContent className="p-6">
            <form
              onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmit(formData);
              }}
            >
              {!isLoginForm && (
                <div className="mb-5">
                  <Label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</Label>
                  <div className="relative">
                    <Input 
                      type="text" 
                      id="nom" 
                      name="nom" 
                      required 
                      className="pl-10 py-5 text-base rounded-xl border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-5">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</Label>
                <div className="relative">
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="pl-10 py-5 text-base rounded-xl border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</Label>
                <div className="relative">
                  <Input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    className="pl-10 py-5 text-base rounded-xl border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className={`w-full py-6 text-lg font-medium rounded-xl transition-all ${isPending ? 'opacity-80' : 'hover:opacity-90'}`}
                disabled={isPending}
                style={{
                  background: isLoginForm 
                    ? 'linear-gradient(to right, #4F46E5, #7C3AED)' 
                    : 'linear-gradient(to right, #3B82F6, #6366F1)'
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  isLoginForm ? "Se connecter" : "S'inscrire"
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="p-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm w-full">
              {isLoginForm ? "Première visite ?" : "Déjà membre ?"}
              <Link 
                href={isLoginForm ? "/sign-up" : "/login"} 
                className={`ml-1 font-medium ${isLoginForm ? 'text-blue-600 hover:text-blue-800' : 'text-indigo-600 hover:text-indigo-800'}`}
              >
                {isLoginForm ? "Créer un compte" : "Se connecter"}
              </Link>
            </p>
          </CardFooter>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>En continuant, vous acceptez nos <a href="#" className="text-indigo-600 hover:underline">Conditions d'utilisation</a> et notre <a href="#" className="text-indigo-600 hover:underline">Politique de confidentialité</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;