export interface CreateEdictDTO {
  title: string
  description: string
  organizer: string
  contact: string
  startDate: Date
  endDate: Date
  file: string
  categories: string[]
  steps: CreateStepDTO[]
}

export type CreateStepDTO = EventPresencial | EventOnline | ActivityStep

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
  steps: CreateStepDTO[]
}

type EventBase = {
  type: "Evento"
  title: string
  description: string
  time: string
  date: Date
}


type EventPresencial = EventBase & {
  format: "Presencial"
  address?: string
}

type EventOnline = EventBase & {
  format: "Online"
  meetingLink?: string
}

type ActivityStep = {
  type?: "Atividade"
  activityTitle: string
  dueDate?: Date | undefined
  activityPDF?: string
}