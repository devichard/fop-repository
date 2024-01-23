import { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useSubcollection } from "@/hooks/useSubcollection";
import { useUserContext } from "@/hooks/useUserContext";
import { useEffect } from "react";

const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      taskIds: [],
    },
    "column-2": { id: "column-2", title: "A fazer", taskIds: [] },
    "column-3": { id: "column-3", title: "Em progresso", taskIds: [] },
    "column-4": { id: "column-4", title: "Em revisão", taskIds: [] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default function KanbanBoard() {
  const { userDoc } = useUserContext();
  const { documents: tasks } = useSubcollection(
    "teams",
    userDoc.teamId,
    "tasks"
  );

  const [state, setState] = useState(initialData);

  useEffect(() => {
    if (tasks) {
      //Transforma o array em um objeto de tarefas
      const tasksObject = tasks?.reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      }, {});

      const columnsTaskIds = {
        Backlog: [],
        "A fazer": [],
        "Em progresso": [],
        "Em revisão": [],
      };

      tasks?.forEach((task) => {
        switch (task.status) {
          case "backlog":
            columnsTaskIds["Backlog"].push(task.id);
            break;
          case "todo":
            columnsTaskIds["A fazer"].push(task.id);
            break;
          case "in_progress":
            columnsTaskIds["Em progresso"].push(task.id);
            break;
          case "in_review":
            columnsTaskIds["Em revisão"].push(task.id);
            break;
          default:
            break;
        }
      });

      const newState = {
        tasks: tasksObject,
        columns: {
          "column-1": {
            ...initialData.columns["column-1"],
            taskIds: columnsTaskIds["Backlog"],
          },
          "column-2": {
            ...initialData.columns["column-2"],
            taskIds: columnsTaskIds["A fazer"],
          },
          "column-3": {
            ...initialData.columns["column-3"],
            taskIds: columnsTaskIds["Em progresso"],
          },
          "column-4": {
            ...initialData.columns["column-4"],
            taskIds: columnsTaskIds["Em revisão"],
          },
        },
        columnOrder: initialData.columnOrder,
      };
      setState(newState);
    }
  }, [tasks])




  const onDragEnd = (result) => {
    // TODO: handle reordering
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (destination.droppableId === source.droppableId) {
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
    } else {
      const newStartTaskIds = Array.from(start.taskIds);
      newStartTaskIds.splice(source.index, 1);

      const newStart = {
        ...start,
        taskIds: newStartTaskIds,
      };

      const newFinishTaskIds = Array.from(finish.taskIds);
      newFinishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        taskIds: newFinishTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setState(newState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 mt-10">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column
              state={state}
              setState={setState}
              key={columnId}
              column={column}
              tasks={tasks}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
