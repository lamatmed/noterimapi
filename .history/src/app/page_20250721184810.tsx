import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import HomeToast from "@/components/HomeToast";
import { useUser } from "@/providers/UserProvider";


type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = {};

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
      
        <NewNoteButton user={useUser.User } />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={ ""} />

      <HomeToast />
    </div>
  );
}

export default HomePage;
