"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Upload, Users, Tag, FileText, Target, ImageIcon, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/external/components/ui/avatar"
import { Badge } from "@/presentation/external/components/ui/badge"
import { Button } from "@/presentation/external/components/ui/button"
import { Card, CardContent } from "@/presentation/external/components/ui/card"
import { Input } from "@/presentation/external/components/ui/input"
import { Label } from "@/presentation/external/components/ui/label"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Checkbox } from "@/presentation/external/components/ui/checkbox"
import { Separator } from "@/presentation/external/components/ui/separator"
import { toast } from "sonner"
import Image from "next/image"

const availableMentors = [
  { id: 1, name: "Ana Silva", area: "Marketing Digital", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Carlos Santos", area: "Desenvolvimento de Produto", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Maria Oliveira", area: "Finanças e Investimentos", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "João Costa", area: "Tecnologia", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Fernanda Lima", area: "Vendas e Negociação", avatar: "/placeholder.svg?height=40&width=40" },
]

const availableCategories = [
  "Tecnologia",
  "Impacto Social",
  "Sustentabilidade",
  "Saúde",
  "Educação",
  "Fintech",
  "E-commerce",
  "Agritech",
  "Foodtech",
  "Mobilidade",
]

export default function CreateProgram() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    startDate: "",
    endDate: "",
    eligibilityRequirements: "",
    availableSlots: "",
    bannerImage: null as File | null,
    selectedCategories: [] as string[],
    selectedMentors: [] as number[],
  })

  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }))
  }

  const handleMentorToggle = (mentorId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedMentors: prev.selectedMentors.includes(mentorId)
        ? prev.selectedMentors.filter((id) => id !== mentorId)
        : [...prev.selectedMentors, mentorId],
    }))
  }

  const handleFileUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, bannerImage: file }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handlePublish = () => {
    toast.error("Programa publicado com sucesso!")
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
             <Image src="/icons/logo.svg" width={140} height={50} alt="Logo da Kadoo" />

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Home
              </a>
              <a href="#" className="text-[#5127FF] font-medium">
                Programas
              </a>
              <a href="#" className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Mentores
              </a>
              <a href="#" className="text-gray-600 hover:text-[#5127FF] transition-colors">
                Dashboard
              </a>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Programa</h1>
          <p className="text-gray-600 text-lg">
            Defina os detalhes da oportunidade que ajudará a transformar novas ideias em startups reais.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <form className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Informações Básicas</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                      Título do Programa *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Programa de Aceleração Tech 2024"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortDescription" className="text-sm font-medium text-gray-700 mb-2 block">
                      Descrição Curta *<span className="text-gray-500 font-normal ml-1">(máx. 300 caracteres)</span>
                    </Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Uma breve descrição que aparecerá nos cards de listagem..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      maxLength={300}
                      className="min-h-[100px] rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF] resize-none"
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">{formData.shortDescription.length}/300</div>
                  </div>

                  <div>
                    <Label htmlFor="fullDescription" className="text-sm font-medium text-gray-700 mb-2 block">
                      Descrição Completa *
                    </Label>
                    <Textarea
                      id="fullDescription"
                      placeholder="Descreva detalhadamente o programa, objetivos, metodologia, benefícios..."
                      value={formData.fullDescription}
                      onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                      className="min-h-[200px] rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF] resize-none"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Datas e Vagas</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 block">
                      Data de Início *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2 block">
                      Data de Fim *
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Requisitos</h2>
                </div>

                <div>
                  <Label htmlFor="eligibilityRequirements" className="text-sm font-medium text-gray-700 mb-2 block">
                    Requisitos de Elegibilidade *
                  </Label>
                  <Textarea
                    id="eligibilityRequirements"
                    placeholder="Liste os requisitos necessários para participar do programa..."
                    value={formData.eligibilityRequirements}
                    onChange={(e) => handleInputChange("eligibilityRequirements", e.target.value)}
                    className="min-h-[120px] rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF] resize-none"
                  />
                </div>
              </div>

              {/* <Separator /> */}

              {/* <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Imagem do Programa</h2>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Banner do Programa</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-[#5127FF] bg-[#5127FF]/5" : "border-gray-300 hover:border-[#5127FF]"
                      }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.bannerImage ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Upload className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">{formData.bannerImage.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInputChange("bannerImage", null)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-600">Arraste e solte uma imagem aqui, ou</p>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2 border-[#5127FF] text-[#5127FF] hover:bg-[#5127FF] hover:text-white"
                            onClick={() => document.getElementById("bannerUpload")?.click()}
                          >
                            Selecionar Arquivo
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">PNG, JPG até 5MB</p>
                      </div>
                    )}
                    <input
                      id="bannerUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    />
                  </div>
                </div>
              </div> */}

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Categorias</h2>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Selecione as categorias relevantes
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availableCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={formData.selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          className="data-[state=checked]:bg-[#5127FF] data-[state=checked]:border-[#5127FF]"
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="bg-[#F4DA02]/20 text-[#5127FF] hover:bg-[#F4DA02]/30"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#5127FF]" />
                  <h2 className="text-xl font-semibold text-gray-900">Mentores Envolvidos</h2>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Selecione os mentores que participarão do programa
                  </Label>
                  <div className="space-y-3">
                    {availableMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${formData.selectedMentors.includes(mentor.id)
                            ? "border-[#5127FF] bg-[#5127FF]/5"
                            : "border-gray-200 hover:border-[#5127FF]/50"
                          }`}
                        onClick={() => handleMentorToggle(mentor.id)}
                      >
                        <Checkbox
                          checked={formData.selectedMentors.includes(mentor.id)}
                          onCheckedChange={() => handleMentorToggle(mentor.id)}
                          className="data-[state=checked]:bg-[#5127FF] data-[state=checked]:border-[#5127FF]"
                        />
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-[#5127FF] text-white">
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{mentor.name}</p>
                          <p className="text-sm text-gray-600">{mentor.area}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  onClick={handlePublish}
                  className="bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-8 py-3 h-auto"
                >
                  Publicar Programa
                </Button>
               
                <Button type="button" variant="ghost" className="text-gray-600 hover:text-gray-800 px-8 py-3 h-auto">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-[#5127FF] transition-colors">
                Suporte
              </a>
              <a href="#" className="hover:text-[#5127FF] transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-[#5127FF] transition-colors">
                Termos de Uso
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Siga-nos:</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#5127FF]">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#5127FF]">
                  Instagram
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#5127FF]">
                  Twitter
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t">
            © 2025 Kadoo - Acelerando startups para transformar vidas
          </div>
        </div>
      </footer>
    </div>
  )
}
