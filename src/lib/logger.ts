/* eslint-disable no-console */

export type LogLevel = "info" | "error";

function writeLog(level: LogLevel, message: string, meta?: unknown) {
  const payload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message: string, meta?: unknown) => writeLog("info", message, meta),
  error: (message: string, meta?: unknown) => writeLog("error", message, meta),
};
