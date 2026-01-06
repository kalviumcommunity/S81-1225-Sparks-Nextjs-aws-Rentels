import sanitizeHtml from "sanitize-html";

function stripControlChars(value: string) {
  // Remove ASCII control characters except tab/newline/carriage return.
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function coerceToString(input: unknown) {
  if (typeof input === "string") return input;
  if (input === null || input === undefined) return "";
  return String(input);
}

export function sanitizePlainText(input: unknown) {
  const raw = stripControlChars(coerceToString(input));
  const stripped = sanitizeHtml(raw, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Keep whitespace predictable for storage and display.
  return stripped.replace(/\s+/g, " ").trim();
}

export function normalizeEmail(input: unknown) {
  // Do not attempt to "sanitize" email by removing characters.
  // Instead: normalize casing/whitespace and rely on validation.
  return stripControlChars(coerceToString(input)).trim().toLowerCase();
}

export function sanitizeFileName(input: unknown) {
  // File names are user-provided and may show up in UI. Strip HTML.
  // Keep common filename characters; validation happens elsewhere.
  return sanitizePlainText(input);
}
