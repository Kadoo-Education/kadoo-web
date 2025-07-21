'use client'

import { Button } from "@/presentation/external/components/ui/button"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Input, Label } from "@/presentation/shared/components"
import { CreateEdictValidation } from "@/validation/protocols/create-edict/edict"
import { createEdictValidation } from "@/validation/validators/create-edict/create-edict-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Separator } from "@radix-ui/react-separator"
import { FileText, Calendar, Upload, Tag, PlusCircle } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import { useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"

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

export function Form() {

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, control } = useForm<CreateEdictValidation>({
    resolver: zodResolver(createEdictValidation),
    defaultValues: {
      categories: [],
    },
  })

   const { fields: trilhas, append, remove } = useFieldArray({
    control,
    name: "trilhas"
  })

  async function handleCreateEdictForm(data: CreateEdictValidation) {
    console.log(data)

    // edictGatewayHttp.create({
    //   description: formData.shortDescription,
    //   title: formData.title,
    //   startDate: new Date(formData.startDate),
    //   endDate: new Date(formData.endDate),
    //   tag: formData.selectedCategories,
    // })

    // toast.success("Dados enviados! Veja o console.")
  }


  return (
    <form className="space-y-8" onSubmit={handleSubmit(handleCreateEdictForm)}>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">Informações Básicas</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input.Root>
            <Input.Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
              Título do Programa *
            </Input.Label >
            <Input.Core
              id="title"
              placeholder="Ex: Programa de Aceleração Tech 2024"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register("title")}
            />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="shortDescription" className="text-sm font-medium text-gray-700 mb-2 block">
              Descrição Curta *<span className="text-gray-500 font-normal ml-1">(máx. 300 caracteres)</span>
            </Input.Label>
            <Textarea
              id="shortDescription"
              placeholder="Uma breve descrição que aparecerá nos cards de listagem..."

              maxLength={300}
              className="min-h-[100px] rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF] resize-none"
              {...register("description")}
            />
            {/* <div className="text-right text-sm text-gray-500 mt-1">{formData.shortDescription.length}/300
            </div> */}
          </Input.Root>

          {/* <div>
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
                  </div> */}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">Datas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input.Root>
            <Input.Label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 block">
              Data de Início *
            </Input.Label>
            <Input.Core
              id="startDate"
              type="date"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register("startDate")}
            />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2 block">
              Data de Fim *
            </Input.Label>
            <Input.Core
              id="endDate"
              type="date"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register("endDate")}
            />
          </Input.Root>
        </div>

        <Input.Root >
          <Input.Label className="text-sm font-medium text-gray-700 block">Arquivo PDF do edital
          </Input.Label>

          <CldUploadButton
            uploadPreset="kadoo-api"
            signatureEndpoint="/api/cloudinary"
            options={{ resourceType: "raw" }}
            onSuccess={(result: any) => {
              const url = result?.info?.secure_url
              console.log("Upload concluído:", url)
              setUploadedFileUrl(url)
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#5127FF] bg-transparent px-4 py-2 text-sm font-medium text-[#5127FF] transition-colors hover:bg-[#5127FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5127FF] focus-visible:ring-offset-2"
          >
            <Upload className="w-4 h-4" />
            Enviar PDF do Edital
          </CldUploadButton>

          {uploadedFileUrl && (
            <p className="text-sm text-green-600 mt-1">
              Arquivo enviado com sucesso! <a href={uploadedFileUrl} className="underline" target="_blank">Ver PDF</a>
            </p>
          )}
        </Input.Root>
      </div>

      <Separator />

      {/* <div className="space-y-6">
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
              </div> */}

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

        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableCategories.map((category) => {
                const isChecked = field.value.includes(category)

                const toggleCategory = () => {
                  if (isChecked) {
                    field.onChange(field.value.filter((c) => c !== category))
                  } else {
                    field.onChange([...field.value, category])
                  }
                }

                return (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={isChecked}
                      onCheckedChange={toggleCategory}
                      className="data-[state=checked]:bg-[#5127FF] data-[state=checked]:border-[#5127FF]"
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                )
              })}
            </div>
          )}
        />
      </div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#5127FF]">Trilhas do Edital</h2>

        {/* Lista de Trilhas */}
        {trilhas.map((trilha, index) => (
          <div key={trilha.id} className="mb-6 p-4 border rounded-md shadow-sm bg-white">
            <div className="mb-3">
              <Input.Label htmlFor={`trilhas.${index}.name`} className="block mb-1 font-medium text-gray-700">
                Nome da Trilha
              </Input.Label>
              <Input.Core
                id={`trilhas.${index}.name`}
                {...register(`categories` as const, { required: true })}
                placeholder="Nome da trilha"
                className="w-full"
              />
            </div>

            <div className="mb-3">
              <Input.Label htmlFor={`trilhas.${index}.type`} className="block mb-1 font-medium text-gray-700">
                Tipo da Trilha
              </Input.Label>
              <Input.Core
                id={`trilhas.${index}.type`}
                {...register(`trilhas.${index}.type` as const, { required: true })}
                placeholder="Tipo da trilha"
                className="w-full"
              />
            </div>

            {/* Aqui poderia ficar upload do PDF e atividades */}

          </div>
        ))}

        <Button type="button" className="mt-4 bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-6 py-2 rounded-md">
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar nova trilha
        </Button>
      </div>

      {/* <div className="space-y-6">
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
              </div> */}

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="submit"
          className="bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-8 py-3 h-auto"
        >
          Publicar Edital
        </Button>

        <Button type="reset" variant="ghost" className="text-gray-600 hover:text-gray-800 px-8 py-3 h-auto">
          Cancelar
        </Button>
      </div>
    </form>
  )
}