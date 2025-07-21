import z from "zod";

export const createEdictValidation = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de término é obrigatória"),
  categories: z.array(z.string()).nonempty("Pelo menos uma categoria deve ser selecionada"),
  // pdfFile: z.instanceof(File).refine(file => file.size > 0, {
  //   message: "Arquivo PDF do edital é obrigatório",
  // }),
})