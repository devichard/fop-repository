import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithPresets } from "@/components/shared/DatePickerWithPresets";
import Select from "react-select";
import { useDocument } from "@/hooks/useDocument";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useFirestore } from "@/hooks/useFirestore";
import { arrayUnion } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/hooks/useUserContext";
import { useUsersContext } from "@/hooks/useUsersContext";

const priorityOptions = [
    { value: "low", label: "Baixa" },
    { value: "medium", label: "Média" },
    { value: "high", label: "Alta" },
    { value: "standby", label: "Em Standby" },
];

export default function NewTaskDialog({ children, open, setOpen }) {
    const { addSubDocument: addTask } = useFirestore("teams");
    const { toast } = useToast();
    const { userDoc } = useUserContext();
    const { users } = useUsersContext();
    const { document: teamDoc } = useDocument("teams", userDoc.teamId);
    const { updateDocument: updateTeam } = useFirestore("teams");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState("");
    const [assignedMembers, setAssignedMembers] = useState([]);
    const [newTag, setNewTag] = useState([]);
    const [showNewTagForm, setShowNewTagForm] = useState(false);
    const selectedColumn = localStorage.getItem("selectedColumn") || "backlog";

    const userOptions = users?.map((user) => ({
        value: user.id,
        label: user.name,
    }));

    const tagOptions = teamDoc?.tags.map((tag) => ({ value: tag, label: tag }));

    const addNewTag = async (e) => {
        e.preventDefault();
        if (!newTag) return;
        await updateTeam("tCOZQtSnxlC2jomGKHQf", {
            tags: arrayUnion(newTag),
        });
        toast({
            title: "Tag criada com sucesso!",
            description: `A tag "${newTag}" foi adicionada com êxito.`,
        });
        setNewTag("");
        setShowNewTagForm(false);
    };

    const getColumn = (status) => {
        switch (status) {
            case "backlog":
                return "column-1";
            case "todo":
                return "column-2";
            case "in_progress":
                return "column-3";
            case "in_review":
                return "column-4";
            default:
                return "column-1";
        }
    }

    const createTask = async (e) => {
        e.preventDefault();
        if (
            !title ||
            !description ||
            !dueDate ||
            !priority ||
            assignedMembers.length < 1 ||
            selectedTags.length < 1
        )
            return;

        const { payload: taskId } = await addTask(userDoc.teamId, "tasks", {
            title,
            description,
            tags: selectedTags.map((tag) => tag.value),
            dueDate,
            assignedMembers: assignedMembers.map((member) => member.value),
            status: selectedColumn,
            deleted: false,
            priority,
        });

        const column = getColumn(selectedColumn);

        await updateTeam(userDoc.teamId, {
            [column]: arrayUnion(taskId),
        });

        toast({
            title: "Nova tarefa",
            description: `A tarefa "${title}" foi adicionada com sucesso.`,
        });
        setTitle("");
        setDescription("");
        setSelectedTags([]);
        setDueDate(null);
        setAssignedMembers([]);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova tarefa</DialogTitle>
                    <DialogDescription>
                        Preencha os campos de acordo com as informações da nova tarefa.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Título</Label>
                        <Input
                            id="name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Descrição</Label>
                        <Textarea
                            id="name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-32 resize-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="name">Tags</Label>
                            <PlusCircledIcon
                                className="h-3 w-3 shrink-0"
                                role="button"
                                onClick={() => setShowNewTagForm(true)}
                            />
                            {showNewTagForm && (
                                <form onSubmit={addNewTag}>
                                    <Input
                                        palceholder="Nova tag..."
                                        className="h-6"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                    />
                                </form>
                            )}
                        </div>
                        <Select
                            isMulti
                            isSearchable
                            options={tagOptions}
                            onChange={(options) => setSelectedTags(options)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Data para conclusão</Label>
                        <DatePickerWithPresets date={dueDate} setDate={setDueDate} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Prioridade</Label>
                        <Select
                            options={priorityOptions}
                            onChange={(option) => setPriority(option.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Atribuir a:</Label>
                        <Select
                            isMulti
                            isSearchable
                            options={userOptions}
                            onChange={(options) => setAssignedMembers(options)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={createTask}>
                        Criar tarefa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
