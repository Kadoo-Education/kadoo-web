import { Button } from "@/presentation/external/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/presentation/external/components/ui/sidebar";
import { HomeSideBar } from "@/presentation/shared/layout/sidebar";
import { Bell, Calendar, Clock, Star, TrendingUp, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/external/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { Progress } from "@/presentation/external/components/ui/progress";
import { Badge } from "@/presentation/external/components/ui/badge";


const mentores = [
  {
    id: 1,
    name: "Ana Silva",
    area: "Marketing Digital",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    sessions: 120,
  },
  {
    id: 2,
    name: "Carlos Santos",
    area: "Desenvolvimento de Produto",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    sessions: 95,
  },
  {
    id: 3,
    name: "Maria Oliveira",
    area: "Finanças e Investimentos",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5.0,
    sessions: 87,
  },
  {
    id: 4,
    name: "Pedro Henrique",
    area: "Músico e Filantropo",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5.0,
    sessions: 28,
  },
]

const editais = [
  {
    id: 1,
    title: "Programa de Aceleração Tech 2024",
    description: "Programa focado em startups de tecnologia com mentoria especializada e investimento inicial.",
    startDate: "15 Jan 2024",
    endDate: "30 Jan 2024",
    category: "Tecnologia",
  },
  {
    id: 2,
    title: "Impacto Social - Edital Especial",
    description: "Voltado para startups que geram impacto social positivo em comunidades de baixa renda.",
    startDate: "20 Jan 2024",
    endDate: "05 Fev 2024",
    category: "Impacto Social",
  },
  {
    id: 3,
    title: "Inovação Sustentável",
    description: "Para startups focadas em soluções sustentáveis e economia circular.",
    startDate: "25 Jan 2024",
    endDate: "10 Fev 2024",
    category: "Sustentabilidade",
  },
]

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>
        <HomeSideBar />
        <SidebarInset>
          <header className="flex items-center justify-between p-6 bg-white border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Bem-vindo de volta, Pedro!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-[#5127FF] text-white">P</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="font-medium text-gray-900">Pedro Silva</p>
                <p className="text-sm text-gray-600">CEO</p>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-8">
            <Card className="bg-gradient-to-r from-[#5127FF] to-[#5127FF]/80 text-white border-0">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Bem-vindo, Pedro! 👋</h2>
                    <p className="text-xl text-white/90">Pronto para transformar sua ideia em realidade?</p>
                  </div>
                  <Button size="lg" className="bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-8">
                    Ver Editais Abertos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#5127FF]" />
                    Sua Jornada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Pré-aceleração</span>
                      <span className="font-medium">2 de 3</span>
                    </div>
                    <Progress value={66} className="h-2 " />
                    <p className="text-sm text-gray-600">Continue evoluindo na sua jornada!</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#F4DA02]" />
                    Próximas Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#5127FF] rounded-full"></div>
                      <span>Mentoria com Ana Silva</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#F4DA02] rounded-full"></div>
                      <span>Workshop de Pitch</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    Comunidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-gray-600">Empreendedores conectados</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Editais Abertos</h2>
                <Button
                  variant="outline"
                  className="border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                >
                  Ver Todos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editais.map((edital) => (
                  <Card key={edital.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{edital.title}</CardTitle>
                        <Badge variant="secondary" className="bg-[#F4DA02]/20 text-[#5127FF] shrink-0">
                          {edital.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{edital.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edital.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{edital.endDate}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#5127FF] hover:bg-[#5127FF]/90">Inscrever-se</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Mentores em Destaque</h2>
                <Button
                  variant="outline"
                  className="border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                >
                  Ver Todos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentores.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback className="bg-[#5127FF] text-white">{mentor.name.split(" ")
                            .map((n) => n[0])
                            .join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          <p className="text-gray-600 text-sm">{mentor.area}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#F4DA02] text-[#F4DA02]" />
                          <span>{mentor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{mentor.sessions} sessões</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                      >
                        Ver Perfil
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
