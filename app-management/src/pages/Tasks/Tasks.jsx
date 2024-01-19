import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { FilterIcon } from "lucide-react";
import React from "react";
import KanbanBoard from "./KanbanBoard";

export default function Tasks() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Tarefas do time</h1>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <MagnifyingGlassIcon className="h-6 w-6 absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Pesquisar" className="pl-10" />
          </div>
          <Button size="default">
            <PlusIcon />
            Nova tarefa
          </Button>
        </div>
      </div>
      <div className="flex">
        <Popover>
          <PopoverTrigger>
            <div
              className="flex items-center gap-2 text-muted-foreground"
              role="button"
            >
              <FilterIcon className="w-4 h-4" />
              <p>Filtrar</p>
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent>Later</PopoverContent>
        </Popover>
      </div>
      <KanbanBoard />
    </div>
  );
}
