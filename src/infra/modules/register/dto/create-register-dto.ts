import { Role } from "@/business/domain/role"

export interface CreateRegisterDTO {
  name: string
  email: string
  password: string
  cpf: string
  role: Role
  birthDate?: Date
  expertiseAreas?: string[]
}