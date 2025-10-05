

import { stepGatewayHttp } from "@/infra/modules/step/step-gateway-http"
import { StepsOfEdict } from "@/presentation/modules/steps/view/components/steps-edicts-section"

async function getStepsByEdictId(edictId: number) {
  const steps = await stepGatewayHttp.getByEdictId(edictId)

  return steps
}

export default async function StepsEdictPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const steps = await getStepsByEdictId(Number(id))

  console.log(steps)

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-32">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#5127FF] mb-2">Etapas do edital</h1>
        <p className="text-muted-foreground">
          Acompanhe as etapas disponíveis neste edital.
        </p>
      </div>

      <StepsOfEdict />
    </div>
  )
}
