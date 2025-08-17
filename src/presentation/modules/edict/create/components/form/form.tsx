'use client'

import { Button } from "@/presentation/external/components/ui/button"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Input, Label } from "@/presentation/shared/components"
import { CreateEdictValidation } from "@/validation/protocols/create-edict/edict"
import { createEdictValidation } from "@/validation/validators/create-edict/create-edict-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/presentation/external/components/ui/checkbox"
import { Separator } from "@/presentation/external/components/ui/separator"
import { FileText, Calendar, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { toast } from "sonner"
import remarkGfm from "remark-gfm"

import ReactMarkdown from 'react-markdown'
import { ScrollArea } from "@/presentation/external/components/ui/scroll-area"
import clsx from "clsx"


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


  const [previewMode, setPreviewMode] = useState(false)

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<CreateEdictValidation>({
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

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.set("file", file);

    const response = await fetch(`/api/upload-file`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  }


  async function handleCreateEdictForm(data: CreateEdictValidation) {
    if (!edictFile) {
      toast.error("Você precisa enviar o arquivo do edital");
      return;
    }

    try {
      const edictUrl = await uploadFile(edictFile);
      if (!edictUrl) {
        toast.error("Erro ao fazer upload do arquivo do edital.");
        return;
      }

      let activityUrl: string | null = null;
      if (activityFile) {
        activityUrl = await uploadFile(activityFile);
        if (!activityUrl) {
          toast.error("Erro ao fazer upload do arquivo da atividade.");
          return;
        }
      }

      await edictGatewayHttp.create({
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        tags: data.categories,
        linkDoc: edictUrl,
        trails: data.trails.map((trail) => {
          if (trail.type === "atividade") {
            return { ...trail, activityUrl };
          }
          return trail;
        }),
      });

      toast.success("Edital publicado com sucesso!");
    } catch (err) {
      toast.error("Erro ao publicar edital. Verifique os arquivos.");
      console.error(err);
    }
  }

  const descriptionWatched = watch("description")


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

          <Input.Root>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 block">
              Descrição do Edital *
            </Label>

            <div className="flex items-center gap-4 mb-2 text-sm">

              <span
                role="button"
                onClick={() => setPreviewMode(false)}
                className={clsx(
                  "cursor-pointer transition-all",
                  !previewMode ? "text-[#5127FF] font-semibold" : "text-gray-400"
                )}
              >
                Editar
              </span>

              <span className="text-gray-300">|</span>

              <span
                role="button"
                onClick={() => setPreviewMode(true)}
                className={clsx(
                  "cursor-pointer transition-all",
                  previewMode ? "text-[#5127FF] font-semibold" : "text-gray-400"
                )}
              >
                Preview
              </span>

            </div>

            {!previewMode ? (
              <Textarea
                id="description"
                placeholder="Digite a descrição do edital aqui usando markdown..."
                rows={12}
                className="resize-none rounded-md border border-gray-300 focus:border-[#5127FF]"
                {...register("description")}
              />
            ) : (
              <ScrollArea className="h-[300px] rounded-md border border-gray-300 p-4 bg-gray-50">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => <h1 className="text-2xl font-bold" {...props} />,
                    h2: (props) => <h2 className="text-xl font-semibold" {...props} />,
                    p: (props) => <p className="leading-relaxed" {...props} />,
                  }}
                >
                  {descriptionWatched || "_Sem conteúdo para pré-visualizar._"}
                </ReactMarkdown>
              </ScrollArea>
            )}
          </Input.Root>

          <Input.Root>
            <Label htmlFor="organizer" className="text-sm font-medium text-gray-700 mb-1 block">
              Organizador do Edital
            </Label>
            <Input.Core
              id="organizer"
              placeholder="Escreva quem irá organizar o Edital"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
            />


          </Input.Root>

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
        </Input.Root>
      </div>

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
                      className="data-[state=checked]:bg-[#5127FF] data-[state=checked]:border-[#5127FF] data-[state=checked]:text-white"
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
          Quantas etapas você deseja adicionar? *
        </Input.Label >
        <Input.Core
          id="tracksCount"
          type="number"
          min={0}
          placeholder="Informe o número de etapas"
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
              <Input.Label htmlFor={`trails.${index}.title`}>Título da Etapa *</Input.Label>
              <Input.Core
                id={`trails.${index}.title`}
                {...register(`trails.${index}.title`)}
                className="w-full"
                placeholder="Digite o título da etapa"
              />
            </Input.Root>
            <div>
              <Input.Label htmlFor={`trails.${index}.type`}>Tipo da Etapa</Input.Label>
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