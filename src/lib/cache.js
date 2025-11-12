"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
exports.createKey = createKey;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: {}
});
exports.redis.ping()
    .then(res => {
    console.log("✅ Connected to Redis:", res); // should print "PONG"
})
    .catch(err => {
    console.error("❌ Redis connection failed:", err);
});
function createKey(...data) {
    return data.filter(Boolean).join("|::|");
}
