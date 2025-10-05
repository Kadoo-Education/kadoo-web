import z from "zod";

const stepSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  format: z.enum(["Evento", "Atividade"]),
  mode: z.enum(["Online", "Presencial"]).optional(),
  address: z.string().optional(),
  meetingLink: z.string().optional(),
  dueDate: z.date().optional(),
})

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
  categories: z.array(z.string()).min(1, "Pelo menos uma categoria deve ser selecionada."),
  steps: z.array(stepSchema).min(1, "Adicione pelo menos uma etapa.")
})