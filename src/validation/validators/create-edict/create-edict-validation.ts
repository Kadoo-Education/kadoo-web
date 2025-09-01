import z from "zod";

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

export const createEdictValidation = z.object({
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