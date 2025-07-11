import LabelSvg from "@/components/shared/Label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUsersContext } from "@/hooks/useUsersContext";
import getInitials from "@/utils/getInitials";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Draggable } from "react-beautiful-dnd";
import calculateDaysUntilDue from "@/utils/daysUntilDue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/hooks/useUserContext";
import { useDocument } from "@/hooks/useDocument";
import { useFirestore } from "@/hooks/useFirestore";
import { arrayRemove } from "firebase/firestore";

export default function Task({ task, index, columnId }) {
  const { users } = useUsersContext();
  const { userDoc } = useUserContext();
  const { deleteSubDocument: deleteTask } = useFirestore("teams");
  const { updateDocument: updateTeam } = useFirestore("teams");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "#f7d372";
      case "medium":
        return "orange";
      case "high":
        return "#FF0000";
      case "standby":
        return "#5abb54";
      default:
        return "gray";
    }
  };

  const removeTask = async (taskId) => {
    await deleteTask(userDoc.teamId, "tasks", taskId);
    await updateTeam(userDoc.teamId, {
      [columnId]: arrayRemove(taskId),
    });
  };

  if (!task) return null;

  const assignedMembers = users.filter((u) =>
    task.assignedMembers.includes(u.id)
  );


  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`fake-container p-5 border border-border mb-5 rounded-lg bg-background shadow-md`} // ${snapshot.isDragging && "bg-primary"} design<<<<
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsHorizontalIcon className="w-5 h-5" role="button" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => removeTask(task.id)}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {task.tags.map((tag) => (
                <Badge className="font-light rounded-md" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex">
                {assignedMembers.map((member) => (
                  <div
                    className="-ml-2.5 mt-5 bg-black/60 rounded-full w-8 h-8 flex justify-center items-center text-secondary"
                    key={member.id}
                  >
                    {member.photoURL ? <img className="rounded-full" src={member.photoURL} alt={member.name} /> : <span className="text-sm font-semibold">{getInitials(member.name)}</span>}
                  </div>
                ))}
              </div>
              <div className="flex mt-5 items-center gap-1.5">
                <LabelSvg color={getPriorityColor(task.priority)} />
                <p className="text-muted-foreground">
                  Faltam {calculateDaysUntilDue(task.dueDate?.seconds)} dias
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
