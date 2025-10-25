import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!)
});

redis.ping()
  .then(res => {
    console.log("✅ Connected to Redis:", res); // should print "PONG"
  })
  .catch(err => {
    console.error("❌ Redis connection failed:", err);
  });


export function createKey(...data: (string | undefined | null)[]): string{
    return data.filter(Boolean).join("|::|")
}


