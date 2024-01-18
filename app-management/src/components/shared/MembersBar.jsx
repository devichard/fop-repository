import React, { useEffect } from "react";
import { useCollection } from "@/hooks/useCollection";
import { Skeleton } from "../ui/skeleton";
import { useAuthContext } from "@/hooks/useAuthContext";

function MembersSkeleton() {
  return (
    <div className="flex items-center gap-2.5 py-2">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-[120px]" />
    </div>
  );
}

export default function MembersBar({
  setSelectedChat,
  setChatIsOpen,
  chats,
  users,
}) {
  const { user } = useAuthContext();

  const openChat = (userId, userName) => {
    // Verifica se já existe um chat com o usuário especificado
    const existingChat = chats.find(
      (chat) =>
        chat.participants &&
        chat.participants.includes(userId) &&
        chat.participants.includes(user.uid)
    );

    if (existingChat) {
      setChatIsOpen(true);
      setSelectedChat({
        id: existingChat.id,
        recipient: userName,
        participants: existingChat.participants,
      });
    } else {
      // Se não existir, cria um novo chat
      const newChat = {
        participants: [userId, user.uid],
        createdAt: new Date(),
        recipient: userName,
      };

      console.log("Novo chat criado:", newChat);

      setChatIsOpen(true);
      setSelectedChat({
        id: chats.id, // Defina um ID apropriado para o novo chat
        recipient: userName,
        participants: newChat.participants,
      });
    }
  };

  useEffect(() => {
    if (users) {
      localStorage.setItem("usersLength", users.length.toString());
    }
  }, [users]);

  return (
    <aside className="h-screen w-[200px] border border-border p-5">
      <h2 className="font-medium text-lg mb-3">Membros</h2>
      {users
        ? users
            .filter((u) => !user?.uid || u.id !== user?.uid)
            .map((user) => {
              console.log("User:", user);
              return (
                <div
                  key={user.id}
                  className="flex items-center text-sm gap-2 py-2.5"
                  role="button"
                  onClick={() => openChat(user.id, user.name)}
                >
                  <div
                    className={`${
                      user.online ? "bg-green-400" : "bg-red-500"
                    } h-2 w-2 rounded-full`}
                  />
                  <p className="font-medium">{user.name}</p>
                </div>
              );
            })
        : [...Array(Number(localStorage.getItem("usersLength")))].map(
            (_, index) => <MembersSkeleton key={index} />
          )}
    </aside>
  );
}
