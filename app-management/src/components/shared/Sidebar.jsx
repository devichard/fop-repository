import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { ClockIcon, ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import Logo from "./Logo";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";

const userOptions = [
  {
    route: "/activity",
    name: "Atividade",
    icon: <ClockIcon className="h-4 w-4" />,
  },
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon className="h-4 w-4" />,
  },
];

const projectOptions = [
  {
    route: "/",
    name: "Dashboard",
  },
  {
    route: "/tasks",
    name: "Tarefas",
  },
  {
    route: "/chats",
    name: "Conversas",
  },
  {
    route: "/calendar",
    name: "Calendário",
  },
];

const labelOptions = [
  {
    route: "/",
    name: "Alta prioridade",
  },
  {
    route: "/",
    name: "Média prioridade",
  },
  {
    route: "/",
    name: "Baixa prioridade",
  },
  {
    route: "/",
    name: "Aguardando Atividade",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="h-screen w-[200px] bg-accent">
      <div className="p-5">
        <Logo size="sm" />
      </div>

      <div className="flex p-5 gap-2.5">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/50">AR</AvatarFallback>
        </Avatar>
        <div>
        <p className="font-medium">{user.displayName}</p>
        <p className="text-muted-foreground/50 text-sm font-medium">Membro Ruby</p></div>

      </div>

      {userOptions.map((option) => (
        <div
          key={option.route}
          role="button"
          className="px-5 py-1.5 flex items-center gap-2"
          onClick={() => navigate(option.route)}
        >
          {option.icon}
          <p className="text-md font-medium">{option.name}</p>
        </div>
      ))}
      <Separator className="my-4" />
      <ModeToggle />
      <Button variant="outline" onClick={logout}>
        <ExitIcon className="w-4 h-4 mr-2" />
        Sair da conta
      </Button>
    </div>
  );
}
