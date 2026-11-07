import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function config() {
  const required = ["R2_ENDPOINT", "R2_BUCKET", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"] as const;
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`R2 is not configured: ${missing.join(", ")}`);
  return { bucket: process.env.R2_BUCKET!, client: new S3Client({ region: "auto", endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! } }) };
}

export async function putPrivateMedia(key: string, body: Uint8Array, contentType: string) { const { client, bucket } = config(); await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType })); }
export async function getMedia(key: string) { const { client, bucket } = config(); return client.send(new GetObjectCommand({ Bucket: bucket, Key: key })); }
