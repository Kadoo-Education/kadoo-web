'use client'
import { Card, CardContent } from "@/presentation/external/components/ui/card"
import { Badge } from "@/presentation/external/components/ui/badge"
import { ArrowRight, CheckCircle, Clock3, Circle, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

const stages = [
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

export function StepsOfEdict() { 
  return (
    <div className="space-y-6 relative">
        {stages.map((stage, index) => {
          const isOpen = true
          const isEvento = stage.type === "evento"
          const isAtividade = stage.type === "atividade"

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative flex gap-4"
            >
              <div className="flex flex-col items-center">
                {stage.status === "concluida" ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : stage.status === "em_andamento" ? (
                  <Clock3 className="w-6 h-6 text-yellow-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
                {index < stages.length - 1 && (
                  <div className="w-px h-20 bg-gray-200 mt-1" />
                )}
              </div>

              <Card className="w-full rounded-2xl border border-gray-200 shadow-sm">
                <CardContent className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/etapa/${stage.id}`}
                        className="text-lg font-semibold text-[#5127FF] hover:underline underline-offset-2"
                      >
                        {stage.title}
                      </Link>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            stage.status === "concluida"
                              ? "bg-green-100 text-green-700"
                              : stage.status === "em_andamento"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {stage.status === "concluida"
                            ? "Concluída"
                            : stage.status === "em_andamento"
                              ? "Em andamento"
                              : "Pendente"}
                        </Badge>

                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`stage-panel-${stage.id}`}
                          // onClick={() => setOpenIndex(isOpen ? null : index)}
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
                        {stage.type}{" "}
                        {"date" in stage && stage.date ? `• ${stage.date}` : ""}
                      </span>

                      <Link
                        href={`/etapa/${stage.id}`}
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
                        id={`stage-panel-${stage.id}`}
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
                              {"mode" in stage && stage.mode && (
                                <p>
                                  <span className="font-medium">Modalidade:</span> {stage.mode}
                                </p>
                              )}
                              {"mode" in stage &&
                                stage.mode === "presencial" &&
                                "address" in stage &&
                                stage.address && (
                                  <p>
                                    <span className="font-medium">Endereço:</span> {stage.address}
                                  </p>
                                )}
                              {"mode" in stage &&
                                stage.mode === "online" &&
                                "link" in stage &&
                                stage.link && (
                                  <p>
                                    <span className="font-medium">Link:</span>{" "}
                                    <a
                                      href={stage.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      {stage.link}
                                    </a>
                                  </p>
                                )}
                              {"time" in stage && stage.time && (
                                <p>
                                  <span className="font-medium">Horário:</span> {stage.time}
                                </p>
                              )}
                            </>
                          )}

                          {isAtividade && (
                            <>
                              {"activityTitle" in stage && stage.activityTitle && (
                                <p>
                                  <span className="font-medium">Atividade:</span>{" "}
                                  {stage.activityTitle}
                                </p>
                              )}
                              {"activityDescription" in stage && stage.activityDescription && (
                                <p>
                                  <span className="font-medium">Descrição:</span>{" "}
                                  {stage.activityDescription}
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
  )
}