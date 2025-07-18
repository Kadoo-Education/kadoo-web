import { client, HttpClient } from "@/infra/external/http";
import { UserEdictGateway } from "./user-edict-gateway";
import { CreateUserEdictDTO } from "./dto/create-user-edict-dto";

export class UserEdictGatewayHttp implements UserEdictGateway {

  constructor(private readonly client: HttpClient) { }
  
  async create({ edictId, userId }: CreateUserEdictDTO): Promise<void> {
    await this.client.post("/user-edicts", { edictId, userId });
  }
}

export const userEdictGatewayHttp = new UserEdictGatewayHttp(client);