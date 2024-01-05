import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "id-" + Date.now() + Math.random(),
      title: "Primeira Nota",
      description: "Descrição da primeira nota",
      done: false,
    },
    {
      id: "id-" + Date.now() + Math.random(),
      title: "Segunda Nota",
      description: "Descrição da segunda nota",
      done: false,
    },
  ]);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const addNewTask = () => {
    const currentTasks = [...tasks];
    const newTask = {
      id: "id-" + Date.now() + Math.random(),
      title: title,
      description: description,
      done: false,
    };

    currentTasks.unshift(newTask);

    setTasks(currentTasks);

    setModalOpen(false);
    setTitle("");
    setDescription("");
    
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <div className="flex flex-col h-2/3 w-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-slate-200 font-bold text-4lg mt-4 mb-3">
            FANOTA - Cadastro de Produtos
          </h1>
          <button onClick={openModal} className="text-sm py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500">
            + Nova Nota
          </button>
        </div>
        <div className="flex flex-col divide-y divide-slate-700 flex-grow bg-slate-900 rounded-lg px-5 py-2.5">
          {tasks.map((task) => {
            return (
              <div key={task.id} className="text-slate-200 text-sm py-2.5">
                {/* <input type="checkbox" className="scale-125" /> */}
                <p className="font-medium">{task.title}</p>
                <p className="text-slate-400">{task.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-white text-2xl mb-4 font-bold">Criação de Nota</h2>
            <input
              type="text"
              className="border mb-4 p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-400"
              placeholder="Nome do Cliente"
              value={title}
              onChange={(evento) => {
                setTitle(evento.target.value);
              }}
            />
            <textarea
            style={{height: "100px"}}
              className="resize-none border p-2 w-full rounded-lg bg-transparent text-slate-200 focus:outline-none focus:border-slate-600"
              placeholder="Descrição da Compra"
              value={description}
              onChange={(evento) => {
                setDescription(evento.target.value);
              }}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="text-sm py-1.5 px-3 rounded-lg border border-red-500 text-red-500"
              >
                Cancelar
              </button>
              <button onClick={addNewTask} className="text-sm py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500 ml-2">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
