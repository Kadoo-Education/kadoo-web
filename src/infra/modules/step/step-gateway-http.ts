import { client, HttpClient } from "@/infra/external/http";
import { Step, StepGateway } from "./step-gateway";

export class StepGatewayHttp implements StepGateway {
  constructor(private readonly client: HttpClient) {}
  
  
  async getByEdictId(edictId: number): Promise<Step[]> {
    const result = await this.client.get<Step[]>(`/steps/edict/${edictId}`)

    if(result.isLeft()) {
      throw new Error("Etapas não encontradas.")
    }

    return result.value
  }

  async getById(stepId: number): Promise<Step> {
    const result = await this.client.get<Step>(`/steps/${stepId}`)

    if(result.isLeft()){
      throw new Error("Etapa não encontrada.")
    }

    return result.value
  }
}

export const stepGatewayHttp = new StepGatewayHttp(client)