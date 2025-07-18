import { CreateEdictDTO } from "./dto/create-edict-dto";
import { GetAllEdictDTO } from "./dto/get-all-edict-dto";

export interface EdictGateway {
  create(edict: CreateEdictDTO): Promise<void>
  getAll(): Promise<GetAllEdictDTO[]>
}