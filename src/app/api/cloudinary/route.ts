import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

cloudinary.config({
  cloud_name: "dbsps2niw",
  api_key: "782717586434214",
  api_secret: "sXhQP-x_4xZDClPtkhlnPZP8boY",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { paramsToSign } = body;

  console.log(paramsToSign)

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    "sXhQP-x_4xZDClPtkhlnPZP8boY"
  );

  return Response.json({ signature });
}