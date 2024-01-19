import { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Máquina de Lucrar" },
    "task-2": { id: "task-2", content: "Lamborghini" },
    "task-3": { id: "task-3", content: "Mustang" },
    "task-4": { id: "task-4", content: "Família próspera" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export default function KanbanBoard() {
  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    // TODO: handle reordering
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={columnId} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
