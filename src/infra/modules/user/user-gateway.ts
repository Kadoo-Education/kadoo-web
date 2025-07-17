import { GetUserDTO } from "./dto/get-user-dto";

export interface UserGateway {
  get(): Promise<GetUserDTO>
}