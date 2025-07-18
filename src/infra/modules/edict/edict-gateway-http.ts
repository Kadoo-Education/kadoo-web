import { client, HttpClient } from "@/infra/external/http";
import { EdictGateway } from "./edict-gateway";
import { CreateEdictDTO } from "./dto/create-edict-dto";
import { GetAllEdictDTO } from "./dto/get-all-edict-dto";

export class EdictGatewayHttp implements EdictGateway {

  constructor(private readonly client: HttpClient) { }


  async create(edict: CreateEdictDTO): Promise<void> {
    await this.client.post('/edict', {
      linkDoc: "exemplo",
      category: "Tecnologia",
      ...edict
    });
  }

  async getAll(): Promise<GetAllEdictDTO[]> {
    const response = await this.client.get<GetAllEdictDTO[]>('/edict');

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

}

export const edictGatewayHttp = new EdictGatewayHttp(client);