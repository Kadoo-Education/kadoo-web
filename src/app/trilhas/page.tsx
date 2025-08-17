'use client'

import { Card, CardContent } from "@/presentation/external/components/ui/card"
import { Badge } from "@/presentation/external/components/ui/badge"
import { ArrowRight, CheckCircle, Clock3, Circle, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

const trilhas = [
  {
    id: "1",
    title: "Boas-vindas e Introdução",
    type: "evento",
    status: "concluida",
    date: "05/08/2025",
    mode: "presencial",
    address: "Auditório Central, Bloco A",
    time: "09:00",
  },
  {
    id: "2",
    title: "Oficina de Validação",
    type: "atividade",
    status: "em_andamento",
    activityTitle: "Oficina de Prototipagem",
    activityDescription: "Os participantes devem criar protótipos iniciais com base nas ideias validadas.",
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

export default function TrilhasDoEditalPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-32">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#5127FF] mb-2">Etapas do edital</h1>
        <p className="text-muted-foreground">
          Acompanhe as trilhas e etapas disponíveis neste edital.
        </p>
      </div>

      <div className="space-y-6 relative">
        {trilhas.map((trilha, index) => {
          const isOpen = openIndex === index
          const isEvento = trilha.type === "evento"
          const isAtividade = trilha.type === "atividade"

          return (
            <motion.div
              key={trilha.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative flex gap-4"
            >
              <div className="flex flex-col items-center">
                {trilha.status === "concluida" ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : trilha.status === "em_andamento" ? (
                  <Clock3 className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
                {index < trilhas.length - 1 && (
                  <div className="w-px h-20 bg-gray-200 mt-1" />
                )}
              </div>

              <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
                <CardContent className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/trilha/${trilha.id}`}
                        className="text-lg font-semibold text-[#5127FF] hover:underline underline-offset-2"
                      >
                        {trilha.title}
                      </Link>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            trilha.status === "concluida"
                              ? "bg-green-100 text-green-700"
                              : trilha.status === "em_andamento"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {trilha.status === "concluida"
                            ? "Concluída"
                            : trilha.status === "em_andamento"
                            ? "Em andamento"
                            : "Pendente"}
                        </Badge>

                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`trilha-panel-${trilha.id}`}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition"
                        >
                          <ChevronDown
                            className={`w-4 h-4 text-[#5127FF] transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 capitalize">
                        {trilha.type}{" "}
                        {"date" in trilha && trilha.date ? `• ${trilha.date}` : ""}
                      </span>

                      <Link
                        href={`/trilhas/${trilha.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#5127FF] hover:opacity-90"
                      >
                        Ver detalhes
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`trilha-panel-${trilha.id}`}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
                          {isEvento && (
                            <>
                              {"mode" in trilha && trilha.mode && (
                                <p>
                                  <span className="font-medium">Modalidade:</span> {trilha.mode}
                                </p>
                              )}
                              {"mode" in trilha &&
                                trilha.mode === "presencial" &&
                                "address" in trilha &&
                                trilha.address && (
                                  <p>
                                    <span className="font-medium">Endereço:</span> {trilha.address}
                                  </p>
                                )}
                              {"mode" in trilha &&
                                trilha.mode === "online" &&
                                "link" in trilha &&
                                trilha.link && (
                                  <p>
                                    <span className="font-medium">Link:</span>{" "}
                                    <a
                                      href={trilha.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      {trilha.link}
                                    </a>
                                  </p>
                                )}
                              {"time" in trilha && trilha.time && (
                                <p>
                                  <span className="font-medium">Horário:</span> {trilha.time}
                                </p>
                              )}
                            </>
                          )}

                          {isAtividade && (
                            <>
                              {"activityTitle" in trilha && trilha.activityTitle && (
                                <p>
                                  <span className="font-medium">Atividade:</span>{" "}
                                  {trilha.activityTitle}
                                </p>
                              )}
                              {"activityDescription" in trilha && trilha.activityDescription && (
                                <p>
                                  <span className="font-medium">Descrição:</span>{" "}
                                  {trilha.activityDescription}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
