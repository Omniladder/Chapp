"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const GoogleSchema = zod_1.z.object({
    from: zod_1.z.string().optional()
});
exports.default = GoogleSchema;
