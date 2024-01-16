import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSubcollection } from "@/hooks/useSubcollection";
import Message from "./Message";
import getInitials from "@/utils/getInitials";
import { useFirestore } from "@/hooks/useFirestore";
import { useState } from "react";

export default function Chat({ selectedChat, chats }) {
  const { user } = useAuthContext();
  const { addSubDocument: createMessage } = useFirestore("chats");
  const [messageContent, setMessageContent] = useState("");

  const chat = chats.find((chat) => {
    return chat.id === selectedChat?.id;
  });

  const { documents: messages } = useSubcollection(
    "chats",
    chat?.id,
    "messages",
    null,
    ["createdAt", "asc"]
  );

    const sendMessage = async () => {
      await createMessage(chat?.id, "messages", {
        author: user.uid,
        createAt: new Date(),
        content: messageContent,
      });

      setMessageContent();
    }

  return (
    <div className="fixed bottom-32 right-[248px] h-[400px] w-80 bg-input rounded-lg p-3 border border-foreground/10 drop-shadow-xl">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          {selectedChat && (
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/50">
                {getInitials(selectedChat.recipient)}
              </AvatarFallback>
            </Avatar>
          )}
          <p className="font-medium">
            {selectedChat?.recipient || "Conversas"}
          </p>
        </div>
        <Separator className="bg-foreground/20 my-4" />
        <ScrollArea className="flex-grow">
          {selectedChat
            ? messages?.map((message) => <Message key={message.id} message={message} />) || (
                <p className="text-foreground/50">
                  Não há mensagens para exibir.
                </p>
              )
            : chats?.map((chat) => <div key={chat.id}>Chards</div>) || (
                <p className="text-foreground/50">
                  Não há conversas para exibir.
                </p>
              )}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input type="text" placeholder="Digite aqui..." value={messageContent} onChange={(evento) => setMessageContent(evento.target.value)} />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
