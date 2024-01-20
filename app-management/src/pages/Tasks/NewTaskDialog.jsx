import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithPresets } from "@/components/shared/DatePickerWithPresets";

export default function NewTaskDialog({ children }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova tarefa</DialogTitle>
                    <DialogDescription>
                        Preencha os campos de acordo com as informações da nova tarefa.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Título
                        </Label>
                        <Input
                            id="name"
                            value={title} onChange={(evento) => setTitle(evento.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Descrição</Label>
                        <Textarea
                            id="name"
                            value={description}
                            onChange={(evento) => setDescription(evento.target.value)}
                            className="h-32 resize-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Data para conclusão</Label>
                        <DatePickerWithPresets/>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Criar tarefa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
