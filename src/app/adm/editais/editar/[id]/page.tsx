import { edictGatewayHttp } from "@/infra/modules/edict/edict-gateway-http";
import { EditEdictSection } from "@/presentation/modules/edict/edit/components/edit-edict-section/edit-edict-section";
import { notFound } from "next/navigation";

export default async function EditEdictPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {

  const { id } = await params

  const edict = await edictGatewayHttp.getById(id)

  if (!edict) return notFound()

    console.log(edict)

  return (
    <EditEdictSection edict={edict} />
  )
}