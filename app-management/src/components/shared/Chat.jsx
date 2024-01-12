import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Chat() {
  return (
    <div className="fixed bottom-32 right-[248px] h-[400px] w-80 bg-input rounded-lg p-3">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/50">RC</AvatarFallback>
          </Avatar>
          <p className="font-medium">Regina Célia</p>
        </div>
        <Separator className="bg-foreground/20 my-4" />
        <div className="flex-grow">Mensagens</div>
        <div className="flex gap-2.5">
          <Input type="text" placeholder="Digite aqui..." className="" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
