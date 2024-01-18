import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="p-5">
      <h1 className="font-semibold mb-10 text-2xl">Meu perfil</h1>
      <div className="mb-10">
        <Avatar className="h-16 w-16" role="button">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/50 text-2xl">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <input type="file" className="hidden"/>
      </div>
      <ModeToggle />
    </div>
  );
}
