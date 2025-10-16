
import { EdictGatewayHttp, edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http"
import { EdictDetailsSection } from "@/presentation/modules/edict/view/components/edict-details/edict-details"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { HttpClientFactory } from "@/infra/external/http/axios/http-client-factory"

export default async function EdictDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const client = HttpClientFactory.create()
  const gateway = new EdictGatewayHttp(client)

  const edict = await gateway.getById(Number(id))



  // const edict = await edictGatewayHttp.getById(id)

  if (!edict) return notFound()

  return (
    <EdictDetailsSection edict={edict} />
  )
}