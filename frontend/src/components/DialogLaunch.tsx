import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Calendario } from "./Calendario";
import { Checkbox } from "./ui/checkbox";
import { CircleQuestionMark } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { api } from "@/api";
import type { Launch } from "@/interfaces/Launch";

interface DialogLaunchProps{
    refresh: () => void
}

export function DialogLaunch({refresh}:DialogLaunchProps) {
  const [date, setDate] = useState<Date>();
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [dateForm, setDateForm] = useState<string>("");
  const [type, setType] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(true); 


  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log(date?.toISOString().split("T")[0]);
  }, [date]);


  const handleCheck = (value: boolean) => {
    setType(value)
  }

  const handleSave = async() =>{

    if(!date || !value || !description){
        toast.error("Preencha os campos obrigatorios")
        return
    }

    const payload: Launch = {
        description,
        
        value: Number(value),
        date: date?.toISOString().split("T")[0],
        type: type? "ENTRADA" : "SAIDA"
        
    }

    console.log(payload)


    try {
        await api.post("/launch", payload)
        toast.success("Lançamento efetuado com sucesso")
        setOpenDialog(false)
        refresh()
    } catch (error) {
        console.log(error)
    }
  }


  useEffect(() => {
    console.log(type)
  }, [type])

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Registrar Lançamento</Button>
        </DialogTrigger>
        <DialogContent className="w-screen">
          <DialogHeader>
            <DialogTitle>Registrar Lançamento</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Calendario 
                date={date} 
                onChange={setDate} 
            />

            <div className="grid gap-3">
              <Label>Descrição</Label>
              <Input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Valor</Label>
              <Input
                type="text"
                placeholder="Valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
                <Checkbox 
                    checked={type} 
                    onCheckedChange={handleCheck}
                />
                <Label>Recebimento?</Label>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CircleQuestionMark size={15}/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Desmarque caso seja lançamento pagamento</p>
                    </TooltipContent>
                </Tooltip>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
