import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCollection } from "@/hooks/useCollection";
import { Skeleton } from "../ui/skeleton";

function MembersSkeleton() {
  return (
    <div className="flex items-center gap-2.5 py-2">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-[120px]" />
    </div>
  );
}

export default function MembersBar() {
  const { documents: users } = useCollection("users");
  const usersLength = Number(localStorage.getItem("userLength"));

  const openChat = (userId) => {
    // To Do: função irá abrir o chat com o usuário e o id userID
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
      {users ? (
        users.map((user) => (
          <div
            key={user.id}
            className="flex items-center text-sm gap-2 py-2.5"
            role="button"
            onClick={() => openChat(user.id)}
          >
            <div
              className={`${
                user.online ? "bg-green-400" : "bg-red-500"
              } h-2 w-2 rounded-full`}
            />
            <p className="font-medium">{user.name}</p>
          </div>
        ))
      ) : (
        [...Array(usersLength)].map((_, index) =>  <MembersSkeleton key={index} />)
      )}
    </aside>
  );
}
