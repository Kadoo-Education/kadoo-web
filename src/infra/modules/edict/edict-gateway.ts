import { CreateEdictDTO } from "./dto/create-edict-dto";
import { EdictDTO } from "./dto/edict-dto";

export interface UpdateEdictDTO {
  id: number
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
  address?: string
  dueDate?: Date
  file?: string | null
}[]
export interface EdictGateway {
  create(edict: CreateEdictDTO): Promise<void>
  getAll(): Promise<EdictDTO[]>
  getById(id: number): Promise<EdictDTO>
  update(edict: UpdateEdictDTO): Promise<void>
  delete(id: number): Promise<void>
  edictsAttachUser(): Promise<EdictDTO[]>
}