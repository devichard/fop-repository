import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  CalendarIcon,
  ChatBubbleIcon,
  ClockIcon,
  ColumnsIcon,
  Cross2Icon,
  DashboardIcon,
  ExitIcon,
  FileTextIcon,
  InfoCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import Logo from "./Logo";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import LabelSvg from "./Label";
import getInitials from "@/utils/getInitials";

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
    icon: <DashboardIcon className="" />,
  },
  {
    route: "/tasks",
    name: "Tarefas",
    icon: <FileTextIcon />,
  },
  {
    route: "/chats",
    name: "Conversas",
    icon: <ChatBubbleIcon />,
  },
  {
    route: "/calendar",
    name: "Calendário",
    icon: <CalendarIcon />,
  },
  {
    route: "/fiscalnote",
    name: "Nota Fiscal",
    icon: <ColumnsIcon />
  },
];

const labelOptions = [
  {
    value: "high",
    name: "Alta prioridade",
    icon: <LabelSvg color="#F00" />,
  },
  {
    value: "medium",
    name: "Média prioridade",
    icon: <LabelSvg color="orange" />,
  },
  {
    value: "low",
    name: "Baixa prioridade",
    icon: <LabelSvg color="#f7D372" />,
  },
  {
    value: "standby",
    name: "Em Standby",
    icon: <LabelSvg color="#7fD372" />,
  },
];

export default function Sidebar({
  rerender,
  selectedPriority,
  setSelectedPriority,
}) {
  const navigate = useNavigate();
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="h-screen w-[225px] bg-accent border border-border">
      <div className="p-5">
        <Logo size="sm" />
      </div>

      <div className="flex p-5 gap-2.5">
        <Avatar>
          <AvatarImage src={user.photoURL} />
          <AvatarFallback className="bg-primary/50">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.displayName}</p>
          <p className="text-muted-foreground/50 text-sm font-medium">
            Membro Ruby
          </p>
        </div>
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

      <h2 className="font-bold text-xl px-5 mb-4">Projetos</h2>

      {projectOptions.map((option) => (
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

      <h2 className="font-bold text-xl px-5 mb-4">Etiquetas</h2>

      {labelOptions.map((option) => (
        <div
          key={option.value}
          role="button"
          className="px-5 py-1.5 flex items-center justify-between"
          
        >
          <div className="flex gap-1" onClick={() => setSelectedPriority(option.value)}>
            {option.icon}
            <p
              className={`text-md/90 ${
                selectedPriority === option.value ? "font-bold" : ""
              }`}
            >
              {option.name}
            </p>
          </div>
          {option.value === selectedPriority && (
            <Cross2Icon
              role="button"
              onClick={() => setSelectedPriority(null)}
            />
          )}
        </div>
      ))}

      <Separator className="my-4" />

      <div className="px-5">
        {" "}
        <Button
          size="noPadding"
          variant="ghost"
          onClick={logout}
          className="opacity-50"
        >
          <InfoCircledIcon className="w-4 h-4 mr-2" />
          Central de Ajuda
        </Button>
        <Button
          size="noPadding"
          variant="ghost"
          onClick={logout}
          className="opacity-50"
        >
          <ExitIcon className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
      {rerender && <span className="hidden"></span>}
    </nav>
  );
}
