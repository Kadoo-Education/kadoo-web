import { CreateEdictDTO } from "./dto/create-edict-dto";
import { EdictDTO } from "./dto/edict-dto";

export interface EdictGateway {
  create(edict: CreateEdictDTO): Promise<void>
  getAll(): Promise<EdictDTO[]>
  getById(id: number): Promise<EdictDTO>
}