import React, { useEffect, useLayoutEffect, useState } from "react";
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

export default function MembersBar({ setSelectedChat, setChatIsOpen, chats }) {
  const { documents: users } = useCollection("users");
  const { user } = useAuthContext();

  const openChat = (userId, userName) => {
    const chat = chats.find(
      (chat) =>
        chat.recipients.includes(userId) &&
        chat.recipients.includes(user?.uid)
    );
  
    if (!chat) {
      // Tratar o caso em que o chat não foi encontrado
      console.error('Chat não encontrado.:', userId);
      return;
    }
  
    setChatIsOpen(true);
    setSelectedChat({
      id: chat.id,
      recipient: userName,
    });
  };
  

  useEffect(() => {
    if (users) {
      localStorage.setItem("usersLength", users.length);
    }
  }, [users]);

  //if (!users) return <Loading />;

  return (
    <aside className="h-screen w-[200px] border border-border p-5">
      <h2 className="font-medium text-lg mb-3">Membros</h2>
      {users
        ? users.map((user) => (
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
          ))
        : [...Array(Number(localStorage.getItem("usersLength")))].map(
            (_, index) => <MembersSkeleton key={index} />
          )}
    </aside>
  );
}
