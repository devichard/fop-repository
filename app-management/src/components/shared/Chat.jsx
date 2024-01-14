import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export default function Chat({ selectedChat }) {
  function getInitials(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }

  const messages = null;

  return (
    <div className="fixed bottom-32 right-[248px] h-[400px] w-80 bg-input rounded-lg p-3 border border-foreground/10 drop-shadow-xl">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/50">
              {getInitials(selectedChat.recipient)}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium">{selectedChat.recipient}</p>
        </div>
        <Separator className="bg-foreground/20 my-4" />
        <ScrollArea className="flex-grow">
          {messages?.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input type="text" placeholder="Digite aqui..." className="" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
