import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!)
});

export function createKey(...data: (string | undefined | null)[]): string{
    return data.filter(Boolean).join("\x1E")
}


