import { client, HttpClient } from "@/infra/external/http";
import { GetUserDTO } from "./dto/get-user-dto";
import { UserGateway } from "./user-gateway";

export class UserGatewayHttp implements UserGateway {

  constructor(private readonly client: HttpClient) { }

  async get(): Promise<GetUserDTO> {
    const result = await this.client.get<GetUserDTO>("/me");
    console.log(result)
    if (result.isLeft()) {
      throw new Error("Usuário não autenticado.");
    }

    return result.value;
  }
}

export const userGatewayHttp = new UserGatewayHttp(client);