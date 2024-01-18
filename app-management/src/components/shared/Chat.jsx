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
import { ChevronLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { timestamp } from "@/firebase/config";

export default function Chat({
  selectedChat,
  chats,
  setSelectedChat,
  setChatIsOpen,
  users,
}) {
  const { user } = useAuthContext();
  const {
    updateDocument: updateChat,
    addDocument: createChat,
    addSubDocument: createMessage,
  } = useFirestore("chats");
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
    if (messageContent === "") return;

    let chatId = chat?.id;

    if (!chat?.id) {
      const { payload } = await createChat({
        participants: [...selectedChat.participants],
      });
      chatId = payload.id;
    }

    await createMessage(chatId, "messages", {
      author: user.uid,
      createdAt: new Date(),
      content: messageContent,
    });

    await updateChat(chat?.id || chatId, {
      lastMessage: {
        content: messageContent,
        createdAt: timestamp,
      }
    })

    setMessageContent("");
  };


  const closeChat = () => {
    setChatIsOpen(false);
    setSelectedChat(null);
  };

  const openChat = (chat, userName) => {
    setChatIsOpen(true);
    setSelectedChat({
      id: chat.id,
      recipient: userName,
    });
  };

  const formatMessageDate = (dateObj) => {
    const now = new Date();
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const daysOfWeek = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];

    // Calcula a diferença entre a data atual e a data passada em dias
    const diffInDays = Math.floor((now - dateObj) / dayInMilliseconds);

    // Se for o mesmo dia, retorna a hora
    if (diffInDays === 0) {
      return dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Se for o dia anterior, retorna "Ontem"
    if (diffInDays === 1) {
      return "Ontem";
    }

    // Se for entre 2 e 6 dias atrás, retorna o dia da semana
    if (diffInDays >= 2 && diffInDays < 7) {
      return daysOfWeek[dateObj.getDay()];
    }

    // Se for 7 dias atrás ou mais, retorna a data no formato DD/MM/AA
    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-32 right-[248px] h-[400px] w-80 bg-input rounded-lg p-3 border border-foreground/10 drop-shadow-xl">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          {selectedChat && (
            <Button variant="ghost" onClick={() => setSelectedChat(null)}>
              <ChevronLeftIcon
                size="icon"
                variant="ghost"
                className="w-6 h-6"
              />
            </Button>
          )}
          {selectedChat && (
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/50">
                {getInitials(selectedChat.recipient)}
              </AvatarFallback>
            </Avatar>
          )}
          <p className={`${selectedChat ? "" : "font-medium text-lg"}`}>
            {selectedChat?.recipient || "Conversas"}
          </p>
          <Button
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={closeChat}
            size="icon"
          >
            <Cross1Icon />
          </Button>
        </div>
        <Separator className="bg-foreground/20 my-4" />
        <ScrollArea className="flex-grow">
          {selectedChat
            ? (messages?.length &&
                messages?.map((message) => (
                  <Message key={message.id} message={message} />
                ))) || (
                <p className="text-foreground/50">
                  Não há mensagens para exibir.
                </p>
              )
            : chats?.map((chat) => {
                const chatUser = users.filter(
                  (u) =>
                    chat.participants &&
                    u.id !== user.uid &&
                    chat.participants.includes(u.id)
                );

                return (
                  <>
                    <div
                      key={chat.id}
                      onClick={() => openChat(chat, chatUser.name)}
                      role="button"
                    >
                      <div className="flex gap-2.5 relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/50">
                            {chatUser.map((user) => (
                              <span key={user.id}>
                                {getInitials(user.name)}
                              </span>
                            ))}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {chatUser.map((user) => (
                            <p className="font-medium" key={user.id}>
                              {user.name}
                            </p>
                          ))}
                          {chat.lastMessage ? (
                            <>
                              {chat.lastMessage.content && (
                                <p className="text-muted-foreground text-sm">
                                  {chat.lastMessage.content}
                                </p>
                              )}
                              {chat.lastMessage.createdAt && (
                                <p className="absolute top-2 right-2 text-muted-foreground text-xs">
                                  {formatMessageDate(
                                    chat.lastMessage.createdAt.toDate()
                                  )}
                                </p>
                              )}
                            </>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator className="bg-foreground/20 my-4" />
                  </>
                );
              }) || (
                <p className="text-foreground/50">
                  Não há conversas para exibir.
                </p>
              )}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input
            type="text"
            placeholder="Digite aqui..."
            value={messageContent}
            onChange={(evento) => setMessageContent(evento.target.value)}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
