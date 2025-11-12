"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const querySchema = zod_1.z.object({
    searchTerm: zod_1.z.string().optional(),
    numberOfPeople: zod_1.z.int(),
    hasSearchTerm: zod_1.z.boolean()
});
exports.default = querySchema;
