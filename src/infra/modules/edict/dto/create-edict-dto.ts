export interface CreateEdictDTO {
  title: string
  description: string
  organizer: string
  contact: string
  location: string
  startDate: Date
  endDate: Date
  file: string
  categories: string[]
  steps: Step[]
}

interface Step {
  title: string
  description: string
  date: Date
  format: "Evento" | "Atividade"
  mode?: "Online" | "Presencial"
  address?: string
  meetingLink?: string
  dueDate?: Date
  file: string | undefined
}

