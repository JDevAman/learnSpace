import "dotenv/config";

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),
  JWT_SECRET: required(process.env.JWT_SECRET, "JWT_SECRET"),
};
