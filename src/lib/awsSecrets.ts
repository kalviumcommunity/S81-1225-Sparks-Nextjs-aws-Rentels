import "server-only";

import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

type SecretValue = Record<string, string>;

let cached: SecretValue | null = null;
let cachedAt = 0;

function getAwsRegion() {
  return process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || null;
}

function getSecretId() {
  return (
    process.env.AWS_SECRETS_MANAGER_SECRET_ID ||
    process.env.AWS_SECRET_ID ||
    process.env.SECRET_ARN ||
    null
  );
}

function parseSecretString(secretString: string): SecretValue {
  let parsed: unknown;
  try {
    parsed = JSON.parse(secretString);
  } catch {
    throw new Error("Secrets Manager secret must be a JSON object");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Secrets Manager secret JSON must be an object");
  }

  const out: SecretValue = {};
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof value !== "string") {
      throw new Error(`Secret key '${key}' must be a string`);
    }
    out[key] = value;
  }
  return out;
}

export async function getAwsSecrets(options?: { cacheTtlMs?: number }) {
  const cacheTtlMs = options?.cacheTtlMs ?? 5 * 60 * 1000;

  if (cached && Date.now() - cachedAt < cacheTtlMs) {
    return cached;
  }

  const region = getAwsRegion();
  const secretId = getSecretId();

  if (!region) {
    throw new Error("AWS_REGION is required to read from Secrets Manager");
  }
  if (!secretId) {
    throw new Error(
      "AWS_SECRETS_MANAGER_SECRET_ID (or AWS_SECRET_ID/SECRET_ARN) is required"
    );
  }

  const client = new SecretsManagerClient({ region });
  const result = await client.send(new GetSecretValueCommand({ SecretId: secretId }));

  const secretString =
    result.SecretString ||
    (result.SecretBinary
      ? Buffer.from(result.SecretBinary as Uint8Array).toString("utf8")
      : null);

  if (!secretString) {
    throw new Error("Secret value is empty");
  }

  const parsed = parseSecretString(secretString);
  cached = parsed;
  cachedAt = Date.now();
  return parsed;
}
