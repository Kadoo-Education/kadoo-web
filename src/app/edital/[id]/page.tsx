import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { EdictDetailsSection } from "@/presentation/modules/edict/view/components/edict-details/edict-details"
import { notFound } from "next/navigation"

export default async function EdictDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const edict = await edictGatewayHttp.getById(id)

  if (!edict) return notFound()

  return (
    <EdictDetailsSection edict={edict} />
  )
}