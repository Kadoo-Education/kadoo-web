'use client'

import { Button } from "@/presentation/external/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/presentation/external/components/ui/sidebar";
import { HomeSideBar } from "@/presentation/shared/layout/components/sidebar";
import { Calendar, Star, TrendingUp, Users } from "lucide-react";
import { Progress } from "@/presentation/external/components/ui/progress";
import { Header } from "@/presentation/shared/layout/components/header/header";
import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/external/components/ui/avatar";
import { useCallback, useEffect, useState } from "react";
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { EnumProfile, Profile } from "@/presentation/shared/layout/components/profile/profile";
import { Loading } from "@/presentation/shared/layout/components/loading/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { EdictDetails } from "@/presentation/modules/edict/view/components/edict-details/edict-details";

import Link from "next/link";

const mentores = [
  {
    id: 1,
    name: "Ana Silva",
    area: "Marketing Digital",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    sessions: 120,
    specialty: "Growth Marketing",
  },
  {
    id: 2,
    name: "Carlos Santos",
    area: "Desenvolvimento de Produto",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    sessions: 95,
    specialty: "Product Strategy",
  },
  {
    id: 3,
    name: "Maria Oliveira",
    area: "Finanças e Investimentos",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5.0,
    sessions: 87,
    specialty: "Investment Analysis",
  },
  {
    id: 4,
    name: "Pedro Henrique",
    area: "Música e Filantropia",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5.0,
    sessions: 28,
    specialty: "Social Impact",
  },
]

export function HomeSection() {
  const [user, setUser] = useState<{ name: string, role: EnumProfile } | null>(null)

  const getUser = useCallback(async () => {
    await userGatewayHttp.get().then(setUser)
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!user) return <Loading />

  const firstName = user?.name.split(" ")[0]
  const role = user.role

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>
        <HomeSideBar role={role} />
        <SidebarInset>
          <Header profile={<Profile {...user} />} />

          <main className="p-6 space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Bem-vindo, {firstName}! 👋</h2>
                    <p className="text-xl text-white/90">Pronto para transformar sua ideia em realidade?</p>
                  </div>
                  <Button size="lg" className="bg-[#F4DA02] text-white hover:bg-[#F4DA02]/90 font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    Ver Editais Abertos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#5127FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Sua Jornada</h3>
                      <p className="text-sm text-gray-600">Pré-aceleração</p>
                    </div>
                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Progresso</span>
                        <span className="text-[#5127FF]">2 de 3</span>
                      </div>
                      <Progress value={66} className="h-3 bg-gray-200" />
                      <p className="text-xs text-gray-600 text-center">Continue evoluindo!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4DA02]/5 to-[#F4DA02]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 rounded-2xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Próximas Atividades</h3>
                      <p className="text-sm text-gray-600">Sua agenda</p>
                    </div>
                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-3 h-3 bg-[#5127FF] rounded-full flex-shrink-0"></div>
                        <span className="font-medium">Mentoria com Ana Silva</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-3 h-3 bg-[#F4DA02] rounded-full flex-shrink-0"></div>
                        <span className="font-medium">Workshop de Pitch</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-green-500/80 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Comunidade</h3>
                      <p className="text-sm text-gray-600">Rede ativa</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <p className="text-3xl font-bold text-gray-900 mb-2">1,247</p>
                      <p className="text-sm text-gray-600">Empreendedores conectados</p>
                      <div className="mt-3 flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Online agora</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Editais em Destaque - Seção Redesenhada */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-gray-900">Editais</h2>
                  <p className="text-gray-600">Oportunidades abertas para acelerar seu negócio</p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white transition-all duration-300 font-semibold px-6"
                >
                  Ver Todos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Edital 1 */}
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badge de Status */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Inscrito ✓
                    </span>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Ícone e Tag */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">🚀</span>
                        </div>
                        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                          Tecnologia
                        </div>
                      </div>

                      {/* Título e Descrição */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
                          Programa de Aceleração Tech 2024
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Venha participar desse programa para startups de tecnologia
                        </p>
                      </div>

                      {/* Datas */}
                      <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-3 group-hover:bg-white group-hover:shadow transition-all duration-300 justify-between">
                        <div className="flex flex-col items-start gap-2">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11px] text-gray-500 uppercase tracking-wide">Início</span>
                            <span className="text-sm font-medium text-gray-800">17/07/2025</span>
                          </div>
                        </div>

                        

                        <div className="flex flex-col items-start gap-2">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11px] text-gray-500 uppercase tracking-wide">Término</span>
                            <span className="text-sm font-medium text-gray-800">17/07/2025</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-center py-2">
                        <span className="text-green-600 font-semibold text-sm bg-green-50 px-4 py-2 rounded-lg">
                          Você já está inscrito nesse edital
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Edital 2 */}
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badge de Status */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Inscrito ✓
                    </span>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Ícone e Tag */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">💡</span>
                        </div>
                        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                          Tecnologia
                        </div>
                      </div>

                      {/* Título e Descrição */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
                          Programa de Aceleração Tech 2024
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Venha participar desse programa para startups inovadoras
                        </p>
                      </div>

                      {/* Datas */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <span className="font-medium">17/07/2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">até</span>
                          <span className="font-medium">17/07/2025</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-center py-2">
                        <span className="text-green-600 font-semibold text-sm bg-green-50 px-4 py-2 rounded-lg">
                          Você já está inscrito nesse edital
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Edital 3 - Disponível para Inscrição */}
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badge de Status */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#F4DA02] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Aberto
                    </span>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Ícone e Tag */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">🎯</span>
                        </div>
                        <div className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                          Tecnologia
                        </div>
                      </div>

                      {/* Título e Descrição */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
                          Programa de Aceleração Tech 2024
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Venha participar desse programa exclusivo
                        </p>
                      </div>

                      {/* Datas */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#5127FF]" />
                          <span className="font-medium">17/07/2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">até</span>
                          <span className="font-medium">17/07/2025</span>
                        </div>
                      </div>

                      {/* Botão de Ação */}
                      <Button
                        className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Inscrever-se
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Edital Exemplo */}
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-6 relative z-10">
                    <div className="space-y-4">
                      {/* Ícone e Tag */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">📋</span>
                        </div>
                        <div className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                          Exemplo
                        </div>
                      </div>

                      {/* Título e Descrição */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#5127FF] transition-colors duration-300">
                          Exemplo
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Descrição de exemplo para demonstração
                        </p>
                      </div>

                      {/* Datas */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-500">17/07/2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">até</span>
                          <span className="font-medium text-gray-500">19/07/2025</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mentores em Destaque - Seção Redesenhada */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Mentores em Destaque</h2>
                  <p className="text-gray-600">Conecte-se com especialistas que vão acelerar sua jornada</p>
                </div>
                <Link href="/mentores">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white transition-all duration-300 font-semibold px-6"
                >
                  Ver Todos os Mentores
                </Button>
                </Link>
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mentores.map((mentor) => (
                  <Card key={mentor.id} className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5127FF]/5 to-[#F4DA02]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardContent className="p-6 relative z-10">
                      {/* Avatar e Info Principal */}
                      <div className="text-center mb-6">
                        <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:ring-[#5127FF]/20 transition-all duration-300">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white text-xl font-bold">
                            {mentor.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{mentor.name}</h3>
                        <p className="text-[#5127FF] font-medium text-sm bg-[#5127FF]/10 px-3 py-1 rounded-full inline-block mb-1">
                          {mentor.area}
                        </p>
                        {mentor.specialty && (
                          <p className="text-xs text-gray-500 mt-1">{mentor.specialty}</p>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        <div className="text-center">
                          <div className="flex items-center gap-1 justify-center mb-1">
                            <Star className="w-4 h-4 fill-[#F4DA02] text-[#F4DA02]" />
                            <span className="font-bold text-gray-900">{mentor.rating}</span>
                          </div>
                          <span className="text-xs text-gray-600">Avaliação</span>
                        </div>
                        <div className="w-px h-8 bg-gray-300" />
                        <div className="text-center">
                          <div className="flex items-center gap-1 justify-center mb-1">
                            <Users className="w-4 h-4 text-[#5127FF]" />
                            <span className="font-bold text-gray-900">{mentor.sessions}</span>
                          </div>
                          <span className="text-xs text-gray-600">Sessões</span>
                        </div>
                      </div>

                      {/* Botão de Ação */}
                      <Button
                        className="w-full bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Agendar Mentoria
                      </Button>
                    </CardContent>

                    {/* Badge de Destaque */}
                    {mentor.rating === 5.0 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#F4DA02] to-[#F4DA02]/80 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg z-20">
                        ⭐ TOP
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-8 p-8 bg-gradient-to-r from-[#5127FF]/10 to-[#F4DA02]/10 rounded-2xl border border-[#5127FF]/20 shadow-sm">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Não encontrou o mentor ideal?</h3>
                  <p className="text-gray-600 text-lg">Temos mais de 50+ mentores especialistas esperando para ajudar você</p>
                  
                  <Link href="/mentores">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/90 hover:from-[#5127FF]/90 hover:to-[#5127FF] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Explorar Todos os Mentores
                  </Button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </main>

          <footer className="mt-12 p-6 bg-white border-t">
            <div className="text-center text-sm text-gray-600">
              <p>© 2025 Kadoo - Acelerando startups para transformar vidas</p>
              <p className="mt-1">Uma iniciativa para democratizar o empreendedorismo</p>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}