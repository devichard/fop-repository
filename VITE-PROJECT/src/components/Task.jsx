import { TrashIcon } from "@radix-ui/react-icons";
import saveTasks from "../functions/saveTasks";

export default function Task({ task, index, tasks, setTasks }) {

    const deleteTask = (index) => {
        const currentTasks = [...tasks];
        currentTasks.splice(index, 1)
        setTasks(currentTasks);
        saveTasks(currentTasks);
        //deletar tarefa
      };
    
      const changeTaskStatus = (index) => {
        const currentTasks = [...tasks];
        const taskToUpdate = currentTasks.at(index);
        taskToUpdate.done = !taskToUpdate.done;
        currentTasks.splice(index, 1, taskToUpdate);
        setTasks(currentTasks);
        saveTasks(currentTasks);
      };

    return (
        <div
              key={task.id} 
              className={`${
                task.done ? "opacity-50" : "" }
                flex items-center justify-between text-slate-200 text-sm py-2.5`}
              >
                <div className="flex flex-grow items-center gap-6">
                  <input
                  type="checkbox"
                  className="scale-125"
                  onChange={() => {
                    changeTaskStatus(index);
                  }}
                  value={task.done}
                  checked={task.done}
                  />
                  <div className="w-1/3">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-slate-400">{task.description}</p>
                  </div>
                  <div
                  className={`${
                    task.priority === "urgent"
                  ? "bg-red-900/50 text-red-500 "
                  : task.priority === "important"
                  ? "bg-yellow-900/50 text-amber-600"
                  : "bg-slate-400/10 text-slate-300"
                } py-1 px-2 text-xs rounded-full`}
                  >
                  {task.priority === "urgent"
                  ? "urgente"
                  : task.priority === "important"
                  ? "importante"
                  : "normal"}
                  </div>
                </div>
                <TrashIcon role="button" className="scale-125 text-red-400" onClick={() => {
                  deleteTask(index)}}
                  />
              </div>
    )   
}