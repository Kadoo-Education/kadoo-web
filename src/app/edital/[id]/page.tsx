'use client'

import { Badge } from "@/presentation/external/components/ui/badge";
import { Button } from "@/presentation/external/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { Separator } from "@/presentation/external/components/ui/separator";
import { ArrowRight, Calendar, FileText } from "lucide-react";

import { motion } from "framer-motion";

export default function ProgramaDetalhadoPage() {
  const edital = {
    titulo: "Transforme sua Ideia em Startup",
    descricao:
      "O edital tem como objetivo apoiar jovens de baixa renda a validarem e estruturarem ideias de negócio com alto potencial de impacto.",
    organizacao: "Kadoo Aceleradora",
    dataInicio: "01/09/2025",
    dataFim: "30/10/2025",
    linkPdf: "#",
    beneficios: [
      "Mentorias com especialistas",
      "Conexões com investidores",
      "Infraestrutura de coworking",
      "Possibilidade de investimento inicial",
    ],
    requisitos: [
      "Ter entre 18 e 30 anos",
      "Residência em comunidades de baixa renda",
      "Ideia de negócio ou projeto inicial",
    ],
  };

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
              {edital.titulo}
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              {edital.descricao}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#5127FF]">
              Benefícios
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {edital.beneficios.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#5127FF]">
              Requisitos
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {edital.requisitos.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="shadow-md rounded-2xl border border-[#e5e7eb] h-fit sticky top-12">
          <CardHeader>
            <CardTitle className="text-xl">Informações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#5127FF]" />
              <span>
                <strong>Início:</strong> {edital.dataInicio}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#5127FF]" />
              <span>
                <strong>Fim:</strong> {edital.dataFim}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#5127FF]" />
              <a
                href={edital.linkPdf}
                className="text-[#5127FF] hover:underline"
              >
                Ver PDF do edital
              </a>
            </div>

            <Separator />

            <Button className="w-full bg-[#F4DA02] hover:bg-[#e7cc01] text-black font-semibold transition-transform hover:scale-105">
              Quero me inscrever
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
