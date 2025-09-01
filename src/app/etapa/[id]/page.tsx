'use client'

import { notFound } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft, Calendar, Clock3, Link2, MapPin, FileText, Info, ClipboardList
} from "lucide-react"

import { Badge } from "@/presentation/external/components/ui/badge"
import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card"
import { Separator } from "@/presentation/external/components/ui/separator"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Input } from "@/presentation/shared/components/form/input/input"

type Trilha =
  | {
    id: string
    title: string
    type: "evento"
    status: "concluida" | "em_andamento" | "pendente"
    date?: string
    mode?: "presencial" | "online"
    address?: string
    time?: string
    link?: string
  }
  | {
    id: string
    title: string
    type: "atividade"
    status: "concluida" | "em_andamento" | "pendente"
    activityTitle?: string
    activityDescription?: string
  }

const trilhas: Trilha[] = [
  {
    id: "1",
    title: "Boas-vindas e Introdução",
    type: "evento",
    date: "2025-08-05",
    status: "concluida",
    mode: "presencial",
    address: "Auditório Central, Bloco A",
    time: "09:00",
    link: "link aqui",
  },
  {
    id: "2",
    title: "Oficina de Validação",
    type: "atividade",
    status: "em_andamento",
    activityTitle: "Oficina de Prototipagem",
    activityDescription:
      "Os participantes devem criar protótipos iniciais com base nas ideias validadas.",
  },
  {
    id: "3",
    title: "Mentoria Coletiva com Especialistas",
    type: "evento",
    status: "pendente",
    date: "12/08/2025",
    mode: "online",
    link: "https://meet.google.com/abc-defg-hij",
    time: "14:30",
  },
  {
    id: "4",
    title: "Envio de Pitch Final",
    type: "atividade",
    status: "pendente",
    activityTitle: "Apresentação Final",
    activityDescription: "Cada equipe deverá gravar e enviar o pitch final do projeto.",
  },
]

export default function TrilhaPage({ params }: { params: { id: string } }) {
  const trilha = trilhas.find((t) => t.id === params.id)

  const [answer, setAnswer] = useState("")
  const [edictFile, setEdictFile] = useState<File | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)

  if (!trilha) return notFound()

  const isEvento = trilha.type === "evento"
  const isAtividade = trilha.type === "atividade"

  function statusBadgeStyle(status: Trilha["status"]) {
    if (status === "concluida") return "bg-green-100 text-green-700 border-green-200"
    if (status === "em_andamento") return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-slate-100 text-slate-700 border-slate-200"
  }

  const helperDescription =
    trilha.type === "evento"
      ? "Este evento foi pensado para ampliar sua rede e acelerar o aprendizado com uma experiência prática e direta."
      : "Atividade prática para colocar a mão na massa. Nós valorizamos clareza e objetividade nas entregas."

  async function handleSubmit() {
    try {
      setSubmitting(true)

      await new Promise((r) => setTimeout(r, 700))
      setAnswer("")
      setEdictFile(undefined)

    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/etapas-do-edital/1"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5127FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para trilhas
        </Link>

        <div className="flex items-center gap-2">
          <Badge className={`border ${statusBadgeStyle(trilha.status)}`}>
            {trilha.status === "concluida"
              ? "Concluída"
              : trilha.status === "em_andamento"
                ? "Em andamento"
                : "Pendente"}
          </Badge>
          <Badge className="border bg-[#5127FF]/10 text-[#5127FF] border-[#5127FF]/20">
            {trilha.type === "evento" ? "Evento" : "Atividade"}
          </Badge>
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-[#5127FF]">
            {trilha.title}
          </CardTitle>
          <p className="text-sm text-slate-600 flex items-start gap-2 mt-2">
            <Info className="w-4 h-4 mt-0.5 text-[#5127FF]" />
            {helperDescription}
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {isEvento ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              {"date" in trilha && trilha.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#5127FF]" />
                  <span>
                    <span className="font-medium">Data: </span>
                    {trilha.date}
                  </span>
                </div>
              )}

              {"time" in trilha && trilha.time && (
                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4 text-[#5127FF]" />
                  <span>
                    <span className="font-medium">Horário: </span>
                    {trilha.time}
                  </span>
                </div>
              )}

              {"mode" in trilha && trilha.mode && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#5127FF]" />
                  <span className="capitalize">
                    <span className="font-medium">Modalidade: </span>
                    {trilha.mode}
                  </span>
                </div>
              )}

              {"mode" in trilha &&
                trilha.mode === "presencial" &&
                "address" in trilha &&
                trilha.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5127FF]" />
                    <span>
                      <span className="font-medium">Local: </span>
                      {trilha.address}
                    </span>
                  </div>
                )}

              {"mode" in trilha &&
                trilha.mode === "online" &&
                "link" in trilha &&
                trilha.link && (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#5127FF]" />
                    <a
                      href={trilha.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#5127FF] underline-offset-2 hover:opacity-90"
                    >
                      Acessar link da sessão
                    </a>
                  </div>
                )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-700">
              {"activityTitle" in trilha && trilha.activityTitle && (
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#5127FF]" />
                  <span>
                    <span className="font-medium">Título da Atividade: </span>
                    {trilha.activityTitle}
                  </span>
                </div>
              )}

              {"activityDescription" in trilha && trilha.activityDescription && (
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-1 text-[#5127FF]" />
                  <span>
                    <span className="font-medium">Descrição: </span>
                    {trilha.activityDescription}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {isAtividade && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sua entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium text-slate-700">
                Resposta / Observações
              </label>
              <Textarea
                id="answer"
                placeholder="Descreva sua solução, links de protótipos ou anotações importantes…"
                className="min-h-32 resize-y"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                Dica: seja objetivo e inclua referências (links) se necessário.
              </p>
            </div>

            <div className="space-y-2">
              {/* Mantive exatamente o seu padrão de Input composto */}
              <Input.Root>
                <Input.Label className="text-sm font-medium text-gray-700 block">
                  Arquivo PDF do edital (opcional)
                </Input.Label>

                <Input.Core
                  type="file"
                  accept="application/pdf"
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEdictFile(e?.target?.files?.[0] || undefined)
                  }
                />
              </Input.Root>

              {edictFile && (
                <p className="text-xs text-slate-600">
                  Selecionado: <span className="font-medium">{edictFile.name}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="border-slate-300"
                type="button"
                onClick={() => {
                  setAnswer("")
                  setEdictFile(undefined)
                }}
                disabled={submitting}
              >
                Limpar
              </Button>

              <Button
                className="bg-[#5127FF] hover:bg-[#4522d9] text-white"
                type="button"
                onClick={handleSubmit}
                disabled={submitting || (!answer && !edictFile)}
              >
                {submitting ? "Enviando..." : "Enviar resposta"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
