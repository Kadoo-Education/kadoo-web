
import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card"
import { Separator } from "@/presentation/external/components/ui/separator"

import { Footprints, PlusCircle, Calendar as CalIcon, Clock3, Link2, MapPin } from "lucide-react"
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { notFound } from "next/navigation"
import { CreateInPersonEventDialog } from "@/presentation/modules/step-by-id/components/create/create-in-person-event-dialog"
import { CreateOnlineEventDialog } from "@/presentation/modules/step-by-id/components/create/create-online-event-dialog"
import { CreateActivityDialog } from "@/presentation/modules/step-by-id/components/create/create-activity-dialog"
import { stepGatewayHttp } from "@/infra/modules/step/step-gateway-http"

type PageProps = {
  params: Promise<{ id: string }>
}

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("pt-BR") : "-"

const fmtMode = (s?: string | null) =>
  s ? s.toString().toLowerCase().replace(/^\w/, c => c.toUpperCase()) : "-"

const stepPill = (step: any) => {
  if (step.kind === "event") {
    const isOnline = step.event?.type === "online"
    return {
      icon: isOnline ? Link2 : MapPin,
      text: `Evento ${isOnline ? "Online" : "Presencial"}`
    }
  }
  return { icon: Footprints, text: "Atividade" }
}

async function getEdictById(id: number) {
  const edict = await edictGatewayHttp.getById(id)

  return edict
}

async function getStepsByEdictId(edictId: number) {
  const steps = await stepGatewayHttp.getByEdictId(edictId)

  return steps
}

export default async function EdictByIdPage({ params }: PageProps) {

  const { id } = await params

  const edict = await getEdictById(Number(id))

  const steps = await getStepsByEdictId(Number(id))

  if (!edict) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Detalhes do Edital</h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-md text-gray-950 font-semibold">Edital: {edict?.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">Editar edital</Button>
            <Button variant="ghost" asChild>
              <a href="/adm/editais">Voltar</a>
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Footprints className="w-5 h-5 text-[#5127FF]" />
              Etapas do Edital
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <CreateInPersonEventDialog>
                <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Evento Presencial
                </Button>
              </CreateInPersonEventDialog>

              <CreateOnlineEventDialog>
                <Button className="bg-[#5127FF] hover:bg-[#5127FF]/90">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Evento Online
                </Button>
              </CreateOnlineEventDialog>

              <CreateActivityDialog>
                <Button variant="outline" className="border-[#5127FF]">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Adicionar Atividade
                </Button>
              </CreateActivityDialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {/* Evento Presencial */}
              {steps.map((step: any) => {
                const pill = stepPill(step)
                const PillIcon = pill.icon

                return (
                  <Card key={step.id} className="border-0 shadow-sm ring-1 ring-[#5127FF]/10">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#5127FF]/10 px-2.5 py-1 text-xs font-medium text-[#5127FF]">
                          <PillIcon className="h-3.5 w-3.5" />
                          {pill.text}
                        </div>
                        <CardTitle className="mt-2 text-base">{step.title}</CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm" variant="destructive">Deletar</Button>
                      </div>
                    </CardHeader>

                    <CardContent className="text-sm text-gray-600 space-y-2">
                      <div className="flex items-center gap-2">
                        <CalIcon className="h-4 w-4 text-gray-500" />
                        <span>Data: {fmtDate(step.date)}</span>
                      </div>

                      {step.kind === "event" && (
                        <>
                          {step.event?.meetingLink && (
                            <div className="flex items-center gap-2">
                              <Link2 className="h-4 w-4 text-gray-500" />
                              <a
                                href={step.event.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2"
                              >
                                {step.event.meetingLink}
                              </a>
                            </div>
                          )}

                          {step.event?.address && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{step.event.address}</span>
                            </div>
                          )}

                          <Separator className="my-2" />
                          <div className="text-xs text-gray-500">
                            formato: Evento • modo: {fmtMode(step.event?.type)}
                          </div>
                        </>
                      )}

                      {step.kind === "activity" && (
                        <>
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-gray-500" />
                            <span>Entrega até: {fmtDate(step.activity?.dueDate)}</span>
                          </div>

                          {step.activity?.file && (
                            <div className="flex items-center gap-2">
                              <Link2 className="h-4 w-4 text-gray-500" />
                              <a
                                href={step.activity.file}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2"
                              >
                                Modelo / arquivo da atividade
                              </a>
                            </div>
                          )}

                          <Separator className="my-2" />
                          <div className="text-xs text-gray-500">
                            formato: Atividade{step.activity?.file ? " • arquivo obrigatório" : ""}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
