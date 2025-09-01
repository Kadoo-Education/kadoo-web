import { client, HttpClient } from "@/infra/external/http";
import { EdictGateway } from "./edict-gateway";
import { CreateEdictDTO } from "./dto/create-edict-dto";
import { EdictDTO } from "./dto/edict-dto";

export class EdictGatewayHttp implements EdictGateway {

  constructor(private readonly client: HttpClient) { }
  

  async create(edict: CreateEdictDTO): Promise<void> {
    await this.client.post('/edict', {
      ...edict
    });
  }

  async getAll(): Promise<EdictDTO[]> {
    const response = await this.client.get<EdictDTO[]>('/edict');

    if (response.isLeft()) {
      throw new Error("Erro ao buscar editais.");
    }

    return response.value.map(edict => {
      return {
        ...edict,
        startDate: new Date(edict.startDate),
        endDate: new Date(edict.endDate)
      };
    });
  }

  async getById(id: number): Promise<EdictDTO> {
    const response = await this.client.get<EdictDTO>(`/edict/${id}`)

    if(response.isLeft()) {
      throw new Error("Edital não encontrado.")
    }

    return response.value
  }
}

export const edictGatewayHttp = new EdictGatewayHttp(client);