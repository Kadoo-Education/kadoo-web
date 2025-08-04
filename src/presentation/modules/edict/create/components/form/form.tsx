'use client'

import { Button } from "@/presentation/external/components/ui/button"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Input, Label } from "@/presentation/shared/components"
import { CreateEdictValidation } from "@/validation/protocols/create-edict/edict"
import { createEdictValidation } from "@/validation/validators/create-edict/create-edict-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/presentation/external/components/ui/checkbox"
import { Separator } from "@/presentation/external/components/ui/separator"
import { FileText, Calendar, Upload, Tag, PlusCircle } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { toast } from "sonner"
import remarkGfm from "remark-gfm"

import ReactMarkdown from 'react-markdown'


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

  const [edictFile, setEdictFile] = useState<File>();
  const [activityFile, setActivityFile] = useState<File>()
  const [url, setUrl] = useState("");

  const [descricao, setDescricao] = useState("")

  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<CreateEdictValidation>({
    resolver: zodResolver(createEdictValidation),
    defaultValues: {
      categories: [],
      trails: []
    },
  })

  const tracksCount = watch("tracksCount")

  const { fields: trails, append, remove } = useFieldArray({
    control,
    name: "trails"
  });

  useEffect(() => {
    const parsed = parseInt(tracksCount || "", 10);

    if (!tracksCount || isNaN(parsed) || parsed < 0) return;

    if (parsed > trails.length) {
      for (let i = trails.length; i < parsed; i++) {
        append({
          title: "",
          type: "",
          mode: "",
          date: "",
          startDate: "",
          endDate: "",
          address: "",
          time: "",
          link: "",
          activityTitle: "",
          activityDescription: "",
          pdf: null,
        });
      }
    } else if (parsed < trails.length) {
      for (let i = trails.length; i > parsed; i--) {
        remove(i - 1);
      }
    }
  }, [tracksCount]);


  async function handleCreateEdictForm(data: CreateEdictValidation) {

    if (!edictFile) return

    const formData = new FormData()
    formData.set("file", edictFile)

    console.log(data, activityFile)

    // const uploadRequest = await fetch("/api/upload-file", {
    //   method: "POST",
    //   body: formData
    // })

    // const signedUrl = await uploadRequest.json();

    // edictGatewayHttp.create({
    //   description: data.description,
    //   title: data.title,
    //   startDate: new Date(data.startDate),
    //   endDate: new Date(data.endDate),
    //   tag: data.categories,

    // })

    toast.success("Dados enviados! Veja o console.")
  }

  const markdown = `Just a link: https://reactjs.com.`

  return (
    <form className="space-y-8" onSubmit={handleSubmit(handleCreateEdictForm)} encType="multipart/form-data">
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

          {/* <Input.Root>
            <Input.Label htmlFor="shortDescription" className="text-sm font-medium text-gray-700 mb-2 block">
              Descrição Curta *<span className="text-gray-500 font-normal ml-1">(máx. 300 caracteres)</span>
            </Input.Label>
            <Textarea
              id="shortDescription"
              placeholder="Uma breve descrição que aparecerá nos cards de listagem..."

              maxLength={300}
              className="min-h-[100px] rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF] resize-none"
              {...register("description")}
            /> */}
          {/* <div className="text-right text-sm text-gray-500 mt-1">{formData.shortDescription.length}/300
            </div> */}
          {/* </Input.Root> */}

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

          <Input.Root>
            <Label>Descrição do Edital</Label>

            <Textarea
              id="descricao"
              placeholder="Digite a descrição do edital aqui usando markdown..."
              rows={15}
              className="resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Input.Root>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => <h1 className="text-4xl font-extrabold" {...props} />
            }}
          >
            {descricao}
          </ReactMarkdown>

        </div>


      </div>

      <Separator className="bg-gray-300" />

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

          <Input.Core
            type="file"
            accept="application/pdf"
            className="w-full"
            onChange={(e) => setEdictFile(e?.target?.files?.[0])}
          />



          {/* {edictFile && (
            <p className="text-sm text-green-600 mt-1">
              Arquivo enviado com sucesso! <a href={edictFile} className="underline" target="_blank">Ver PDF</a>
            </p>
          )} */}
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

      <Input.Root>
        <Input.Label htmlFor="tracksCount" className="text-sm font-medium text-gray-700 mb-2 block">
          Quantas trilhas você deseja adicionar? *
        </Input.Label >
        <Input.Core
          id="tracksCount"
          type="number"
          min={0}
          placeholder="Informe o número de trilhas"
          className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
          {...register("tracksCount", { valueAsNumber: true })}
        />
      </Input.Root>

      {trails.map((trail, index) => {
        const tipo = watch(`trails.${index}.type`);
        const modalidade = watch(`trails.${index}.mode`);

        return (
          <div key={trail.id} className="mb-6 p-4 border rounded-md shadow-sm bg-white space-y-4">
            <Input.Root>
              <Input.Label htmlFor={`trails.${index}.title`}>Título da Trilha *</Input.Label>
              <Input.Core
                id={`trails.${index}.title`}
                {...register(`trails.${index}.title`)}
                className="w-full"
                placeholder="Digite o título da trilha"
              />
            </Input.Root>
            <div>
              <Input.Label htmlFor={`trails.${index}.type`}>Tipo da Trilha</Input.Label>
              <select
                id={`trails.${index}.type`}
                {...register(`trails.${index}.type`)}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="">Selecione</option>
                <option value="evento">Evento</option>
                <option value="atividade">Atividade</option>
              </select>
            </div>

            {tipo === "evento" && (
              <>
                <Input.Root>
                  <Input.Label htmlFor={`trails.${index}.date`}>Data do Evento *</Input.Label>
                  <Input.Core
                    type="date"
                    id={`trails.${index}.date`}
                    {...register(`trails.${index}.date`)}
                    className="w-full"
                  />
                </Input.Root>

                <div>
                  <Input.Label htmlFor={`trails.${index}.mode`}>Modalidade do Evento</Input.Label>
                  <select
                    id={`trails.${index}.mode`}
                    {...register(`trails.${index}.mode`)}
                    className="w-full border rounded px-3 py-2 mt-1"
                  >
                    <option value="">Selecione</option>
                    <option value="presencial">Presencial</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                {modalidade === "presencial" && (
                  <>
                    <Input.Root>
                      <Input.Label htmlFor={`trails.${index}.address`}>Endereço</Input.Label>
                      <Input.Core
                        id={`trails.${index}.address`}
                        {...register(`trails.${index}.address`)}
                        className="w-full"
                      />
                    </Input.Root>

                    <Input.Root>
                      <Input.Label htmlFor={`trails.${index}.time`}>Horário</Input.Label>
                      <Input.Core
                        id={`trails.${index}.time`}
                        type="time"
                        {...register(`trails.${index}.time`)}
                        className="w-full"
                      />
                    </Input.Root>
                  </>
                )}

                {modalidade === "online" && (
                  <Input.Root>
                    <Input.Label htmlFor={`trails.${index}.link`}>Link do Meet</Input.Label>
                    <Input.Core
                      id={`trails.${index}.link`}
                      {...register(`trails.${index}.link`)}
                      className="w-full"
                    />
                  </Input.Root>
                )}
              </>
            )}


            {tipo === "atividade" && (
              <>
                <Input.Root>
                  <Input.Label htmlFor={`trails.${index}.activityTitle`}>Título da Atividade</Input.Label>
                  <Input.Core
                    id={`trails.${index}.activityTitle`}
                    {...register(`trails.${index}.activityTitle`)}
                    className="w-full"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label htmlFor={`trails.${index}.activityDescription`}>Descrição</Input.Label>
                  <Textarea
                    id={`trails.${index}.activityDescription`}
                    {...register(`trails.${index}.activityDescription`)}
                    className="w-full"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label>PDF da Atividade</Input.Label>
                  <Input.Core
                    type="file"
                    accept="application/pdf"
                    className="w-full"
                    onChange={(e) => setActivityFile(e?.target?.files?.[0])}
                  />
                </Input.Root>
              </>
            )}
          </div>
        );
      })}



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