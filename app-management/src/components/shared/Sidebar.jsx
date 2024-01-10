import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const options = [
    {
      route: "/",
      name: "Pagina inicial",
    },
    {
      route: "/projects",
      name: "Meus projetos",
    },
    {
      route: "/login",
      name: "Login [TESTE]",
    },
  ];

export default function Sidebar() {
    const navigate = useNavigate();

  return <div className="h-screen w-[200px] bg-red-500">
    <div className="text-3xl font-bold p-5">CHARDS</div>
    {options.map(option => (
        <div
        key={option.route}
        role="button"
        className="p-5"
        onClick={() => navigate(option.route)}>
            {option.name}
        </div>
    ))}
    <ModeToggle></ModeToggle>
  </div>;
}
