import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/presentation/external/components/ui/badge";

import { GetAllEdictDTO } from "@/infra/modules/edict/dto/get-all-edict-dto";
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";
import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { Calendar, Clock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/presentation/external/components/ui/dialog"

export function EdictDetails() {

  const [edict, setEdict] = useState<GetAllEdictDTO[] | null>(null)

  const getAllEdicts = useCallback(async () => {
    await edictGatewayHttp.getAll().then(setEdict)
  }, [])

  useEffect(() => {
    getAllEdicts()
  }, [getAllEdicts])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Editais</h2>
        <Button
          variant="outline"
          className="border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
        >
          Ver Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {edict?.map((edict) => (
          <Card key={edict.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{edict.title}</CardTitle>
                <Badge variant="secondary" className="bg-[#F4DA02]/20 text-[#5127FF] shrink-0">
                  {edict?.tags?.[0]}
                </Badge>
              </div>
              <CardDescription className="text-sm">{edict.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(edict.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(edict.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              {edict.isSubscribed ? (
                <span className="block text-center text-sm text-green-600 font-semibold mt-6">
                  Você já está inscrito nesse edital
                </span>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full text-white bg-[#5127FF] hover:bg-[#5127FF]/90">Inscrever-se</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1E1B2E] text-white border border-[#312E44] rounded-2xl shadow-xl p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Confirmar inscrição?</DialogTitle>
                    </DialogHeader>
                    <p className="text-white/80 text-sm mt-2">Você deseja se inscrever neste edital?</p>
                    <DialogFooter className="mt-6 flex justify-end gap-2">
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="text-white hover:bg-white/10">Cancelar</Button>
                      </DialogTrigger>
                      <Button className="bg-[#F4DA02] text-[#1E1B2E] font-semibold hover:bg-[#F4DA02]/90">
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}