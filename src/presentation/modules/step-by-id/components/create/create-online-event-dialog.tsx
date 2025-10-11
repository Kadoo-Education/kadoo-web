"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/presentation/external/components/ui/dialog"
import { Input as ShadInput } from "@/presentation/external/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/external/components/ui/popover"
import { Calendar as CalIcon, Link2, MapPin, PlusCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/external/components/ui/select"
import { Button } from "@/presentation/external/components/ui/button"
import { Calendar as CalendarShad } from "@/presentation/external/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { cn } from "@/presentation/external/lib/utils"
import { Textarea } from "@/presentation/external/components/ui/textarea"

export function CreateOnlineEventDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Novo Evento Online</DialogTitle>
          <DialogDescription>Preencha os campos para adicionar um evento online.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Título *</span>
            <ShadInput placeholder="Ex: Workshop de Pitch" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Data *</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start")}>
                    <CalIcon className="mr-2 h-4 w-4" />
                    Selecionar
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <CalendarShad mode="single" captionLayout="dropdown" locale={ptBR} />
                </PopoverContent>
              </Popover>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Modalidade *</span>
              <Select defaultValue="Online">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent defaultValue="Online">
                  <SelectItem disabled value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Link* </span>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-gray-400" />
              <ShadInput placeholder="https://..." />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Descrição *</span>
            <Textarea rows={4} placeholder="Detalhes do evento" />
          </label>
        </div>

        <DialogFooter>
          <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90" type="button">Adicionar Evento</Button>
          <Button variant="ghost" type="button">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
    </Dialog>
  )
}