import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  ChevronDownIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { FilterIcon } from "lucide-react";
import React from "react";
import KanbanBoard from "./KanbanBoard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/hooks/useUserContext";
import { useDocument } from "@/hooks/useDocument";
import { Badge } from "@/components/ui/badge";
import { useUsersContext } from "@/hooks/useUsersContext";

export default function Tasks({ selectedPriority }) {
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const { userDoc } = useUserContext();
  const { document: teamDoc } = useDocument("teams", userDoc.teamId);
  const { users } = useUsersContext();

  return (
    <div className="p-8 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Tarefas do time</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex items-center gap-2.5 border border-border py-2 px-4 rounded-lg mt-5 sm:mt-0">
            <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar"
              className="focus:outline-none bg-transparent w-full"
            />
            <Cross2Icon
              role="button"
              className="text-muted-foreground"
              onClick={() => setSearch("")}
            />
          </div>
          <Button size="default" onClick={() => setShowNewTaskDialog(true)}>
            <PlusIcon />
            Nova tarefa
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className="flex items-center gap-2 text-muted-foreground"
                role="button"
              >
                <p>Filtrar por tags</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teamDoc?.tags?.map((tag) => (
                <DropdownMenuItem
                  className={`${tag === selectedTag ? "bg-primary/50" : ""}`}
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedTag && (
            <Badge className="cursor-default">
              {selectedTag}{" "}
              <Cross2Icon
                onClick={() => setSelectedTag(null)}
                role="button"
                className="ml-1.5"
              />
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className="flex items-center gap-2 text-muted-foreground"
                role="button"
              >
                <p>Filtrar por membro</p>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Membros</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {users?.map((u) => (
                <DropdownMenuItem
                  className={`${u.id === selectedMember ? "bg-primary/50" : ""}`}
                  key={u.id}
                  onClick={() => setSelectedMember(u.id)}
                >
                  {u.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedMember && (
            <Badge className="cursor-default">
              {users.find((u) => u.id === selectedMember)?.name}
              <Cross2Icon
                onClick={() => setSelectedMember(null)}
                role="button"
                className="ml-1.5"
              />
            </Badge>
          )}
        </div>
      </div>
      <KanbanBoard
        search={search}
        selectedTag={selectedTag}
        selectedPriority={selectedPriority}
        selectedMember={selectedMember}
        showNewTaskDialog={showNewTaskDialog}
        setShowNewTaskDialog={setShowNewTaskDialog}
      />
    </div>
  );
}
