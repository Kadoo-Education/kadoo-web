'use client'

import { APP_ROUTES } from "@/shared/constants/routes";
import { Home, FileText, UsersIcon, BarChart3, LogOut, UserRoundCog, Calendar, Settings, ArrowRight, Link2, UserPlus } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/presentation/external/components/ui/sidebar";
import Image from 'next/image'
import { userGatewayHttp } from "@/infra/modules/user/user-gateway-http";
import { useCallback, useEffect, useState } from "react";
import { EnumProfile } from "@/presentation/shared/layout/components/profile/profile";
import { Card, CardDescription, CardHeader, CardTitle } from "@/presentation/external/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { useRouter } from "next/navigation";
import { loginGatewayHttp } from "@/infra/modules/login/login-gateway-http";
import Link from 'next/link'
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";

const menuItems = [
  { title: "Home", icon: Home, url: APP_ROUTES.home },
  { title: "Meus editais", icon: FileText, url: "/meus-editais" },
  { title: "Mentores", icon: UsersIcon, url: "/mentores" },
  { title: "Meu progresso", icon: BarChart3, url: "#" },
  { title: "Área do Administrador", icon: UserRoundCog, url: "/adm", onAdmin: true },
  { title: "Usuários", icon: Settings, url: "/adm/gerenciar-usuarios", onAdmin: true }
]

export interface User {
  id: number
  name: string
  email: string
}


export default function UsersEdictsPage() {
  const { push } = useRouter()

  const [user, setUser] = useState<{ name: string, role: EnumProfile } | null>(null)
  const [edicts, setEdicts] = useState<{
    id: number
    status: string
    categories: string[]
    title: string
    description: string
    startDate: Date
    endDate: Date
  }[] | null>(null)

  const [allUsers, setAllUsers] = useState<User[] | null>([])

  const getUser = useCallback(async () => {
    await userGatewayHttp.get().then(setUser)
  }, [])

  const getAllUsers = useCallback(async () => {
    userGatewayHttp.getAll().then(setAllUsers)
  }, [])

  const getAllEdicts = useCallback(async () => {
    edictGatewayHttp.getAll().then(setEdicts)
  }, [])

  useEffect(() => {
    getAllUsers()
    getAllEdicts()
  }, [getAllUsers])

  const firstName = user?.name.split(" ")[0]
  const role = user?.role
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const ROLE_USER = {
    [EnumProfile.ROLE_STUDENT]: "Estudante",
    [EnumProfile.ROLE_MENTOR]: "Mentor",
    [EnumProfile.ROLE_ENTERPRISE]: "Empresa",
    [EnumProfile.ROLE_ADMIN]: "Administrador"
  }

  async function handleLogOut() {
    await loginGatewayHttp.logout().then(() => push(APP_ROUTES.login))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SidebarProvider>
        <Sidebar className="border-r-0">
          <SidebarHeader className="p-6">
            <div className="flex justify-start items-center gap-2">
              <Image src="/icons/logo.svg" width={150} height={60} alt="Logo da Kadoo" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="data-[active=true]:bg-[#5127FF] data-[active=true]:text-white hover:bg-[#5127FF]/10"
                      >
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="hover:bg-red-50 hover:text-red-600" onClick={handleLogOut}>
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>


          <header className="flex items-center justify-between p-6 bg-white border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Área do Administrador</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-[#5127FF] text-white">{firstLetter}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{ROLE_USER?.[role]}</p>
                </div>
              </div>
            </div>
          </header>


          <main className="max-w-3xl px-4 py-10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Atrelar usuário a um edital</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Selecione o usuário e o edital e confirme abaixo.
              </p>
            </div>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neutral-900">
                  Atrelar usuário
                </CardTitle>
                <CardDescription className="text-neutral-600">
                  Escolha as opções e confirme.
                </CardDescription>
              </CardHeader>

              <div className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(e.currentTarget as HTMLFormElement);
                  }}
                >
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <label htmlFor="userId" className="text-sm font-medium text-neutral-800">
                        Usuário *
                      </label>
                      <select
                        id="userId"
                        name="userId"
                        defaultValue=""
                        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#5127FF]"
                        required
                      >
                        <option value="" disabled>Selecione um usuário</option>
                        {allUsers?.map((user) => (
                          <option value={user.id}>{user.name}</option>
                        ))}
                      </select>
                      <p className="text-xs text-neutral-500">Você pode digitar para buscar se trocar por Combobox.</p>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="edictId" className="text-sm font-medium text-neutral-800">
                        Edital *
                      </label>
                      <select
                        id="edictId"
                        name="edictId"
                        defaultValue=""
                        className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#5127FF]"
                        required
                      >
                        <option value="" disabled>Selecione um edital</option>
                        {edicts?.map((edict) => (
                          <option value={edict.id} key={edict.id}>{edict.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <Link
                        href="/adm/gerenciar-usuarios"
                        className="rounded-md border px-4 py-2 text-sm hover:bg-neutral-50"
                      >
                        Voltar
                      </Link>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
                        style={{ backgroundColor: "#5127FF", color: "#fff" }}
                      >
                        Confirmar
                      </button>
                    </div>

                    {/* Mensagens de status (opcional) */}
                    {/* 
                    {"success" === "success" && (
                      <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        Usuário atrelado ao edital com sucesso!
                      </div>
                    )}
                    {status === "error" && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        Não foi possível atrelar. Tente novamente.
                      </div>
                    )} */}
                  </div>
                </form>
              </div>
            </Card>
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
  )
}