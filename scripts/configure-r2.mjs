import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
requireEnv(env, ["R2_ENDPOINT", "R2_BUCKET", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "APP_ORIGIN"]);
const client = new S3Client({ region: "auto", endpoint: env.R2_ENDPOINT, credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY } });
await client.send(new PutBucketCorsCommand({ Bucket: env.R2_BUCKET, CORSConfiguration: { CORSRules: [{ AllowedOrigins: [env.APP_ORIGIN], AllowedMethods: ["GET", "PUT", "HEAD"], AllowedHeaders: ["content-type", "authorization"], ExposeHeaders: ["etag"], MaxAgeSeconds: 3600 }] } }));
console.log("R2 CORS configured for the application origin.");
