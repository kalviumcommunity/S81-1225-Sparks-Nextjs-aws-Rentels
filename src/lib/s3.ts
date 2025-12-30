import { S3Client } from "@aws-sdk/client-s3";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getS3Config() {
  const region = requireEnv("AWS_REGION");
  const bucket = requireEnv("AWS_BUCKET_NAME");

  return { region, bucket };
}

export function getS3Client() {
  const { region } = getS3Config();
  return new S3Client({ region });
}

export function getS3ObjectUrl({
  bucket,
  region,
  key,
}: {
  bucket: string;
  region: string;
  key: string;
}) {
  // Virtual-hosted–style URL. For private buckets this URL may not be publicly accessible,
  // but it's still useful to store as a reference alongside the object key.
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key).replace(
    /%2F/g,
    "/"
  )}`;
}
