import z from "zod";

const trailSchema = z.object({
  title: z.string().min(1, "Título da trilha é obrigatório"),
  type: z.string().min(1, "Tipo da trilha é obrigatório"),
  date: z.string().optional(),

  mode: z.string().optional(),
  address: z.string().optional(),
  time: z.string().optional(),
  link: z.string().optional(),
  activityTitle: z.string().optional(),
  activityDescription: z.string().optional(),
  pdf: z.any().optional(),
}).superRefine((data, ctx) => {
  if (data.type === "evento" && !data.date) {
    ctx.addIssue({
      path: ["date"],
      message: "A data do evento é obrigatória",
    });
  }
})

export const createEdictValidation = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de término é obrigatória"),
  categories: z.array(z.string()).nonempty("Pelo menos uma categoria deve ser selecionada"),
  pdf: z.any().optional(),
  tracksCount: z
    .number()
    .int("Deve ser um número inteiro")
    .min(0, "Valor mínimo é 0"),
  trails: z.array(trailSchema)
})