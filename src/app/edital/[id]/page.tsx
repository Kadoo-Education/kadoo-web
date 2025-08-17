'use client'

import { Badge } from "@/presentation/external/components/ui/badge"
import { Button } from "@/presentation/external/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/external/components/ui/card"
import { Separator } from "@/presentation/external/components/ui/separator"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ProgramaDetalhadoPage() {
  const edital = {
    title: "Programa de Aceleração Tech 2025",
    description: `# 🚀 Sobre o programa\n\n**Imagine sua startup sendo descoberta por milhares de donos de MPEs em busca de inovação — aumentando vendas, parcerias e impacto econômico.**\n\nA **Vitrine** é sua chance de mostrar ao Brasil como sua solução pode transformar negócios e promover crescimento inclusivo.\n\n---\n\n## 🔍 Por que participar?\n- **Acesso a milhões de MPEs ativas hoje**  \n  No Brasil, micro e pequenas empresas representam a imensa maioria do mercado. São milhões de negócios em busca de inovação, produtividade e soluções digitais acessíveis.\n\n- **Essas empresas estão em busca de soluções como a sua**  \n  Pequenos negócios enfrentam desafios diários em gestão, vendas, operação e tecnologia — e a sua startup pode ser exatamente o que eles procuram.\n\n- **Conexão comprovada pelos resultados do Sebrae**  \n  Programas como o **ALI Transformação Digital** já conectaram milhares de MPEs a soluções de startups. A Vitrine é uma ponte real entre quem precisa e quem resolve.\n\n- **Credibilidade de quem é referência**  \n  O **Sebrae** é a maior entidade de apoio aos pequenos negócios no Brasil. Participar da Vitrine é estar lado a lado com quem já tem a confiança do mercado.\n\n---\n\n## 🏆 O que sua startup ganha\n`,
    startDate: "08/01/2025",
    endDate: "08/31/2025",
    tags: [
      "Tecnologia",
      "Educação"
    ],
    linkDoc: "https://aqua-eldest-trout-70.mypinata.cloud/ipfs/bafybeibqdoudt2ltua4ir735vq64evougvany3x7m5yfgyam3mahtctpe4",
    organize: 'Fulano da Silva'
  }


  console.log(new Date(edital.startDate))

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-3 gap-8"
      >

        <div className="lg:col-span-2 space-y-8">
          <div>
            <Badge className="bg-[#5127FF] text-white px-3 py-1 rounded-full">
              Edital Aberto
            </Badge>
            <h1 className="text-4xl font-bold mt-4 text-[#5127FF]">
              {edital.title}
            </h1>

            <div className="flex gap-2 mt-6">
              {edital.tags.map((tags, index) => (
                <Badge key={index} className="bg-[#5127FF] text-white">{tags}</Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="prose max-w-none whitespace-pre-line">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {edital.description}
            </ReactMarkdown>
          </div>
        </div>

        <Card className="shadow-md rounded-2xl border border-[#e5e7eb] h-fit sticky top-12">
          <CardHeader>
            <CardTitle className="text-xl">Informações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">
                Período de Inscrição
              </h3>
              <span className="text-gray-500">{new Date(edital.startDate).toLocaleString("pt-BR", {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} à {new Date(edital.endDate).toLocaleString("pt-BR", {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">
                Organizador
              </h3>
              <span className="text-gray-500">
                {edital.organize}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-base">Mais informações</h3>
              <a
                href={edital.linkDoc}
                className="text-[#5127FF] hover:underline"
                target="_blank"
              >
                Ver PDF do edital
              </a>
            </div>

            <Separator />

            <Button className="w-full bg-[#F4DA02] hover:bg-[#e7cc01] text-black font-semibold transition-transform hover:scale-105">
              Inscreva-se até {new Date(edital.endDate).toLocaleString("pt-BR", {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}