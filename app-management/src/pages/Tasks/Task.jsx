import LabelSvg from "@/components/shared/Label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUsersContext } from "@/hooks/useUsersContext";
import getInitials from "@/utils/getInitials";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
  const { users } = useUsersContext();

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
              <DotsHorizontalIcon className="w-5 h-5" role="button" />
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
                    className="-ml-2.5 mt-5 bg-primary/50 rounded-full w-8 h-8 flex justify-center items-center"
                    key={member.id}
                  >
                    {member.photoURL ? <img className="rounded-full" src={member.photoURL} alt={member.name} /> : <span>{getInitials(member.name)}</span>}
                  </div>
                ))}
              </div>
              <div className="flex mt-6 items-center gap-2.5">
                  <LabelSvg />
                  {task.dueDate.toDate().toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
