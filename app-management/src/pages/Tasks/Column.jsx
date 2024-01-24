import React, { useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import NewTaskDialog from "./NewTaskDialog";

export default function Column({
  column,
  tasks,
  showNewTaskDialog,
  setShowNewTaskDialog,
}) {
  const [selectedColumn, setSelectedColumn] = useState("");

  const getColumnName = (id) => {
    switch (id) {
      case "column-1":
        return "backlog";
      case "column-2":
        return "todo";
      case "column-3":
        return "in_progress";
      case "column-4":
        return "in_review";
      default:
        return "backlog";
    }
  };

  return (
    <div className="fake-container sm:w-1/4 bg-secondary p-5 border border-border rounded-xl flex flex-col">
      <h3 className="font-semibold text-xl">{column.title}</h3>
      <Droppable droppableId={column.id || ''}>
  {(provided) => {
    return (
      <div
        className="mt-5 flex-grow min-h-[250px] flex flex-col justify-between"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {tasks.length ? (
          tasks.map((task, index) => (
            <Task
              columnId={column.id}
              key={task?.id}
              task={task}
              index={index}
            />
          ))
        ) : (
          <div></div>
        )}
        {provided.placeholder}

        <NewTaskDialog
          open={showNewTaskDialog}
          setOpen={setShowNewTaskDialog}
          selectedColumn={selectedColumn}
        >
          <Button
            className="shadow-md"
            variant="outline"
            onClick={() => {
              localStorage.setItem(
                "selectedColumn",
                getColumnName(column.id)  
              );
              setShowNewTaskDialog(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Adicionar tarefa
          </Button>
        </NewTaskDialog>
      </div>
    );
  }}
</Droppable>

    </div>
  );
}
