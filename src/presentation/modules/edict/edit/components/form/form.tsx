'use client'

import { Button } from "@/presentation/external/components/ui/button"
import { Textarea } from "@/presentation/external/components/ui/textarea"
import { Input, Label } from "@/presentation/shared/components"
import { Checkbox } from "@/presentation/external/components/ui/checkbox"
import { Separator } from "@/presentation/external/components/ui/separator"
import { FileText, Calendar, Tag, Footprints, PlusCircleIcon, Trash2, Loader2 } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import remarkGfm from "remark-gfm"

import { Calendar as CalendarShad } from '@/presentation/external/components/ui/calendar'

import ReactMarkdown from 'react-markdown'
import { ScrollArea } from "@/presentation/external/components/ui/scroll-area"
import clsx from "clsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/external/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/presentation/external/lib/utils"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/external/components/ui/select"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { EdictDTO } from "@/infra/modules/edict/dto/edict-dto"

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

const schemaBaseTrails = z.object({
  type: z.literal("Evento"),
  title: z.string(),
  description: z.string(),
  time: z.string(),
  date: z.date(),
})

const schemaPresencialTrail = schemaBaseTrails.extend({
  format: z.literal("Presencial"),
  address: z.string().optional(),
})

const schemaOnlineTrail = schemaBaseTrails.extend({
  format: z.literal("Online"),
  meetingLink: z.string().optional(),
})

const eventSchema = z.discriminatedUnion("format", [schemaPresencialTrail, schemaOnlineTrail])

const schemaActivity = z.object({
  type: z.literal("Atividade").optional(),
  activityTitle: z.string(),
  file: z.instanceof(FileList),
  dueDate: z.date().optional(),
})

const stepSchema = z.discriminatedUnion("type", [eventSchema, schemaActivity])


const schema = z.object({
  title: z.string().min(1, "Título é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatória."),
  organizer: z.string().min(1, "Insira o Organizador do Edital."),
  contact: z.string(),
  location: z.string(),
  startDate: z.date({
    error: "A data de início é obrigatória"
  }),
  endDate: z.date({
    error: "A data de término é obrigatória"
  }),
  file: z.instanceof(FileList).refine((file) => file?.length == 1, "O PDF do Edital é obrigatório"),
  categories: z.array(z.string()).min(1, "Pelo menos uma categoria deve ser selecionada."),
  steps: z.array(stepSchema).min(1, "Adicione pelo menos uma etapa.")
})


type EditEdictValidation = z.infer<typeof schema>

interface FormProps {
  edict: EdictDTO
}

export function Form({ edict }: FormProps) {

  const [previewMode, setPreviewMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, watch, control } = useForm<EditEdictValidation>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: edict.title,
      description: edict.description,
      organizer: edict.organizer,
      categories: [],
      steps: [{
        title: "",
      }]
    },
  })

  const { fields: steps, append, remove } = useFieldArray({
    control,
    name: "steps"
  });

  function handleIncreaseStep() {
    append({
      title: "",
      description: "",
      time: "",
      date: new Date(),
    })
  }

  function handleDecreaseStep(index: number) {
    remove(index)
  }


  const startDate = watch("startDate")
  const endEdictDate = watch("endDate")
  const descriptionWatched = watch("description")


  return (
    <form className="space-y-8" encType="multipart/form-data">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#5127FF]" />
          <h2 className="text-xl font-semibold text-gray-900">Informações do Edital</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input.Root>
            <Input.Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
              Título do Edital *
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
              {...register("organizer")}
            />
          </Input.Root>

          <Input.Root>
            <Label htmlFor="contact" className="text-sm font-medium text-gray-700 mb-1 block">
              Email para contato
            </Label>
            <Input.Core
              id="contact"
              placeholder="Email para contato"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register("contact")}
            />
          </Input.Root>

          <Input.Root>
            <Label htmlFor="contact" className="text-sm font-medium text-gray-700 mb-1 block">
              Localização do Edital
            </Label>
            <Input.Core
              id="location"
              placeholder="Ex: São Luís, Imperatriz"
              className="h-12 rounded-lg border-gray-200 focus:border-[#5127FF] focus:ring-[#5127FF]"
              {...register("location")}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !startDate && "text-muted-foreground"

                )}>
                  <span className="text-left w-full">{startDate ? (
                    format(startDate, "PPP", { locale: ptBR })
                  ) : (
                    "Selecione uma data"
                  )}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CalendarShad
                      mode="single"
                      selected={value}
                      onSelect={onChange}
                      onDayBlur={onBlur}
                      required
                      captionLayout="dropdown"
                      locale={ptBR}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-2 block">
              Data de Fim *
            </Input.Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button disabled={!startDate} variant="outline" className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !endEdictDate && "text-muted-foreground"
                )}>
                  <span className="text-left w-full">{endEdictDate ? (
                    format(endEdictDate, "PPP", { locale: ptBR })
                  ) : (
                    "Selecione uma data"
                  )}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { onChange, onBlur } }) => (
                    <CalendarShad
                      mode="single"
                      selected={endEdictDate}
                      onDayBlur={onBlur}
                      onSelect={onChange}
                      disabled={(date) =>
                        !startDate || date <= startDate
                      }
                      locale={ptBR}
                      captionLayout="dropdown"
                    />
                  )}
                />

              </PopoverContent>
            </Popover>
          </Input.Root>
        </div>

        <Input.Root >
          <Input.Label className="text-sm font-medium text-gray-700 block">Arquivo PDF do edital
          </Input.Label>

          <Input.Core
            type="file"
            accept="application/pdf"
            className="w-full"
            {...register("file")}
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
              {availableCategories?.map((category) => {
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

      <div className="flex items-center gap-2 mb-4">
        <Footprints className="w-5 h-5 text-[#5127FF]" />
        <h2 className="text-xl font-semibold text-gray-900">Crie aqui as etapas do Edital</h2>
      </div>

      {steps.map((step, index) => {
        const typeEdict = watch(`steps.${index}.type`);
        const eventMode = watch(`steps.${index}.format`);

        const date = watch(`steps.${index}.date`)

        const dueDateActivity = watch(`steps.${index}.dueDate`)

        return (
          <div key={step.id} className="mb-6 p-4 border border-dashed rounded-md shadow-sm bg-white space-y-4 w-full">

            <div className="flex items-center justify-between">
              <span>Etapa {index + 1}</span>


              {index !== 0 && (

                <button type="button"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-600 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  onClick={() => handleDecreaseStep(index)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" size={5} />
                  <span className="hidden sm:inline text-sm">Remover</span>
                  <span className="sr-only">Remover etapa {index + 1}</span>
                </button>
              )}
            </div>



            <Input.Root>
              <Input.Label htmlFor={`steps.${index}.title`}>Título *</Input.Label>
              <Input.Core
                id={`steps.${index}.title`}
                {...register(`steps.${index}.title`)}
                className="w-full"
                placeholder="Digite o título da etapa"
              />
            </Input.Root>

            <Input.Root>
              <Input.Label>Descrição *</Input.Label>
              <Textarea
                id={`steps.${index}.descripton`}
                placeholder="Digite a descrição da Etapa"
                {...register(`steps.${index}.description`)}
                className="max-w-full resize-none"
              />
            </Input.Root>

            <Input.Root>
              <Input.Label>Horário *</Input.Label>
              <Input.Core
                type="time"
                {...register(`steps.${index}.time`)}
              />
            </Input.Root>

            <div className="flex items-center justify-between gap-6">

              <Input.Root>
                <Input.Label htmlFor={`steps.${index}.date`}>Selecione a data *</Input.Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn(
                      "w-full text-left font-normal",
                      !date && "text-muted-foreground"
                    )}>
                      {date ? (
                        format(date, "PPP", { locale: ptBR })
                      ) : (
                        <span className="w-full text-left">Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Controller
                      control={control}
                      name={`steps.${index}.date`}
                      render={({ field: { onBlur, onChange } }) => (
                        <CalendarShad
                          mode="single"
                          selected={date}
                          onSelect={onChange}
                          onDayBlur={onBlur}
                          locale={ptBR}
                          captionLayout="dropdown"
                        />
                      )}
                    />
                  </PopoverContent>
                </Popover>
              </Input.Root>
              <Input.Root>
                <Input.Label htmlFor={`steps.${index}.type`}>Formato da Etapa</Input.Label>
                <Controller
                  control={control}
                  name={`steps.${index}.type`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select onValueChange={onChange} defaultValue={value}>
                      <SelectTrigger className="w-full" onBlur={onBlur}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Evento">Evento</SelectItem>
                        <SelectItem value="Atividade">Atividade</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                /></Input.Root>
            </div>

            {typeEdict === "Evento" && (
              <>

                <div>
                  <Input.Label htmlFor={`steps.${index}.format`}>Modalidade do Evento</Input.Label>
                  <Controller
                    control={control}
                    name={`steps.${index}.format`}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger className="w-full mt-2" onBlur={onBlur}>
                          <SelectValue placeholder="Selecione uma modalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Presencial">Presencial</SelectItem>
                          <SelectItem value="Online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {eventMode === "Presencial" && (
                  <Input.Root>
                    <Input.Label htmlFor={`steps.${index}.address`}>Endereço</Input.Label>
                    <Input.Core
                      id={`steps.${index}.address`}
                      placeholder="Informe o endereço do Evento"
                      {...register(`steps.${index}.address`)}
                      className="w-full"
                    />
                  </Input.Root>
                )}

                {eventMode === "Online" && (
                  <Input.Root>
                    <Input.Label htmlFor={`steps.${index}.meetingLink`}>Link da Reunião</Input.Label>
                    <Input.Core
                      id={`steps.${index}.meetingLink`}
                      placeholder="Informe o link da reunião"
                      {...register(`steps.${index}.meetingLink`)}
                      className="w-full"
                    />
                  </Input.Root>
                )}
              </>
            )}

            {typeEdict === "Atividade" && (
              <>
                <Input.Root>
                  <Input.Label htmlFor={`steps.${index}.activityTitle`}>Título da Atividade</Input.Label>
                  <Input.Core
                    id={`steps.${index}.activityTitle`}
                    placeholder="Digite o título da atividade"
                    {...register(`steps.${index}.activityTitle`)}
                    className="w-full"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label htmlFor="startDate" className="text-sm font-medium text-gray-700 block">
                    Data de Entrega *
                  </Input.Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button disabled={!startDate} variant="outline" className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !dueDateActivity && "text-muted-foreground"
                      )}>
                        <span className="text-left w-full">{dueDateActivity ? (
                          format(dueDateActivity, "PPP", { locale: ptBR })
                        ) : (
                          "Selecione uma data"
                        )}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Controller
                        control={control}
                        name={`steps.${index}.dueDate`}
                        render={({ field: { onChange, onBlur } }) => (
                          <CalendarShad
                            mode="single"
                            selected={dueDateActivity}
                            onDayBlur={onBlur}
                            onSelect={onChange}
                            locale={ptBR}
                            captionLayout="dropdown"
                          />
                        )}
                      />

                    </PopoverContent>
                  </Popover>
                </Input.Root>

                <Input.Root>
                  <Input.Label>PDF da Atividade</Input.Label>
                  <Input.Core
                    type="file"
                    accept="application/pdf"
                    className="w-full"
                    {...register(`steps.${index}.file`)}
                  />
                </Input.Root>
              </>
            )}
          </div>
        );
      })}
      <div className="w-full flex flex-col justify-center items-center">
        <button type="button" className="flex flex-col items-center text-gray-700 hover:text-gray-900 focus:outline-none" onClick={handleIncreaseStep}>
          <PlusCircleIcon />
          <span>Adicionar etapa</span>
        </button>
      </div>


      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#F4DA02] text-black hover:bg-[#F4DA02]/90 font-semibold px-8 py-3 h-auto"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {loading ? "Publicando..." : "Publicar Edital"}
        </Button>

        <Button type="reset" variant="ghost" className="text-gray-600 hover:text-gray-800 px-8 py-3 h-auto">
          Cancelar
        </Button>
      </div>
    </form>
  )
}