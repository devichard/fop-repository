import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

export default function Column({ column, tasks }) {
  return (
    <div className="fake-container bg-secondary p-5 border border-border rounded-xl">
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className="task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
