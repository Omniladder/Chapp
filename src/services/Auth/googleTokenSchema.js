"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const GoogleTokenSchema = zod_1.z.object({
    code: zod_1.z.string(),
    state: zod_1.z.string().optional()
});
exports.default = GoogleTokenSchema;
