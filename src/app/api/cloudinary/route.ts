import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: "dbsps2niw",
  api_key: "782717586434214",
  api_secret: "sXhQP-x_4xZDClPtkhlnPZP8boY",
});

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return new Response("Arquivo não encontrado", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const stream = Readable.from(buffer)


  console.log(stream)

  // const { paramsToSign } = body;

  // const signature = cloudinary.utils.api_sign_request(
  //   paramsToSign,
  //   "sXhQP-x_4xZDClPtkhlnPZP8boY"
  // );

  return Response.json({ buffer });
}