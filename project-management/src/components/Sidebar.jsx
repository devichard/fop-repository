import React from "react";
import { useNavigate } from "react-router-dom";

const options = [
    {
      route: "/",
      name: "Página Inicial",
    },
    {
      route: "/projects",
      name: "Meus projetos",
    },
  ];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-[200px] bg-red-500">
      <div className="text-3xl font-bold p-5">CHARDS</div>
      {options.map((option) => (
        <div>
          <div
          key={option.route}
          role="button"
          className="p-5"
          onClick={() => navigate(option.route)}>
            {option.name}
          </div>
        </div>
      ))}
    </div>
  );
}
