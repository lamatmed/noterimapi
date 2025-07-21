import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import HomeToast from "@/components/HomeToast";



type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = {}; // getUser(); // This line is removed as per the edit hint.

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = {};

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
      
      Error: ./src/app/page.tsx:1:1
[1m[31mModule not found[39m[22m: Can't resolve [32m'@/auth/server'[39m
[0m[31m[1m>[22m[39m[90m 1 |[39m [36mimport[39m { getUser } [36mfrom[39m [32m"@/auth/server"[39m[33m;[39m
 [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
 [90m 2 |[39m
 [90m 3 |[39m [36mimport[39m [33mNewNoteButton[39m [36mfrom[39m [32m"@/components/NewNoteButton"[39m[33m;[39m
 [90m 4 |[39m [36mimport[39m [33mNoteTextInput[39m [36mfrom[39m [32m"@/components/NoteTextInput"[39m[33m;[39m[0m

Import map: aliased to relative './src/auth/server' inside of [project]/

https://nextjs.org/docs/messages/module-not-found
    at tr (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:20168:60)
    at o6 (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:2952:164)
    at iP (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:4008:32)
    at i$ (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:4305:28)
    at sv (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:5791:21)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:5782:40
    at sm (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:5783:19)
    at sa (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:5596:23)
    at sZ (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:6520:124)
    at MessagePort._ (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_next-devtools_index_d575f738.js:8806:49)
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={ ""} />

      <HomeToast />
    </div>
  );
}

export default HomePage;
